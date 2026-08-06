const express = require("express");
const router = express.Router();
const {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");
const { protect, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");
const optimizeImage = require("../middleware/imageProcessor");

router
  .route("/")
  .get(getPortfolio)
  .post(
    protect,
    adminOnly,
    upload.single("image"),
    optimizeImage,
    createPortfolio,
  );
router
  .route("/:id")
  .put(
    protect,
    adminOnly,
    upload.single("image"),
    optimizeImage,
    updatePortfolio,
  )
  .delete(protect, adminOnly, deletePortfolio);

module.exports = router;
