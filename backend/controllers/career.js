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

    res.status(200).json({
      success: true,
      data: careerData
    });
  } catch (error) {
    console.error('Error in getCareerSuggestions:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating career suggestions',
      error: error.message
    });
  }
};

// Helper function to get recommended courses based on interests
function getRecommendedCourses(interests) {
  // This would typically come from a database
  const coursesDatabase = {
    "Web Development": [
      { title: "Complete Web Development Bootcamp", provider: "Udemy", level: "Beginner to Advanced", duration: "40 hours" },
      { title: "Advanced JavaScript Concepts", provider: "Coursera", level: "Intermediate", duration: "8 weeks" },
      { title: "React - The Complete Guide", provider: "Udemy", level: "Intermediate", duration: "35 hours" }
    ],
    "Data Science": [
      { title: "Data Science and Machine Learning", provider: "Coursera", level: "Intermediate", duration: "12 weeks" },
      { title: "Python for Data Science", provider: "edX", level: "Beginner", duration: "10 weeks" },
      { title: "Advanced Machine Learning", provider: "Udacity", level: "Advanced", duration: "16 weeks" }
    ],
    "Business": [
      { title: "Business Strategy", provider: "Coursera", level: "Intermediate", duration: "6 weeks" },
      { title: "Digital Marketing", provider: "Udemy", level: "Beginner to Advanced", duration: "25 hours" },
      { title: "Project Management Professional", provider: "PMI", level: "Advanced", duration: "12 weeks" }
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