var express = require('express');
var app = express();
var Nexmo = require('nexmo');
var AYLIENTextAPI = require('aylien_textapi');
var request = require('request-promise');
var fs = require('fs');
var path = require('path');

//consts
const execSync = require('child_process').execSync;
const api_key = "AIzaSyDjwrD8gFTDvtXontSBESw9VqmKm_ealgc";
const baseURL = "https://www.googleapis.com/youtube/v3";

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
  let videoIdPath = "/search?part=snippet&maxResults=1&order=relevance&q="+encodeURIComponent(message)+"&type=video&videoCaption=closedCaption&relevanceLanguage=en&key="+api_key;

  request({
    "method":"GET",
    "uri": baseURL+videoIdPath,
    "json": true
  }).then(function(response){
    let vidId = response.items[0].id.videoId;

    var script = "youtube-dl --all-subs --skip-download https://www.youtube.com/watch?v="+vidId;
    var res = execSync(script);

    var captionTrack;

    var files = fs.readdirSync('C:/Users/Kenny/Favorites/Documents/Nexmo Project/');
    for (var i in files) {
      if(path.extname(files[i]) === ".vtt") {
        fs.readFile(files[i], 'utf8', function(err, contents) {
          captionTrack = contents;
        });
      }
    }
    
    execSync('del *.vtt');

    console.log(captionTrack);
    
    /*textapi.summarize({
      title: 'Summary',
      text: captionTrack,
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
    });*/
  }, console.log);

  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});