var express = require('express');
var router = express.Router();
var Pokemon = require('../lib/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/pokemon');
});

router.get('/gym', function(req, res, next) {
  Pokemon.all('pokemon').then(function(pokemon) {
    res.render('gym/index', {pokemon: pokemon.rows});
  })
})

module.exports = router;
