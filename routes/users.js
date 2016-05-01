var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:username', function(req, res, next) {
  res.render('user', { title: req.params.username});
});

module.exports = router;
