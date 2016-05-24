var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var Post = require('../models/post');
var checker = require('./checker');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.get(null, function(err, posts) {
    if(err){
      console.error(err);
      req.flash('error', err);
      return res.redirect('/');
    }
    res.render('index', {
      title: '主页',
      posts: posts,
      loged: req.session.user?true:false
    });
  });
});


router.get('/login', checker.notLogin);
router.get('/login', function(req, res, next) {
  res.render('login', {
    title: '登录'
  });
});

router.post('/login', checker.notLogin);
router.post('/login', function(req, res, next) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  User.get(req.body.username, function(err, user) {
    if(!user){
      req.flash('error', '用户不存在！');
      return res.redirect('/login');
    }
    if(user.password != password){
      req.flash('error', '用户密码错误！');
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', '登录成功');
    res.redirect('/');
  });
});

router.get('/reg', checker.notLogin);
router.get('/reg', function(req, res, next) {
  res.render('reg', {
    title: '注册'
  });
});

router.post('/reg', checker.notLogin);
router.post('/reg', function(req, res, next) {
  if(req.body['rpassword'] != req.body['password']){
    req.flash('error', '两次密码输入不一致！');
    return res.redirect('/reg');
  }
  console.log(req.body.password);

  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    name: req.body.username,
    password: password,
    face: '',
    email: ''
  });

  User.get(newUser.name, function(err, user) {
    if(user)
      err = '用户名已存在！';
    if(err){
      req.flash('error', err);
      return res.redirect('/reg');
    }

    newUser.save(function(err) {
      if(err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      req.flash('success', '注册成功');
      res.redirect('/');
    });
  });
});

router.get('/logout', checker.login);
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  req.flash('success', '退出成功');
  res.redirect('/');
});

router.post('/post', checker.login);
router.post('/post', function(req, res, next) {
  var currentUser = req.session.user;
  if(req.body.post.length < 1 || req.body.post.length > 140 ){
    req.flash('error', '微博内容在1到140个字之间！');
    return res.redirect('/');
  }
  var post = new Post(currentUser.name, req.body.post);
  post.save(function(err){
    if(err){
      console.log(err);
      req.flash('error', err);
      return res.redirect('/');
    }
    req.flash('success', '发表成功');
    res.redirect('/');
  });
});



module.exports = router;
