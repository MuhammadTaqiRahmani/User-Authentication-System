// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const createTableIfNotExists = require('./initDb'); // Import table creation logic
const routes = require('./routes'); // Import routes

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Use the routes defined in routes.js
app.use('/', routes);

// Initialize the database table
createTableIfNotExists();

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
