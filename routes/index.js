var express = require('express');
var router = express.Router();
var Pokemon = require('../lib/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/pokemon');
});

router.get('/gym', function(req, res, next) {
  if (req.cookies.p1 && req.cookies.p2) {
    Pokemon.find('pokemon', req.cookies.p1).then(function(pokemon1) {
      Pokemon.find('pokemon', req.cookies.p2).then(function(pokemon2) {
        var stronger = (pokemon1.rows[0].cp > pokemon2.rows[0].cp) ? pokemon1.rows[0].id : pokemon2.rows[0].id;
        res.render('gym/index', {pokemon1: pokemon1.rows[0], pokemon2: pokemon2.rows[0], stronger: stronger, winner: false});
      })
    })
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
  if (req.body.pokemon1) {
    Pokemon.setGym('t', 'id', req.body.pokemon1).then(function() {
      Pokemon.setGym('t', 'id', req.body.pokemon2).then(function() {
        res.cookie('p1', req.body.pokemon1);
        res.cookie('p2', req.body.pokemon2);
        res.redirect('/gym');
      });
    });
  } else {
    Pokemon.setGym('t', 'id', req.body.pokemon2).then(function() {
      if (req.cookies.p1) {
        res.cookie('p2', req.body.pokemon2);
      } else {
        res.cookie('p1', req.body.pokemon2);
      };
      res.redirect('/gym')
    });
  }
})

router.post('/gym/reset', function(req, res, next) {
  Pokemon.setGym('f', 'in_gym', true).then(function() {
    res.clearCookie('p1');
    res.clearCookie('p2');
    res.redirect('/gym');
  })
})

module.exports = router;
