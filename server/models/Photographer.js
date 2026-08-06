const mongoose = require("mongoose");

const photographerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    avatar: { type: String, default: "" },
    rating: { type: Number, default: 5.0 },
    bookings: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
    verified: { type: Boolean, default: true },
    featured: { type: Boolean, default: true },
    portfolio: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Photographer", photographerSchema);
