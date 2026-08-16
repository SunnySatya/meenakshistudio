const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Booking");
const Package = require("../models/Package");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc   Create a Razorpay order for a booking's advance amount
// @route  POST /api/payments/create-order
// @access Public
const createOrder = async (req, res) => {
  const { bookingId } = req.body;
  if (!bookingId) {
    return res.status(400).json({ message: "Booking ID is required" });
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  // Resolve advance amount from the selected package (or fallback to 5000)
  let advance = 5000;
  if (booking.eventType === "Small Party") {
    advance = 1000;
  } else if (booking.package) {
    const pkg = await Package.findOne({ name: booking.package });
    if (pkg && pkg.advance) advance = pkg.advance;
  }

  try {
    const options = {
      amount: advance * 100, // paise
      currency: "INR",
      receipt: `booking_${booking._id}`,
      notes: { bookingId: String(booking._id) },
    };
    const order = await razorpay.orders.create(options);
    res.json({
      orderId: order.id,
      amount: advance,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ message: "Failed to create payment order" });
  }
};

// @desc   Verify Razorpay payment signature & confirm the booking
// @route  POST /api/payments/verify
// @access Public
const verifyPayment = async (req, res) => {
  const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
    req.body;
  if (!bookingId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return res.status(400).json({ message: "Missing payment details" });
  }

  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expected !== razorpaySignature) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  let advance = 5000;
  if (booking.eventType === "Small Party") {
    advance = 1000;
  } else if (booking.package) {
    const pkg = await Package.findOne({ name: booking.package });
    if (pkg && pkg.advance) advance = pkg.advance;
  }

  booking.paidAmount = advance;
  booking.paymentId = razorpayPaymentId;
  booking.orderId = razorpayOrderId;
  booking.status = "confirmed";
  await booking.save();

  res.json({ message: "Payment successful! Booking confirmed.", booking });
};

module.exports = { createOrder, verifyPayment };