const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.Paypal_client_ID,
  client_secret: process.env.Paypal_secret_KEY,
});



module.exports = paypal;
