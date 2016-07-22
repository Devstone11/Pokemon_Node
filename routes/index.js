var express = require('express');
var router = express.Router();
var Pokemon = require('../lib/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/pokemon');
});

router.get('/gym', function(req, res, next) {
  if (req.cookies.p1 && req.cookies.p2) {
    res.render('gym/index', {pokemon1: req.cookies.p1, pokemon2: req.cookies.p2})
  } else {
    res.redirect('/gym/edit');
  }
})

router.get('/gym/edit', function(req, res, next) {
  Pokemon.all('pokemon').then(function(pokemon) {
    if (req.cookies.p1 || req.cookies.p2) {
      var id = req.cookies.p1 || req.cookies.p2;
      Pokemon.find('pokemon', id).then(function(pokemon1) {
        res.render('gym/edit', {pokemon: pokemon.rows, pokemon1: pokemon1.rows[0]});
      })
    } else {
      res.render('gym/edit', {pokemon: pokemon.rows, pokemon1: false});
    }
  })
})

router.post('/gym', function(req, res, next) {
  console.log(req.body);
  var pokemon1;
  if (req.body.pokemon1) {
    pokemon1 = req.body.pokemon1;
  } else {
    
  }



  var pokemon1 = req.body.pokemon1 || req.cookies.p1 || req.cookies.p2;
  Pokemon.setGym('t', pokemon1).then(function() {
    Pokemon.setGym('t', req.body.pokemon2).then(function() {
      res.cookie('p1', req.body.pokemon1 || req.cookies.p1 || req.cookies.p2);
      res.cookie('p2', req.body.pokemon2);
      res.redirect('/gym');
    })
  })
})

module.exports = router;
