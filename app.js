var express = require('express');
var app = express();
var Nexmo = require('nexmo');

var junkWords = ["summarize", ];

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
  var text = req.query.text.toLowerCase();

  var textArray = text.split(' ');
  var sentences;
  var newArr = [];

  for(var i = 0; i < textArray.length - 1; i++) {
    if(textArray[i + 1].includes("sentence")) {
      sentences = parseInt(textArray[i]);
    }

    //WORK IN PROGRESS
  }

  //var newtext = summarize(text);

  nexmo.message.sendSms('12016441578', msisdn, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      console.dir(responseData);
    }
  });

  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});