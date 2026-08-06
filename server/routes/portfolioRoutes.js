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

router.route("/").get(getPortfolio).post(protect, adminOnly, upload.single("image"), createPortfolio);
router
  .route("/:id")
  .put(protect, adminOnly, upload.single("image"), updatePortfolio)
  .delete(protect, adminOnly, deletePortfolio);

module.exports = router;