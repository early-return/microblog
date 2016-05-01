var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', function(req, res, next) {
  res.send('login');
});

router.get('/reg', function(req, res, next) {
  res.render('reg', { title: 'Reg' });
});

router.post('/reg', function(req, res, next) {
  res.send('reg');
});

router.get('/logout', function(req, res, next) {
  res.send('logout');
});

router.post('/post', function(req, res, next) {
  res.send('post');
});

module.exports = router;
