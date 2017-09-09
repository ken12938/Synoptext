var express = require('express');
var app = express();
var Nexmo = require('nexmo');

var nexmo = new Nexmo({
  apiKey: '2aec9001',
  apiSecret: '33373eccbd477bee',
});

app.get("/", function(req, res) {
    res.send("home");
});

app.get('/incoming-sms', (req, res) => {
  console.log(req.query);

  var msisdn = req.query.msisdn;
  var text = req.query.text;

  var textArray = text.split(' ');

  nexmo.message.sendSms('Nexmo', msisdn, text);

  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});