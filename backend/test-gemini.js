require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set in environment variables');
    process.exit(1);
}

console.log('Initializing Gemini API with key:', GEMINI_API_KEY.substring(0, 5) + '...');
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function testGeminiAPI() {
  try {
    console.log('Testing Gemini API...');
    
    // Use the correct model name for v1beta API
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    console.log('Gemini model initialized');

    const prompt = `Based on the following information, suggest a detailed career path:
    - Academic Qualification: Bachelor's Degree
    - Field of Study: Computer Science
    - Interests: programming, data

    Please provide a structured response in JSON format with the following fields:
    {
        "careerPath": {
            "title": "Career Path Title",
            "description": "Detailed description of the career path",
            "recommendedRoles": [
                {
                    "title": "Role Title",
                    "description": "Role description",
                    "salary": "Salary range",
                    "skills": ["Required skills"],
                    "nextSteps": ["Next steps for career progression"]
                }
            ],
            "recommendedCourses": [
                {
                    "title": "Course Title",
                    "provider": "Course Provider",
                    "level": "Course Level",
                    "duration": "Course Duration"
                }
            ]
        }
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
      
      const careerData = JSON.parse(jsonText);
      console.log('Parsed career data:', careerData);
      
      // Validate the career data structure
      if (!careerData || !careerData.careerPath) {
        console.error('Invalid career data structure received from API');
        return null;
      }
      
      return careerData;
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      return null;
    }
  } catch (error) {
    console.error('Error testing Gemini API:', error);
    console.error('Error stack:', error.stack);
    return null;
  }
}

// Run the test
testGeminiAPI()
  .then(result => {
    if (result) {
      console.log('Test successful!');
      console.log('Career path title:', result.careerPath.title);
      console.log('Number of recommended roles:', result.careerPath.recommendedRoles.length);
      console.log('Number of recommended courses:', result.careerPath.recommendedCourses.length);
    } else {
      console.log('Test failed!');
    }
  })
  .catch(error => {
    console.error('Test error:', error);
  }); 