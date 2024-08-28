// db.js
const { Connection } = require('tedious');
require('dotenv').config(); // Load environment variables

// Configuration for database connection
const config = {
  server: process.env.DB_SERVER,
  authentication: {
    type: 'ntlm',
    options: {
      domain: '',
      userName: process.env.USER_NAME,
      password: process.env.PASSWORD,
    }
  },
  options: {
    encrypt: true,
    database: process.env.DB_DATABASE,
    trustServerCertificate: true,
  }
};

// Create and export the connection
const connection = new Connection(config);

// Listen for the 'connect' event
connection.on('connect', err => {
  if (err) {
    console.error('Connection failed:', err);
  } else {
    console.log('Connected to the database.');
    // Emit a custom event when connected
    connection.emit('connected');
  }
});

connection.connect();

module.exports = connection;
