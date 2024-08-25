const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser'); 
var { Connection, Request } = require('tedious');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Configuration for SQL Server connection
var config = {
    server: '127.0.0.1', 
    authentication: {
        type: 'default',
        options: {
            userName: 'google', 
            password: 'newpassword' 
        }
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,
        database: 'Rely' 
    }
};

function executeSQLQuery(sql, callback) {
    var connection = new Connection(config);
    
    connection.on('connect', function(err) {
        console.log("Connected");
            const request = new Request(sql, (err, rowCount) => {
                if (err) {
                    console.error('Error executing SQL:', err);
                    callback(err, null);
                } else {
                    console.log(`${rowCount} row(s) affected`);
                    callback(null, rowCount);
                }
                connection.close();
            });

            connection.execSql(request);
    });

    connection.connect();
}



// Handle the signup form submission
app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `INSERT INTO Users (Email, Password) VALUES ('${email}', '${password}')`;

    executeSQLQuery(sql, (err, result) => {
        if (err) {
            res.status(500).send('Error saving data.');
        } else {
            res.status(200).send('User registered successfully.');
        }
    });
});

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
