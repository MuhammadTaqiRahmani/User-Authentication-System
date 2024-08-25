const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser'); // Import body-parser to parse form data
var { Connection, Request } = require('tedious');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration for SQL Server connection
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






// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const { ConnectionPool, Request } = require('tedious');

// const app = express();
// const hostname = '127.0.0.1';
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

// // Configuration for SQL Server connection pool
// const poolConfig = {
//     min: 1,
//     max: 10,
//     log: true
// };

// const config = {
//     server: '127.0.0.1',
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'google',
//             password: 'newpassword'
//         }
//     },
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//         database: 'Rely'
//     }
// };

// const pool = new ConnectionPool(poolConfig, config);

// pool.on('connect', (err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//     } else {
//         console.log('Connected to the database');
//     }
// });

// pool.on('error', (err) => {
//     console.error('Database error:', err);
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/signin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'signin.html'));
// });

// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, 'signup.html'));
// });

// app.post('/signup', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     const sql = `INSERT INTO Users (Email, Password) VALUES ('${email}', '${password}')`;

//     pool.acquire((err, connection) => {
//         if (err) {
//             console.error('Error acquiring connection:', err);
//             res.status(500).send('Error acquiring connection.');
//             return;
//         }

//         const request = new Request(sql, (err) => {
//             if (err) {
//                 console.error('Error inserting data:', err);
//                 res.status(500).send('Error saving data.');
//             } else {
//                 res.status(200).send('User registered successfully.');
//             }

//             // Release the connection back to the pool
//             connection.release();
//         });

//         connection.execSql(request);
//     });
// });

// app.use(express.static(path.join(__dirname)));

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
// const bodyParser = require('body-parser');
// const sql = require('mssql');
// var Connection = require('tedious').Connection;

// const app = express();
// const hostname = '127.0.0.1';
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

// // Configuration for SQL Server connection pool
//     var config = {
//         server: '127.0.0.1',  //update me
//         authentication: {
//             type: 'default',
//             options: {
//                 userName: 'google', //update me
//                 password: 'newpassword'  //update me
//             }
//         },
//         options: {
//             encrypt: true,
//             trustServerCertificate: true,
//             database: 'Rely'  //update me
//             //trust the god damned certificates
//         }
//     };
//     var connection = new Connection(config);
//     connection.on('connect', function(err) {
//         // If no error, then good to proceed.
//         console.log("Connected");
//     });

// connection.connect();

// // Connect to the database
// sql.connect(config).then(pool => {
//     if (pool.connected) {
//         console.log('Connected to the database');
//     }

//     app.get('/', (req, res) => {
//         res.sendFile(path.join(__dirname, 'index.html'));
//     });

//     app.get('/signin', (req, res) => {
//         res.sendFile(path.join(__dirname, 'signin.html'));
//     });

//     app.get('/signup', (req, res) => {
//         res.sendFile(path.join(__dirname, 'signup.html'));
//     });

//     // Handle the signup form submission
//     app.post('/signup', async (req, res) => {
//         try {
//             const email = req.body.email;
//             const password = req.body.password;

//             const result = await pool.request()
//                 .query(`INSERT INTO Users (Email, Password) VALUES ('${email}', '${password}')`);

//             res.status(200).send('User registered successfully.');
//         } catch (err) {
//             console.error('Error inserting data:', err);
//             res.status(500).send('Error saving data.');
//         }
//     });

//     app.use(express.static(path.join(__dirname)));

//     app.use((req, res, next) => {
//         fs.readFile(path.join(__dirname, '404.html'), 'utf8', (err, data) => {
//             if (err) {
//                 res.status(404).send('<h1>404 Not Found</h1>');
//             } else {
//                 res.status(404).send(data);
//             }
//         });
//     });

//     app.listen(port, hostname, () => {
//         console.log(`Server running at http://${hostname}:${port}/`);
//     });

// }).catch(err => {
//     console.error('Database connection failed:', err);
// });
