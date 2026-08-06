const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    eventType: { type: String, default: "" },
    date: { type: Date },
    location: { type: String, default: "" },
    budget: { type: Number, default: 0 },
    photographer: { type: String, default: "" },
    package: { type: String, default: "" },
    totalAmount: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
