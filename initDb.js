// initDb.js
const { Request } = require('tedious');
const connection = require('./db');

// Function to create the Users table if it doesn't exist
function createTableIfNotExists() {
  const createTableQuery = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
    CREATE TABLE Users (
      id INT IDENTITY(1,1) PRIMARY KEY,
      Email NVARCHAR(255) UNIQUE NOT NULL,
      Password NVARCHAR(255) NOT NULL
    )
  `;

  // Wait for the 'connected' event before executing the SQL request
  connection.on('connected', () => {
    const request = new Request(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Users table is ready.');
      }
    });

    connection.execSql(request);
  });
}

// Export the function for use in other files
module.exports = createTableIfNotExists;
