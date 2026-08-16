const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController");

router.route("/create-order").post(createOrder);
router.route("/verify").post(verifyPayment);

module.exports = router;