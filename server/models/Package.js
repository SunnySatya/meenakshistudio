const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, default: "📦" },
    price: { type: Number, required: true },
    advance: { type: Number, default: 5000 },
    featured: { type: Boolean, default: false },
    features: [{ type: String }],
    disabledFeatures: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Package", packageSchema);
