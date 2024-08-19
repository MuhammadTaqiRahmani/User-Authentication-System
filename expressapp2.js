// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const sql = require('mssql');

// const app = express();
// const hostname = '127.0.0.1';
// const port = 3000;

// // MSSQL Configuration
// const dbConfig = {
//   server: 'DESKTOP-AJ58TNK', // Replace with your server name
//   database: 'Rely', // Replace with your database name
//   options: {
//     trustedConnection: true,
//     enableArithAbort: true,
//     encrypt: false, // Set to true if you're using Azure
//   },
//   driver: 'msnodesqlv8', // Necessary for Windows Authentication
// };

// sql.connect(dbConfig).then(() => {
//   console.log('Connected to the database!');
// }).catch(err => {
//   console.error('Database connection failed:', err);
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/signin', (req, res) => {
//   res.sendFile(path.join(__dirname, 'signin.html'));
// });

// app.get('/signup', (req, res) => {
//   res.sendFile(path.join(__dirname, 'signup.html'));
// });

// app.use(express.static(path.join(__dirname)));

// app.use((req, res, next) => {
//   fs.readFile(path.join(__dirname, '404.html'), 'utf8', (err, data) => {
//     if (err) {
//       res.status(404).send('<h1>404 Not Found</h1>');
//     } else {
//       res.status(404).send(data);
//     }
//   });
// });

// app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });



const express = require('express');
const path = require('path');
const fs = require('fs');
const sql = require('mssql');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// MSSQL Configuration
const dbConfig = {
  server: 'DESKTOP-AJ58TNK', 
  database: 'Rely', 
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    encrypt: false, 
  },
  driver: 'msnodesqlv8',
};


sql.connect(dbConfig).then(pool => {
  console.log('Connected to the database!');
  return pool.request().query('SELECT 1 AS number');
}).then(result => {
  console.log('Query result:', result.recordset);
}).catch(err => {
  console.error('Database connection failed:', err);
  console.error('SQL Server Error Details:', err.originalError);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'signin.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
  fs.readFile(path.join(__dirname, '404.html'), 'utf8', (err, data) => {
    if (err) {
      res.status(404).send('<h1>404 Not Found</h1>');
    } else {
      res.status(404).send(data);
    }
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
