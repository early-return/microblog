var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');

router.get('/index', function(req, res, next) {
  Post.get(null, function(err, posts) {
    if(err){
      console.error(err);
      req.flash('error', err);
      return res.redirect('/');
    }
    res.end(JSON.stringify(posts));
  });
});

module.exports = router;
