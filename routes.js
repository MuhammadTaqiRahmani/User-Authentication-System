const express = require('express');
const path = require('path');
const fs = require('fs');
const { Request } = require('tedious');
const crypto = require('crypto'); // Require crypto for hashing
const connection = require('./db'); // Import the database connection

const router = express.Router();

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

// Function to check for uppercase letters in an email
function containsUpperCase(str) {
  return /[A-Z]/.test(str);
}

// Routes
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'signin.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

router.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check if the email contains uppercase letters
  if (containsUpperCase(email)) {
    console.log('Email contains uppercase letters');
    return res.status(400).send('Invalid email: Capital letters are not allowed');
  }

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

router.post('/signin', (req, res) => {
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

router.use((req, res) => {
  fs.readFile(path.join(__dirname, '404.html'), 'utf8', (err, data) => {
    if (err) {
      res.status(404).send('<h1>404 Not Found</h1>');
    } else {
      res.status(404).send(data);
    }
  });
});

module.exports = router;
