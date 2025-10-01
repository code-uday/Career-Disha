const { GoogleGenerativeAI } = require('@google/generative-ai');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Initialize Gemini API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set in environment variables');
    throw new Error('GEMINI_API_KEY is required');
}

console.log('Initializing Gemini API with key:', GEMINI_API_KEY.substring(0, 5) + '...');
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Function to generate career suggestions based on interests
async function generateCareerSuggestions(interests, qualification, field) {
    try {
        console.log('Starting generateCareerSuggestions with:', { interests, qualification, field });
        
        if (!interests || !Array.isArray(interests) || interests.length === 0) {
            throw new Error('Interests array is required and must not be empty');
        }
        
        if (!qualification) {
            throw new Error('Qualification is required');
        }
        
        if (!field) {
            throw new Error('Field of study is required');
        }
        
        // Prefer REST v1 to avoid v1beta model limitations in older SDKs
        const modelName = 'gemini-2.0-flash';

        const prompt = `You are an expert career counselor.
Return ONLY valid JSON (no markdown fences, no prose) matching exactly this schema:
{
  "careerPath": {
    "title": string,
    "description": string,
    "recommendedRoles": string[],
    "requiredSkills": string[]
  },
  "recommendedCourses": Array<{
    "title": string,
    "provider": string,
    "level": string,
    "duration": string,
    "link"?: string
  }>,
  "recommendedMentors": Array<{
    "name": string,
    "title": string,
    "expertise": string,
    "experience": string,
    "specialization": string
  }>
}

Inputs:
- Academic Qualification: ${qualification}
- Field of Study: ${field}
- Interests: ${interests.join(', ')}

Guidelines:
- Be specific and actionable for an Indian job market context when possible.
- Keep arrays between 3 and 7 items.
- Ensure JSON is strictly valid.`;

        console.log('Sending prompt to Gemini API (REST v1)');
        const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
        const body = {
            contents: [{ role: 'user', parts: [{ text: prompt }]}]
        };
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!resp.ok) {
            const errText = await resp.text();
            throw new Error(`REST v1 error ${resp.status}: ${errText}`);
        }
        const data = await resp.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        console.log('Gemini REST v1 response text (truncated):', text?.slice(0, 200));
        
        // Parse the JSON response (JSON mode)
        try {

            const cleanText = text.replace(/```json|```/g, '').trim();

            const careerData = JSON.parse(cleanText);
            console.log('Parsed career data keys:', Object.keys(careerData || {}));

            if (!careerData || !careerData.careerPath) {
                throw new Error('Invalid career data structure received from API');
            }

            careerData.careerPath.recommendedRoles = careerData.careerPath.recommendedRoles || [];
            careerData.careerPath.requiredSkills = careerData.careerPath.requiredSkills || [];
            careerData.recommendedCourses = careerData.recommendedCourses || [];
            careerData.recommendedMentors = careerData.recommendedMentors || [];

            return careerData;
        } catch (parseError) {
            console.error('Error parsing Gemini response (JSON mode):', parseError);
            throw new Error('Failed to parse career suggestions from API');
        }
    } catch (error) {
        console.error('Error generating career suggestions:', error);
        throw error; // Let the controller handle the error
    }
}

module.exports = {
    generateCareerSuggestions
}; 