const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect, adminOnly } = require("../middleware/auth");
const optimizeImage = require("../middleware/imageProcessor");

// Generic image upload endpoint
// POST /api/upload
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  optimizeImage,
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(201).json({
      message: "File uploaded successfully",
      url: `/uploads/${req.file.filename}`,
    });
  },
);

module.exports = router;
