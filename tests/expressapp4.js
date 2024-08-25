// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser'); // To parse form data
// const { Connection, Request } = require('tedious');

// const app = express();
// const hostname = '127.0.0.1';
// const port = 3000;

// // Middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Configuration for database connection
// const config = {
//     server: '127.0.0.1',
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'google', // update me
//             password: 'newpassword' // update me
//         }
//     },
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//         database: 'Rely' // update me
//     }
// };

// const connection = new Connection(config);
// connection.on('connect', function (err) {
//     if (err) {
//         console.error("Connection Failed", err);
//     } else {
//         console.log("Connected to database");
//         // Create the Users table if it doesn't exist
//         const createTableQuery = `
//             IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' and xtype='U')
//             CREATE TABLE Users (
//                 Id INT IDENTITY(1,1) PRIMARY KEY,
//                 Email NVARCHAR(255) NOT NULL,
//                 Password NVARCHAR(255) NOT NULL
//             );
//         `;
//         const request = new Request(createTableQuery, function (err) {
//             if (err) {
//                 console.error("Failed to create table", err);
//             } else {
//                 console.log("Table created or already exists.");
//             }
//         });
//         connection.execSql(request);
//     }
// });

// connection.connect();

// // Serve HTML files
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/signin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'signin.html'));
// });

// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, 'signup.html'));
// });

// // Handle signup form submission
// app.post('/signup', (req, res) => {
//     const { email, password } = req.body;

//     // Insert user into the database
//     const insertQuery = `
//         INSERT INTO Users (Email, Password)
//         VALUES ('${email}', '${password}');
//     `;
//     const request = new Request(insertQuery, function (err) {
//         if (err) {
//             console.error("Failed to insert user", err);
//             res.status(500).send("Error saving user to database.");
//         } else {
//             console.log("User saved to database.");
//             res.send("Signup successful!");
//         }
//     });
//     connection.execSql(request);
// });

// app.use(express.static(path.join(__dirname)));

// // Handle 404 errors
// app.use((req, res, next) => {
//     fs.readFile(path.join(__dirname, '404.html'), 'utf8', (err, data) => {
//         if (err) {
//             res.status(404).send('<h1>404 Not Found</h1>');
//         } else {
//             res.status(404).send(data);
//         }
//     });
// });

// app.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });



const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

var Connection = require('tedious').Connection;

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// SQL Server connection configuration
var Connection = require('tedious').Connection;
    var config = {
        server: '127.0.0.1',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'google', //update me
                password: 'newpassword'  //update me
            }
        },
        options: {
            encrypt: true,
            trustServerCertificate: true,
            database: 'Rely'  //update me
            //trust the god damned certificates
        }
    };
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        // If no error, then good to proceed.
        console.log("Connected");
    });

connection.connect();


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'signin.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sqlQuery = `INSERT INTO Users (Email, Password) VALUES (@Email, @Password)`;

    const request = new Request(sqlQuery, function(err) {
        if (err) {
            console.error('Error inserting data', err);
            res.status(500).send('Error signing up');
        } else {
            res.send('Signup successful');
        }
    });

    request.addParameter('Email', TYPES.VarChar, email);
    request.addParameter('Password', TYPES.VarChar, password);

    connection.execSql(request);
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

