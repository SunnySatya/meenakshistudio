const express = require("express");
const router = express.Router();
const {
  getBookings,
  getMyBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");
const { protect, adminOnly } = require("../middleware/auth");

router.route("/my").get(protect, getMyBookings);
router.route("/").get(protect, adminOnly, getBookings).post(createBooking);
router
  .route("/:id")
  .put(protect, adminOnly, updateBooking)
  .delete(protect, adminOnly, deleteBooking);

module.exports = router;
