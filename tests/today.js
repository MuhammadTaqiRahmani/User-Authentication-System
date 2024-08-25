// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const { Connection, Request } = require('tedious');

// const app = express();
// const hostname = '127.0.0.1';
// const port = 3000;

// // Middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Configuration for SQL Server connection
// const config = {
//     server: '127.0.0.1',
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'google', //update me
//             password: 'newpassword'  //update me
//         }
//     },
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//         database: 'Rely'  //update me
//     }
// };

// // Serve static files and HTML pages
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/signin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'signin.html'));
// });

// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, 'signup.html'));
// });

// // Handle the signup form submission
// app.post('/signup', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     // Open a new connection for each request
//     const connection = new Connection(config);

//     connection.on('connect', function(err) {
//         if (err) {
//             console.error('Connection failed:', err);
//             res.status(500).send('Error connecting to database.');
//         } else {
//             console.log("Connected");

//             const sql = `INSERT INTO Users (Email, Password) VALUES ('${email}', '${password}')`;
//             const request = new Request(sql, (err) => {
//                 if (err) {
//                     console.error('Error inserting data:', err);
//                     res.status(500).send('Error saving data.');
//                 } else {
//                     res.status(200).send('User registered successfully.');
//                 }

//                 // Close the connection after the request is executed
//                 connection.close();
//             });

//             connection.execSql(request);
//         }
//     });

//     connection.connect();
// });

// // Serve static files like CSS, JS, images, etc.
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





// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser'); // Import body-parser to parse form data
// // var { Connection, Request } = require('tedious');

// const app = express();
// const hostname = '127.0.0.1';
// const port = 3000;

// // Middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Configuration for SQL Server connection
// const { Connection } = require('tedious');

// const config = {
//   server: 'DESKTOP-AJ58TNK',
//   authentication: {
//     type: 'ntlm',
//     options: {
//       domain: '', // Omit or leave empty for local accounts
//       userName: 'Skull Crusher',
//       password: 'berlin',
//     }
//   },
//   options: {
//     encrypt: true,
//     database: 'Rely',
//     trustServerCertificate: true,
//   }
// };


// const connection = new Connection(config);

// connection.on('connect', err => {
//   if (err) {
//     console.error('Connection failed:', err);
//   } else {
//     console.log('Connected to the database.');
//     // You can now run queries on the connection
//   }
// });

// connection.connect();


// // Serve static files and HTML pages
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/signin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'signin.html'));
// });

// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, 'signup.html'));
// });

// // Handle the signup form submission
// app.post('/signup', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     const sql = `INSERT INTO Users (Email, Password) VALUES ('${email}', '${password}')`;

//     const request = new Request(sql, (err) => {
//         if (err) {
//             console.error('Error inserting data:', err);
//             res.status(500).send('Error saving data.');
//         } else {
//             res.status(200).send('User registered successfully.');
//         }
//     });

//     connection.execSql(request);
// });

// // Serve static files like CSS, JS, images, etc.
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
const { Connection, Request } = require('tedious');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration for SQL Server connection
const config = {
  server: 'DESKTOP-AJ58TNK',
  authentication: {
    type: 'ntlm',
    options: {
      domain: '', // Omit or leave empty for local accounts
      userName: 'Skull Crusher',
      password: 'berlin',
    }
  },
  options: {
    encrypt: true,
    database: 'Rely',
    trustServerCertificate: true,
  }
};

const connection = new Connection(config);

connection.on('connect', err => {
  if (err) {
    console.error('Connection failed:', err);
  } else {
    console.log('Connected to the database.');
    // You can now run queries on the connection
  }
});

connection.connect();

// Serve static files and HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'signin.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// Handle the signup form submission
app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `INSERT INTO Users (Email, Password) VALUES ('${email}', '${password}')`;

    const request = new Request(sql, (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving data.');
        } else {
            res.status(200).send('User registered successfully.');
        }
    });

    connection.execSql(request);
});

// Serve static files like CSS, JS, images, etc.
app.use(express.static(path.join(__dirname)));

// Handle 404 errors
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
