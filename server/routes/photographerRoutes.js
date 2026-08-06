const express = require("express");
const router = express.Router();
const {
  getPhotographers,
  getPhotographer,
  createPhotographer,
  updatePhotographer,
  deletePhotographer,
} = require("../controllers/photographerController");
const { protect, adminOnly } = require("../middleware/auth");

router.route("/").get(getPhotographers).post(protect, adminOnly, createPhotographer);
router
  .route("/:id")
  .get(getPhotographer)
  .put(protect, adminOnly, updatePhotographer)
  .delete(protect, adminOnly, deletePhotographer);

module.exports = router;