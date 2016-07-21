var express = require('express');
var router = express.Router();
var Pokemon = require('../lib/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/pokemon');
});

router.get('/gym', function(req, res, next) {
  if (req.cookies.p1 && req.cookies.p2) {
    console.log(req.cookies.p1);
    Pokemon.find('pokemon', req.cookies.p1).then(function(pokemon1) {
      Pokemon.find('pokemon', req.cookies.p2).then(function(pokemon2) {
        res.render('gym/index', {pokemon1: pokemon1.rows[0], pokemon2: pokemon2.rows[0]})
      })
    })
  } else {
    Pokemon.all('pokemon').then(function(pokemon) {
      res.render('gym/edit', {pokemon: pokemon.rows});
    })
  }
})

router.post('/gym', function(req, res, next) {
  console.log(req.body);
  res.cookie('p1', req.body.pokemon1);
  res.cookie('p2', req.body.pokemon2);
  res.redirect('/gym');
})

module.exports = router;
