const Subscriber = require("../models/Subscriber");

// @desc   Get all subscribers
// @route  GET /api/subscribers
// @access Private/Admin
const getSubscribers = async (req, res) => {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 });
  res.json(subscribers);
};

// @desc   Create a subscriber
// @route  POST /api/subscribers
// @access Public
const createSubscriber = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const existing = await Subscriber.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res
      .status(400)
      .json({ message: "This email is already subscribed!" });
  }
  const subscriber = await Subscriber.create({ email });
  res.status(201).json(subscriber);
};

// @desc   Delete a subscriber
// @route  DELETE /api/subscribers/:id
// @access Private/Admin
const deleteSubscriber = async (req, res) => {
  const subscriber = await Subscriber.findById(req.params.id);
  if (!subscriber) {
    return res.status(404).json({ message: "Subscriber not found" });
  }
  await subscriber.deleteOne();
  res.json({ message: "Subscriber removed" });
};

module.exports = {
  getSubscribers,
  createSubscriber,
  deleteSubscriber,
};