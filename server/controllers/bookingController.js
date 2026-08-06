const Booking = require("../models/Booking");

// @desc   Get all bookings
// @route  GET /api/bookings
// @access Private/Admin
const getBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
};

// @desc   Get current user's own bookings
// @route  GET /api/bookings/my
// @access Private
const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ email: req.user.email }).sort({
    createdAt: -1,
  });
  res.json(bookings);
};

// @desc   Create a booking
// @route  POST /api/bookings
// @access Public
const createBooking = async (req, res) => {
  const {
    name,
    email,
    phone,
    eventType,
    date,
    location,
    budget,
    photographer,
    package: pkg,
    totalAmount,
    paidAmount,
  } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  const booking = await Booking.create({
    name,
    email,
    phone: phone || "",
    eventType: eventType || "",
    date,
    location: location || "",
    budget: budget || 0,
    photographer: photographer || "",
    package: pkg || "",
    totalAmount: totalAmount || 0,
    paidAmount: paidAmount || 0,
  });
  res.status(201).json(booking);
};

// @desc   Update booking status
// @route  PUT /api/bookings/:id
// @access Private/Admin
const updateBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  const fields = [
    "name",
    "email",
    "phone",
    "eventType",
    "date",
    "location",
    "budget",
    "photographer",
    "package",
    "totalAmount",
    "paidAmount",
    "status",
  ];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) booking[field] = req.body[field];
  });
  await booking.save();
  res.json(booking);
};

// @desc   Delete booking
// @route  DELETE /api/bookings/:id
// @access Private/Admin
const deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  await booking.deleteOne();
  res.json({ message: "Booking removed" });
};

module.exports = {
  getBookings,
  getMyBookings,
  createBooking,
  updateBooking,
  deleteBooking,
};
