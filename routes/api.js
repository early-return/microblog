var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');

router.get('/index', function(req, res, next) {
  result = {
    error: '',
    result: null
  }
  Post.get(null, function(err, posts) {
    if(err){
      result.error = err;
    }
    result.result = posts;
    res.json(result);
  });
});

router.get('/user/:username', function(req, res, next) {
  var result = {
    error: '',
    result: null
  }
  var username = req.params.username;
  User.get(username, function(err, user){
    if(err){
      result.error = err;
      res.json(result);
      return;
    }else if(!user){
      result.error = 'user not found!';
      res.json(result);
      return;
    }
    Post.get(user.name, function(err, posts) {
      if(err){
        result.error = err;
      }
      result.result = posts;
      res.json(result);
    });
  });
});




module.exports = router;
