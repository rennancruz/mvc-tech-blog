const Sequelize = require('sequelize');
require('dotenv').config();

// Create a connection to the database, prioritizing DB_URL for flexibility
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: 'postgres',
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
      }
    );

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connection established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;