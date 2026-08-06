const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/auth");

router.route("/").get(protect, adminOnly, getUsers);
router.route("/:id/role").put(protect, adminOnly, updateUserRole);
router.route("/:id").delete(protect, adminOnly, deleteUser);

module.exports = router;
