var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex.raw(`SELECT * from pokemon`).then(function(pokemon) {
    // console.log(pokemon.rows);
    res.render('pokemon/index', {pokemon: pokemon.rows});
  })
});

router.get('/new', function(req, res, next) {
  res.render('pokemon/new');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  knex.raw(`INSERT into pokemon values (DEFAULT, '${req.body.name}', ${req.body.trainer_id}, ${req.body.cp}, 'f')`).then(function() {
    res.redirect('/');
  });
})

module.exports = router;
