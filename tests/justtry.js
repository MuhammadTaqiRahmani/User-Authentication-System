// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const createUsersTable = require('./userModel');  // Import the model
// var Request = require('tedious').Request;

// const app = express();
// const hostname = '127.0.0.1';
// const port = 3000;

// // Configuration for Windows Authentication
// var Connection = require('tedious').Connection;
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
//         createUsersTable(connection);  // Call the function to create the table
//     });

// connection.connect();

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
const bodyParser = require('body-parser');  // Add this line
const createUsersTable = require('./userModel');  // Import the model
var Request = require('tedious').Request;

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

// Configuration for Windows Authentication
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
    }
};

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        // If no error, then good to proceed.
        console.log("Connected");
        createUsersTable(connection);  // Call the function to create the table
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

// POST route for form submission
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    const sql = `INSERT INTO users (email, password) VALUES (@Email, @Password)`;

    const request = new Request(sql, (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving user');
        } else {
            res.status(200).send('User registered successfully');
        }
    });

    request.addParameter('Email', TYPES.NVarChar, email);
    request.addParameter('Password', TYPES.NVarChar, password);

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
