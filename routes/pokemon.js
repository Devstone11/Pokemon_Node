var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Pokemon = require('../lib/queries');

router.get('/', function(req, res, next) {
  Pokemon.all('pokemon').then(function(pokemon) {
    var gymFull = (req.cookies.p1 && req.cookies.p2) ? true : false;
    res.render('pokemon/index', {pokemon: pokemon.rows, gymFull: gymFull});
  })
});

router.get('/new', function(req, res, next) {
  res.render('pokemon/new');
});

router.post('/', function(req, res, next) {
  Pokemon.create(req.body).then(function() {
    res.redirect('/');
  });
})

router.get('/:id', function(req, res, next) {
  Pokemon.find('pokemon', req.params.id).then(function(pokemon) {
    Pokemon.find('trainers', pokemon.rows[0].trainer_id).then(function(trainer) {
      res.render('pokemon/show', {pokemon: pokemon.rows[0], trainer: trainer.rows[0]})
    })
  })
})

router.get('/:id/edit', function(req, res, next) {
  Pokemon.find('pokemon', req.params.id).then(function(pokemon) {
    Pokemon.all('trainers').then(function(trainers) {
      res.render('pokemon/edit', {pokemon: pokemon.rows[0], trainers: trainers.rows})
    })
  })
})

router.post('/:id', function(req, res, next) {
  Pokemon.updateOne(req.body, req.params.id).then(function() {
    res.redirect('/pokemon/'+req.params.id);
  })
})

router.get('/:id/assign-gym', function(req, res, next) {
  Pokemon.setGym('t', req.params.id).then(function() {
    (req.cookies.p1) ? res.cookie('p2', req.params.id) : res.cookie('p1', req.params.id);
    res.redirect('/');
  })
})

router.get('/:id/remove-gym', function(req, res, next) {
  Pokemon.setGym('f', req.params.id).then(function() {
    (req.cookies.p1 === req.params.id) ? res.clearCookie('p1') : res.clearCookie('p2');
    res.redirect('/');
  })
})

router.get('/:id/delete', function(req, res, next) {
  Pokemon.delete(req.params.id).then(function() {
    res.redirect('/');
  })
})

module.exports = router;
