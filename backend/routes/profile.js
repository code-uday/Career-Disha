const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  updatePassword
} = require('../controllers/profile');

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private
router.get('/', protect, getProfile);

// @route   PUT /api/profile
// @desc    Update user profile
// @access  Private
router.put('/', protect, updateProfile);

// @route   PUT /api/profile/password
// @desc    Update password
// @access  Private
router.put('/password', protect, updatePassword);

module.exports = router; 