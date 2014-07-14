var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dash');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  username: String,
  email: String,
  password: String
});

var User = mongoose.model('users', userSchema);

var app = express.Router();

function verifyInput(callback) {
  for (var key in required) {
    if (!params[required[key]]) {
      response.status = false;
      response.reason = 'Missing ' + required[key];
    }
  }

  if (params.password.length < 5) {
    response.status = false;
    response.reason = 'Password to short. Must be greater than 5 character.';
  }

  return callback;
}

function doesUserExist(email, callback) {
  User.find({
    email: email
  }, function(err, data) {
    if (data.length > 0) {
      return callback;
    } else {
      // return false
    }
  });
}

function createUser(input, callback) {
  var newUser = new User(input);
  newUser.save(function(err, data) {
    if (err) return console.error(err);
    // console.log(data);
  });
}

app.get('/', function(req, res) {
  res.send(200);
});

app.post('/create', function(req, res) {
  var required = [
    'username',
    'firstname',
    'lastname',
    'email',
    'password'
  ];
  var optional = [];

  var params = req.body;
  var status = true;
  var response = {
    status: status
  };

  function sendResponse() {
    res.send(response);
  }
});

module.exports = app;