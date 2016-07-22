var knex = require('../db/knex');

module.exports = {
  all: function(table) {
    return knex.raw(`SELECT * from ${table}`);
  },
  create: function(pokemon) {
    return knex.raw(`INSERT into pokemon values (DEFAULT, '${pokemon.name}', ${pokemon.trainer_id}, ${pokemon.cp}, 'f')`);
  },
  find: function(table, id) {
    return knex.raw(`SELECT * from ${table} WHERE id=${id}`);
  },
  findMany: function(table, col, val) {
    return knex.raw(`SELECT * from ${table} WHERE ${col}='${val}'`);
  },
  updateOne: function(pokemon, id) {
    return knex.raw(`UPDATE pokemon SET name='${pokemon.name}', trainer_id=${pokemon.trainer_id}, cp=${pokemon.cp}
    WHERE id=${id}`);
  },
  setGym: function(inGym, id) {
    return knex.raw(`UPDATE pokemon SET in_gym='${inGym}' WHERE id=${id}`);
  },
  delete: function(id) {
    return knex.raw(`DELETE from pokemon WHERE id=${id}`);
  }
}
