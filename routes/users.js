var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');

/* GET users listing. */
router.get('/:username', function(req, res, next) {
  User.get(req.params.username, function(err, user){
    if(!user){
      req.flash('error', '用户不存在');
      return res.redirect('/');
    }
    Post.get(user.name, function(err, posts) {
      if(err){
        req.flash('error', err);
        return res.redirect('/');
      }
      res.render('user', {
        title: 'User',
        posts: posts,
        self: req.params.username == user.name
      });
    });
  });
});

module.exports = router;
