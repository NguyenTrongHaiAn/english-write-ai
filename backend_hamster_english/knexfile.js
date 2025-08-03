require('dotenv').config({ path: './.env' });
// Require dotenv library to read variables from .env file
//Run the config function to load environment variables from the .env file into process.env.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


const config = {
  //development configuration
  development: {
    client: 'pg', // PostgreSQL
    connection: {
      host:     process.env.DB_HOST,
      port:     process.env.DB_PORT,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE // Database name
    },//Used to define connection information to the database.
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
//production configuration
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL, // URL conect database
      ssl: { rejectUnauthorized: false } //
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};

module.exports = config;