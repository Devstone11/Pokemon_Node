var express = require('express');
var router = express.Router();
var Trainers = require('../lib/queries');

router.get('/', function(req, res, next) {
  Trainers.all('trainers').then(function(trainers) {
    res.render('trainers/index', {trainers: trainers.rows, passedInData: 12});
  })
});

module.exports = router;
