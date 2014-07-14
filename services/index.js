var Twit = require('twit');
var path = require('path');
var fs = require('fs');

var express = require('express');

var app = express.Router();

var config = fs.readFileSync(path.join(__dirname, './../config.json'));
config = JSON.parse(config);

var T = new Twit(config.twitter);

app.get('/twitter', function(req, res) {
  T.get('statuses/home_timeline', function(err, data, response) {
    if (err) {
      res.jsonp({
        err: err
      });
    } else {
      res.jsonp(data);
    }
  });
});

module.exports = app;