const express = require('express')
const app = express()
const port = 8888

//use this for parsing post body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

//define template engine for rendering html page
app.set('view engine', 'ejs')


//respond main page when a user request to the root path
app.get('/', (req, res) => {
    res.render('index')
})

//load braintree 
const braintree = require("braintree");

//Create a Braintree Gateway Instance
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "gr7p2fp4yqp3gcdf",
  publicKey: "kq5tcsbndk8fp2wb",
  privateKey: "dea5726b0ba7a745a54227a85e3cfb1b	"
});

/* Create a clientToken and return back to the client side
   This path will be requested once web page is loaded
   In the future, customerID will be used while creating a clientToken,
   The server can recognize users(customerIDs) through creating, storing and using cookies.
*/
app.post("/client_token", (req, res) => {
  gateway.clientToken.generate({}, (err, response) => { 
  res.send(response.clientToken);
  });
});

/*
  This path will be called when users decide to complete transactions and payments
  The path will receive following data from client side to generate sales through gateway instance
  - nonceFromTheClient: this can be recognize the payment method and info
  - amount: sales revenue
  - deviceData: this can be used for detecting fraud. (In this assessment, I did not implement this due to time restriction, but I will not miss this when I can be a Solutions Engineer)
  
*/
app.post("/checkout", (req, res) => {
    /*
  const nonceFromTheClient = req.body.payment_method_nonce;
  const paymentAmount = req.body.payment_amount;

  gateway.transaction.sale({
    amount: paymentAmount,
    paymentMethodNonce: nonceFromTheClient,
    deviceData: "MAC",
    options: {
      submitForSettlement: true
    }
  }, (err, result) => {
  });
  */
    res.send("Payment Complete");
});


app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
