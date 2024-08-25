const express = require('express');
const path = require('path');
const fs = require('fs');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Configuration for Windows Authentication
var config = {
    server: '127.0.0.1',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'google', //update me
            password: 'sqlserver'  //update me
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
    if (err) {
        console.log('Connection Error: ', err);
        return;
    }
    console.log("Connected");

    // Create Users Table if it doesn't exist
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
        CREATE TABLE Users (
            id INT PRIMARY KEY IDENTITY(1,1),
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
    `;

    const request = new Request(createTableQuery, function(err) {
        if (err) {
            console.log('Error Creating Table: ', err);
        } else {
            console.log('Users Table Created or Already Exists');
        }
    });

    connection.execSql(request);
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
