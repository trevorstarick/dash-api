/*jslint node: true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var users = require('./users');
var services = require('./services');

var app = express();
express.response.jsonp = function(obj) {
  // allow status / body
  if (2 == arguments.length) {
    // res.json(body, status) backwards compat
    if ('number' == typeof arguments[1]) {
      this.statusCode = arguments[1];
      return 'number' === typeof obj ? jsonpNumDeprecated.call(this, obj) : jsonpDeprecated.call(this, obj);
    } else {
      this.statusCode = obj;
      obj = arguments[1];
    }
  }

  // settings
  var app = this.app;
  var replacer = app.get('json replacer');
  var spaces = app.get('json spaces');
  var body = JSON.stringify(obj, replacer, spaces)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  var callback = this.req.query[app.get('jsonp callback name')];

  // content-type
  this.get('Content-Type') || this.set('Content-Type', 'application/json');

  // fixup callback
  if (Array.isArray(callback)) {
    callback = callback[0];
  }

  // jsonp
  if (callback && 'string' === typeof callback) {
    this.set('Content-Type', 'text/javascript');
    var cb = callback.replace(/[^\[\]\w$.]/g, '');
    body = cb + '(' + body + ');';
  }

  return this.send(body);
};

app.use(bodyParser.urlencoded());
app.use(logger('dev'));
app.all('*', function(req, res, next) {
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});


app.get('/', function(req, res) {
  res.send(200, 'dat api tho\'');
});

app.use('/users', users);
app.use('/services', services);

app.listen(8000);