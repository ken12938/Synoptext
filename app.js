var express = require('express');
var app = express();
var Nexmo = require('nexmo');
var AYLIENTextAPI = require('aylien_textapi');

var nexmo = new Nexmo({
  apiKey: '2aec9001',
  apiSecret: '33373eccbd477bee',
});
var textapi = new AYLIENTextAPI({
    application_id: '39acf72e',
    application_key: '2f1cbec3166847a1c0e78dc724b25290'
});

app.get("/", function(req, res) {
    res.send("home");
});

app.get('/incoming-sms', (req, res) => {
  console.log(req.query);

  var msisdn = req.query.msisdn;
  var text = req.query.text.toLowerCase();

  var textArray = text.split(',');
  var sentences = parseInt(textArray[1].trim().split(' ')[0]);
  var message = parseInt(textArray[0].trim());

  //var newtext = summarize(text);

  textapi.summarize({
    title: 'Articles',
    text: 'The Treaties of the European Union are a set of international treaties between the European Union (EU) member states which sets out the EU\'s constitutional basis. They establish the various EU institutions together with their remit, procedures and objectives. The EU can only act within the competences granted to it through these treaties and amendment to the treaties requires the agreement and ratification (according to their national procedures) of every single signatory. Two core functional treaties, the Treaty on European Union (originally signed in Maastricht in 1992) and the Treaty on the Functioning of the European Union (originally signed in Rome in 1957 as the Treaty establishing the European Economic Community), lay out how the EU operates, and there are a number of satellite treaties which are interconnected with them. The treaties have been repeatedly amended by other treaties over the 65 years since they were first signed. The consolidated version of the two core treaties is regularly published by the European Commission.',
    sentences_number: 2
  }, function(error, response) {
    if (error === null) {
      var summary = '';

      response.sentences.forEach(function(s) {
        summary = summary.concat(s + '\n');
      });

      nexmo.message.sendSms('12016441578', msisdn, summary, (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      });
    } else {
      console.log('Reached here');
      nexmo.message.sendSms('12016441578', msisdn, error, (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      });
    }
  });

  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});