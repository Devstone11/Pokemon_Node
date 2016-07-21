exports.up = function(knex, Promise) {
  return knex.schema.createTable('pokemon', function(table){
    table.increments('id');
    table.string('name');
    table.integer('trainer_id');
    table.integer('cp');
    table.boolean('in_gym');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pokemon');
};
