const User = require("../models/User");

// @desc   Get all users
// @route  GET /api/users
// @access Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

// @desc   Update user role
// @route  PUT /api/users/:id/role
// @access Private/Admin
const updateUserRole = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { role } = req.body;
  if (!role || !["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  // Prevent an admin from demoting themselves by accident
  if (user._id.toString() === req.user._id.toString() && role !== "admin") {
    return res
      .status(400)
      .json({ message: "You cannot change your own admin role" });
  }
  user.role = role;
  await user.save();
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

// @desc   Delete a user
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Prevent an admin from deleting themselves
  if (user._id.toString() === req.user._id.toString()) {
    return res
      .status(400)
      .json({ message: "You cannot delete your own account" });
  }
  await user.deleteOne();
  res.json({ message: "User removed" });
};

module.exports = { getUsers, updateUserRole, deleteUser };
