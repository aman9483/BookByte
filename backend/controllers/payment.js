const stripe = require("stripe")(process.env.stripe_seceret_key);

exports.processPayment = async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Book Store",
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.sendStripeApiKey = async (req, res, next) => {
  try {
    res.status(200).json({ stripeApiKey: process.env.stripe_Api_Key });
  } catch (error) {
    console.error("Error sending Stripe API key:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
