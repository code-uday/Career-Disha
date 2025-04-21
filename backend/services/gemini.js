const { GoogleGenerativeAI } = require('@google/generative-ai');

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
        
        // Use the correct model name for v1beta API
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log('Gemini model initialized');

        const prompt = `Based on the following information, suggest a detailed career path:
        - Academic Qualification: ${qualification}
        - Field of Study: ${field}
        - Interests: ${interests.join(', ')}

        Please provide a structured response in JSON format with the following fields:
        {
            "careerPath": {
                "title": "Career Path Title",
                "description": "Detailed description of the career path",
                "recommendedRoles": ["Role 1", "Role 2", "Role 3"],
                "requiredSkills": ["Skill 1", "Skill 2", "Skill 3"]
            },
            "recommendedCourses": [
                {
                    "title": "Course Title",
                    "provider": "Course Provider",
                    "level": "Course Level",
                    "duration": "Course Duration"
                }
            ],
            "recommendedMentors": [
                {
                    "name": "Mentor Name",
                    "title": "Mentor Title",
                    "expertise": "Mentor Expertise",
                    "experience": "Years of Experience",
                    "specialization": "Specialization Area"
                }
            ]
        }

        Make the suggestions specific and actionable, focusing on roles that combine the user's interests and qualifications.`;

        console.log('Sending prompt to Gemini API');
        const result = await model.generateContent(prompt);
        console.log('Received response from Gemini API');
        
        const response = await result.response;
        const text = response.text();
        console.log('Gemini API response text:', text);
        
        // Parse the JSON response
        try {
            // Clean up the response text to handle markdown code block formatting
            let jsonText = text;
            if (jsonText.includes('```json')) {
                jsonText = jsonText.split('```json')[1].split('```')[0].trim();
            } else if (jsonText.includes('```')) {
                jsonText = jsonText.split('```')[1].split('```')[0].trim();
            }
            
            // Try to parse the JSON
            let careerData;
            try {
                careerData = JSON.parse(jsonText);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                console.log('Attempting to fix JSON format...');
                
                // Try to fix common JSON formatting issues
                jsonText = jsonText.replace(/(\w+):/g, '"$1":');
                jsonText = jsonText.replace(/'/g, '"');
                
                try {
                    careerData = JSON.parse(jsonText);
                } catch (fixError) {
                    console.error('Failed to fix JSON:', fixError);
                    throw new Error('Failed to parse career suggestions from API');
                }
            }
            
            console.log('Parsed career data:', careerData);
            
            // Validate the career data structure
            if (!careerData || !careerData.careerPath) {
                throw new Error('Invalid career data structure received from API');
            }
            
            // Ensure required fields exist
            if (!careerData.careerPath.recommendedRoles) {
                careerData.careerPath.recommendedRoles = [];
            }
            
            if (!careerData.careerPath.requiredSkills) {
                careerData.careerPath.requiredSkills = [];
            }
            
            if (!careerData.recommendedCourses) {
                careerData.recommendedCourses = [];
            }
            
            if (!careerData.recommendedMentors) {
                careerData.recommendedMentors = [];
            }
            
            return careerData;
        } catch (parseError) {
            console.error('Error parsing Gemini response:', parseError);
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