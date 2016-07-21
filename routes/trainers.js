var express = require('express');
var router = express.Router();
var Trainers = require('../lib/queries');

router.get('/', function(req, res, next) {
  Trainers.all('trainers').then(function(trainers) {
    res.render('trainers/index', {trainers: trainers.rows, passedInData: 12});
  })
});

router.get('/:id', function(req, res, next) {
  Trainers.find('trainers', req.params.id).then(function(trainer) {
    Trainers.findMany('pokemon', 'trainer_id', req.params.id).then(function(pokemon) {
      res.render('trainers/show', {trainer: trainer.rows[0], pokemon: pokemon.rows})
    })
  })
})

module.exports = router;
