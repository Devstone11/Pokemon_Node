require('dotenv').config({silent: true});

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/pokemon_node'
    // connection: process.env.DATABASE_URL
    // cut from .env file: DATABASE_URL=postgres://localhost/pokemon_node
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
