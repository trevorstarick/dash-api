/*jslint node: true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var users = require('./users');

var app = express();

app.use(bodyParser.urlencoded());
app.use(function(req, res, next) {
  console.log(req.body);
  next();
});

app.use(logger('dev'));

app.get('/', function(req, res) {
  res.send(200, 'dat api tho\'');
});

app.use('/users', users);

app.listen(3000);