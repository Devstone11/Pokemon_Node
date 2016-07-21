var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pokemon/index', {passedInData: "abc"});
});

router.get('/new', function(req, res, next) {
  res.render('pokemon/new');
})

module.exports = router;
