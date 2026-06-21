// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  res.status(200).json({ success: true, message: 'Get users stub' });
};
