const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getCareerSuggestions } = require('../controllers/career');

// @route   POST /api/career/suggestions
// @desc    Get personalized career suggestions
// @access  Private
router.post('/suggestions', protect, getCareerSuggestions);

module.exports = router; 