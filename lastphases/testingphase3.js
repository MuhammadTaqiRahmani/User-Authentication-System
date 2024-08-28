// oopsss2222
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Connection, Request } = require('tedious');
const crypto = require('crypto'); // Require crypto for hashing
require('dotenv').config(); // Load environment variables

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Configuration for database connection
const config = {
  server: process.env.DB_SERVER,
  authentication: {
    type: 'ntlm',
    options: {
      domain: '',
      userName: process.env.USER_NAME,
      password: process.env.PASSWORD,
    }
  },
  options: {
    encrypt: true,
    database: process.env.DB_DATABASE,
    trustServerCertificate: true,
  }
};

const connection = new Connection(config);

connection.on('connect', err => {
  if (err) {
    console.error('Connection failed:', err);
  } else {
    console.log('Connected to the database.');
  }
});

connection.connect();

const validEmailServices = [
    'gmail.com',
    'hotmail.com',
    'yahoo.com',
    'outlook.com',
    'aol.com',
    'icloud.com'
];

// Minimum password length
const minPasswordLength = 8;

// Function to hash a password using SHA-256
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

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

    // Extract domain from email
    const emailDomain = email.split('@')[1];
    console.log(`Signup attempt - Email: ${email}, Domain: ${emailDomain}`);

    // Check if the email domain is in the list of valid services
    if (!validEmailServices.includes(emailDomain)) {
        console.log('Invalid email service');
        return res.status(400).send('Invalid email: Email service is not supported');
    }

    // Check password length
    if (password.length < minPasswordLength) {
        console.log('Password too short');
        return res.status(400).send('Invalid password: Password must be at least 8 characters long');
    }

    // Hash the password using SHA-256
    const hashedPassword = hashPassword(password);
    console.log(`Hashed password: ${hashedPassword}`);

    const checkEmailQuery = `SELECT COUNT(*) AS count FROM Users WHERE Email = '${email}'`;
    console.log(`Query to check email existence: ${checkEmailQuery}`);

    const checkRequest = new Request(checkEmailQuery, (err) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).send('Server error. Please try again later.');
        }
    });

    let emailExists = false;

    checkRequest.on('row', columns => {
        console.log('Processing row:');
        columns.forEach(column => {
            console.log(`Column: ${column.metadata.colName}, Value: ${column.value}`);
            if (column.value > 0) {
                emailExists = true;
            }
        });
    });

    checkRequest.on('requestCompleted', () => {
        console.log(`Email exists: ${emailExists}`);
        if (emailExists) {
            console.log('Email already registered.');
            res.status(400).send('This email is already registered.');
        } else {
            const insertQuery = `INSERT INTO Users (Email, Password) VALUES ('${email}', '${hashedPassword}')`;
            console.log(`Query to insert new user: ${insertQuery}`);

            const insertRequest = new Request(insertQuery, (err) => {
                if (err) {
                    if (err.code === 'EREQUEST' && err.number === 2627) { // Unique constraint violation
                        console.error('Email already exists:', err);
                        res.status(400).send('This email is already registered.');
                    } else {
                        console.error('Error inserting data:', err);
                        res.status(500).send('Error saving data.');
                    }
                } else {
                    console.log('User registered successfully.');
                    res.status(200).send('User registered successfully.');
                }
            });

            connection.execSql(insertRequest);
        }
    });

    connection.execSql(checkRequest);
});



app.post('/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Extract domain from email
    const emailDomain = email.split('@')[1];
    console.log(`Signin attempt - Email: ${email}, Domain: ${emailDomain}`);

    // Check if the email domain is in the list of valid services
    if (!validEmailServices.includes(emailDomain)) {
        console.log('Invalid email service');
        return res.status(400).send('Invalid email: Email service is not supported');
    }

    const checkLoginQuery = `SELECT Password FROM Users WHERE Email = '${email}'`;
    console.log('Query:', checkLoginQuery);

    // Create a new Request with a callback
    const loginRequest = new Request(checkLoginQuery, (err, rowCount) => {
        if (err) {
            console.error('Error checking login:', err);
            return res.status(500).send('Server error. Please try again later.');
        }

        if (rowCount === 0) {
            console.log('No matching email found');
            return res.status(400).send('Invalid email or password');
        }
    });

    let storedHashedPassword = null;

    loginRequest.on('row', columns => {
        columns.forEach(column => {
            if (column.metadata.colName === 'Password') {
                storedHashedPassword = column.value;
                console.log(`Retrieved stored hashed password: ${storedHashedPassword}`);
            }
        });
    });

    loginRequest.on('requestCompleted', () => {
        if (storedHashedPassword) {
            // Hash the input password and compare it to the stored hashed password
            const hashedPassword = hashPassword(password);
            if (hashedPassword === storedHashedPassword) {
                console.log('Signin successful');
                return res.status(200).send('You are logged in');
            } else {
                console.log('Password mismatch');
                return res.status(400).send('Invalid email or password');
            }
        }
    });

    connection.execSql(loginRequest);
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
