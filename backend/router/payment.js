const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/payment");
const router = express.Router();
const { isAuthenticatedUser } = require("../Middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;