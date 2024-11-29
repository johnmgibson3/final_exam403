const knex = require('knex');
const config = require('./config'); // Import your config.js file

// Create and export the Knex instance
module.exports = knex({
  client: 'pg', // PostgreSQL as the client
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    port: config.db.port,
  },
});