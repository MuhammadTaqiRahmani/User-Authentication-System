const express = require('express');
const path = require('path');
const fs = require('fs');
const sql = require('mssql');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// MSSQL Configuration
const sql = require('msnodesqlv8');

// Connection configuration
const { Connection, Request } = require('tedious');

// Configuration for Windows Authentication
const config = {
  server: 'localhost', // Server IP address or hostname
  authentication: {
    type: 'ntlm' // Use Windows Authentication
  },
  options: {
    database: 'Rely', // Name of your database
    encrypt: false, // Disable encryption for local development
    trustServerCertificate: true // Trust self-signed certificates
  }
};


// Connection string
const connectionString = `Driver={SQL Server Native Client 11.0};Server=${config.server};Database=${config.database};Trusted_Connection=yes;`;

// Connect to SQL Server
sql.open(connectionString, (err, connection) => {
    if (err) {
        console.error("Connection Failed:", err.message);
        return;
    }
    console.log("Connection Successful!");

    // Example query
    connection.query('SELECT * FROM SomeTable', (err, results) => {
        if (err) {
            console.error("Query Failed:", err.message);
            return;
        }
        console.log("Query Results:", results);
    });
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



// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const sql = require('mssql');

// const app = express();
// const hostname = '127.0.0.1';
// const port = 3000;

// // MSSQL Configuration
// const dbConfig = {
//   server: 'DESKTOP-AJ58TNK', 
//   database: 'Rely', 
//   options: {
//     trustedConnection: true,
//     enableArithAbort: true,
//     encrypt: false, 
//   },
//   driver: 'msnodesqlv8',
// };


// sql.connect(dbConfig).then(pool => {
//   console.log('Connected to the database!');
//   return pool.request().query('SELECT 1 AS number');
// }).then(result => {
//   console.log('Query result:', result.recordset);
// }).catch(err => {
//   console.error('Database connection failed:', err);
//   console.error('SQL Server Error Details:', err.originalError);
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






// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const sql = require('mssql');

// const app = express();

// const port = 3000;

// // MSSQL Configuration
// const connectionString = {
//   server: 'DESKTOP-AJ58TNK',
//   database: 'Rely',
//   options: {
//     trustedConnection: true, // Use Windows Authentication
//     enableArithAbort: true,
//     encrypt: false, // For local development, set to false
//   },
//   driver: 'msnodesqlv8', // Ensure this driver is installed
// };

// sql.connect(connectionString, err => {
//   if (err) {
//       throw err;
//   }
//   console.log("Connection Successful!");
// });




// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
//   // Execute a SELECT query
//   new sql.Request().query("SELECT * FROM mytable", (err, result) => {
//       if (err) {
//           console.error("Error executing query:", err);
//       } else {
//           res.send(result.recordset); // Send query result as response
//           console.dir(result.recordset);
//       }
//   });
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

// app.listen(port, () => {
//   console.log(`Server running at http://${port}/`);
// });
