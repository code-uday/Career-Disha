const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      dateOfBirth,
      phone,
      address,
      education,
      careerField,
      interests
    } = req.body;

    // Build profile object
    const profileFields = {};
    
    if (name) profileFields.name = name;
    if (email) profileFields.email = email;
    if (dateOfBirth) profileFields.dateOfBirth = dateOfBirth;
    if (phone) profileFields.phone = phone;
    if (address) profileFields.address = address;
    if (education) profileFields.education = education;
    if (careerField) profileFields.careerField = careerField;
    if (interests) profileFields.interests = interests;

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use'
      });
    }
    
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update user password
// @route   PUT /api/profile/password
// @access  Private
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}; 