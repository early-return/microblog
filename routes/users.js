var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');

/* GET users listing. */
router.get('/:username', function(req, res, next) {
  var username = req.params.username;
  var currentUser = req.session.user;
  User.get(username, function(err, user){
    if(err){
      req.flash('error', err);
      return res.redirect('/');
    }
    if(!user){
      req.flash('error', '用户不存在');
      return res.redirect('/');
    }
    Post.get(user.name, function(err, posts) {
      if(err){
        req.flash('error', err)
        return res.redirect('/');
      }
      res.render('user', {
        title: user.name,
        posts: posts,
      });
    });
  });
});


module.exports = router;
