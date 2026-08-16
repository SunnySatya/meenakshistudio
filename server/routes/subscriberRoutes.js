const express = require("express");
const router = express.Router();
const {
  getSubscribers,
  createSubscriber,
  deleteSubscriber,
} = require("../controllers/subscriberController");
const { protect, adminOnly } = require("../middleware/auth");

router.route("/").get(protect, adminOnly, getSubscribers).post(createSubscriber);
router.route("/:id").delete(protect, adminOnly, deleteSubscriber);

module.exports = router;