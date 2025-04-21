const User = require('../models/User');
const { generateCareerSuggestions } = require('../services/gemini');

// @desc    Get personalized career suggestions
// @route   POST /api/career/suggestions
// @access  Private
exports.getCareerSuggestions = async (req, res) => {
  try {
    console.log('Career suggestions request received:', req.body);
    console.log('Request headers:', req.headers);
    
    const userId = req.user.id;
    console.log('User ID:', userId);
    
    const user = await User.findById(userId);
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get selected interests from the request
    const { interests, qualification, field } = req.body;
    console.log('Request data:', { interests, qualification, field });

    if (!interests || !Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please select at least one interest'
      });
    }

    if (!qualification) {
      return res.status(400).json({
        success: false,
        message: 'Qualification is required'
      });
    }

    if (!field) {
      return res.status(400).json({
        success: false,
        message: 'Field of study is required'
      });
    }

    // Generate career suggestions using Gemini API
    console.log('Calling Gemini API...');
    let careerData;
    try {
      console.log('Calling generateCareerSuggestions with:', { interests, qualification, field });
      careerData = await generateCareerSuggestions(interests, qualification, field);
      console.log('Gemini API response:', careerData);
    } catch (geminiError) {
      console.error('Error from Gemini API:', geminiError);
      console.error('Error stack:', geminiError.stack);
      return res.status(500).json({
        success: false,
        message: geminiError.message || 'Error generating career suggestions',
        error: geminiError.stack
      });
    }

    // Validate the career data structure
    if (!careerData || !careerData.careerPath) {
      console.error('Invalid career data structure:', careerData);
      return res.status(500).json({
        success: false,
        message: 'Invalid career data structure received from API'
      });
    }

    // Ensure the response has the correct structure
    const formattedResponse = {
      success: true,
      data: {
        careerPath: {
          title: careerData.careerPath.title || 'Career Path',
          description: careerData.careerPath.description || 'No description available',
          recommendedRoles: careerData.careerPath.recommendedRoles || [],
          requiredSkills: careerData.careerPath.requiredSkills || []
        },
        recommendedCourses: careerData.recommendedCourses || [],
        recommendedMentors: careerData.recommendedMentors || []
      }
    };

    console.log('Sending formatted response:', formattedResponse);
    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error in getCareerSuggestions:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating career suggestions',
      error: error.message
    });
  }
};

// Helper function to get recommended courses based on user interests
function getRecommendedCourses(interests) {
    const coursesDatabase = {
        "Web Development": [
            {
                title: "The Complete Web Development Bootcamp",
                provider: "Udemy",
                level: "Beginner to Advanced",
                duration: "44 hours",
                link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/"
            },
            {
                title: "Full Stack Web Development",
                provider: "freeCodeCamp",
                level: "Beginner to Advanced",
                duration: "Self-paced",
                link: "https://www.freecodecamp.org/learn/full-stack-web-development/"
            }
        ],
        "Data Science": [
            {
                title: "Data Science Professional",
                provider: "Coursera",
                level: "Intermediate",
                duration: "8 months",
                link: "https://www.coursera.org/professional-certificates/google-data-analytics"
            },
            {
                title: "Data Analysis with Python",
                provider: "freeCodeCamp",
                level: "Beginner to Intermediate",
                duration: "Self-paced",
                link: "https://www.freecodecamp.org/learn/data-analysis-with-python/"
            }
        ],
        "Business": [
            {
                title: "Business Analytics",
                provider: "edX",
                level: "Intermediate",
                duration: "12 weeks",
                link: "https://www.edx.org/course/business-analytics"
            },
            {
                title: "Digital Marketing",
                provider: "Google Digital Garage",
                level: "Beginner",
                duration: "40 hours",
                link: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing"
            }
        ],
        "UX/UI Design": [
            {
                title: "Google UX Design",
                provider: "Coursera",
                level: "Beginner",
                duration: "6 months",
                link: "https://www.coursera.org/professional-certificates/google-ux-design"
            },
            {
                title: "UI/UX Design Specialization",
                provider: "Coursera",
                level: "Beginner to Intermediate",
                duration: "6 months",
                link: "https://www.coursera.org/specializations/ui-ux-design"
            }
        ],
        "Cybersecurity": [
            {
                title: "Cybersecurity Fundamentals",
                provider: "edX",
                level: "Beginner",
                duration: "8 weeks",
                link: "https://www.edx.org/course/cybersecurity-fundamentals"
            },
            {
                title: "CompTIA Security+",
                provider: "CompTIA",
                level: "Intermediate",
                duration: "Self-paced",
                link: "https://www.comptia.org/certifications/security"
            }
        ],
        "Cloud Computing": [
            {
                title: "AWS Cloud Practitioner",
                provider: "Amazon Web Services",
                level: "Beginner",
                duration: "Self-paced",
                link: "https://aws.amazon.com/certification/certified-cloud-practitioner/"
            },
            {
                title: "Google Cloud Fundamentals",
                provider: "Google Cloud",
                level: "Beginner",
                duration: "Self-paced",
                link: "https://cloud.google.com/certification/cloud-digital-leader"
            }
        ]
    };

    const recommendedCourses = [];
  
    if (interests && interests.length > 0) {
      interests.forEach(interest => {
        if (coursesDatabase[interest]) {
          recommendedCourses.push(...coursesDatabase[interest]);
        }
      });
    }

    // Return top 5 courses
    return recommendedCourses.slice(0, 5);
} 