// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const { Connection, Request } = require('tedious');
// const crypto = require('crypto');
// require('dotenv').config(); // Load environment variables

// const app = express();
// const hostname = '127.0.0.1';
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

// // Configuration for database connection
// const config = {
//   server: process.env.DB_SERVER,
//   authentication: {
//     type: 'ntlm',
//     options: {
//       domain: '',
//       userName: process.env.USER_NAME,
//       password: process.env.PASSWORD,
//     }
//   },
//   options: {
//     encrypt: true,
//     database: process.env.DB_DATABASE,
//     trustServerCertificate: true,
//   }
// };

// const connection = new Connection(config);

// connection.on('connect', err => {
//   if (err) {
//     console.error('Connection failed:', err);
//   } else {
//     console.log('Connected to the database.');
//   }
// });

// connection.connect();

// const validEmailServices = [
//     'gmail.com',
//     'hotmail.com',
//     'yahoo.com',
//     'outlook.com',
//     'aol.com',
//     'icloud.com'
// ];

// // Minimum password length
// const minPasswordLength = 8;

// // Key and IV for AES encryption (these should be stored securely)
// const algorithm = 'aes-256-cbc';
// const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');

// // Encryption function
// function encrypt(text) {
//     const iv = crypto.randomBytes(16); // Generate a new IV for each encryption
//     const cipher = crypto.createCipheriv(algorithm, key, iv);
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return iv.toString('hex') + ':' + encrypted; // Store IV and encrypted data together
// }

// // Decryption function
// function decrypt(encrypted) {
//     const [ivHex, encryptedText] = encrypted.split(':'); // Separate IV and encrypted text
//     const iv = Buffer.from(ivHex, 'hex');
//     const decipher = crypto.createDecipheriv(algorithm, key, iv);
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/signin', (req, res) => {
//   res.sendFile(path.join(__dirname, 'signin.html'));
// });

// app.get('/signup', (req, res) => {
//   res.sendFile(path.join(__dirname, 'signup.html'));
// });

// app.post('/signup', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     // Extract domain from email
//     const emailDomain = email.split('@')[1];

//     // Check if the email domain is in the list of valid services
//     if (!validEmailServices.includes(emailDomain)) {
//         return res.status(400).send('Invalid email: Email service is not supported');
//     }

//     // Check password length
//     if (password.length < minPasswordLength) {
//         return res.status(400).send('Invalid password: Password must be at least 8 characters long');
//     }

//     const checkEmailQuery = `SELECT COUNT(*) AS count FROM Users WHERE Email = '${email}'`;

//     const checkRequest = new Request(checkEmailQuery, (err, rowCount, rows) => {
//         if (err) {
//             console.error('Error checking email:', err);
//             res.status(500).send('Server error. Please try again later.');
//         } else {
//             let emailExists = false;

//             if (rows.length > 0 && rows[0][0].value > 0) {
//                 emailExists = true;
//             }

//             if (emailExists) {
//                 res.status(400).send('This email is already registered.');
//             } else {
//                 // Encrypt the password
//                 const encryptedPassword = encrypt(password);

//                 const insertQuery = `INSERT INTO Users (Email, Password) VALUES ('${email}', '${encryptedPassword}')`;

//                 const insertRequest = new Request(insertQuery, (err) => {
//                     if (err) {
//                         if (err.code === 'EREQUEST' && err.number === 2627) { // Unique constraint violation
//                             console.error('Email already exists:', err);
//                             res.status(400).send('This email is already registered.');
//                         } else {
//                             console.error('Error inserting data:', err);
//                             res.status(500).send('Error saving data.');
//                         }
//                     } else {
//                         res.status(200).send('User registered successfully.');
//                     }
//                 });

//                 connection.execSql(insertRequest);
//             }
//         }
//     });

//     connection.execSql(checkRequest);
// });

// app.post('/signin', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     const checkLoginQuery = `SELECT Id, Password FROM Users WHERE Email = '${email}'`;

//     const loginRequest = new Request(checkLoginQuery, (err, rowCount, rows) => {
//         if (err) {
//             console.error('Error checking login:', err);
//             res.status(500).send('Server error. Please try again later.');
//         } else if (rowCount > 0 && rows.length > 0) {
//             // Assuming rows[0] is an array and the second element contains the Password
//             const storedEncryptedPassword = rows[0][1].value; // Adjust index if necessary

//             // Decrypt the stored password to compare with the plaintext password
//             const decryptedStoredPassword = decrypt(storedEncryptedPassword);


//             if (password === decryptedStoredPassword) {
//                 res.status(200).send('You are logged in');
//             } else {
//                 res.status(400).send('Invalid email or password');

//             }
//         } else {
//             res.status(400).send('Invalid email or password');
//         }
//     });

//     connection.execSql(loginRequest);
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
const bodyParser = require('body-parser');
const { Connection, Request } = require('tedious');
const crypto = require('crypto');
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

// Key and IV for AES encryption (these should be stored securely)
const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');

// Encryption function
function encrypt(text) {
    const iv = crypto.randomBytes(16); // Generate a new IV for each encryption
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Store IV and encrypted data together
}

// Decryption function
function decrypt(encrypted) {
    const [ivHex, encryptedText] = encrypted.split(':'); // Separate IV and encrypted text
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
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

    // Check if the email domain is in the list of valid services
    if (!validEmailServices.includes(emailDomain)) {
        return res.status(400).send('Invalid email: Email service is not supported');
    }

    // Check password length
    if (password.length < minPasswordLength) {
        return res.status(400).send('Invalid password: Password must be at least 8 characters long');
    }

    const checkEmailQuery = `SELECT COUNT(*) AS count FROM Users WHERE Email = '${email}'`;

    const checkRequest = new Request(checkEmailQuery, (err, rowCount, rows) => {
        if (err) {
            console.error('Error checking email:', err);
            res.status(500).send('Server error. Please try again later.');
        } else {
            let emailExists = false;

            if (rows.length > 0 && rows[0][0].value > 0) {
                emailExists = true;
            }

            if (emailExists) {
                res.status(400).send('This email is already registered.');
            } else {
                // Encrypt the password
                const encryptedPassword = encrypt(password);

                // Temporary consistency check
                const decryptedPassword = decrypt(encryptedPassword);
                console.log('Decrypted during signup:', decryptedPassword);

                if (password !== decryptedPassword) {
                    return res.status(500).send('Encryption/Decryption consistency check failed');
                }

                // Continue with the original code...
                const insertQuery = `INSERT INTO Users (Email, Password) VALUES ('${email}', '${encryptedPassword}')`;

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
                        res.status(200).send('User registered successfully.');
                    }
                });

                connection.execSql(insertRequest);
            }
        }
    });

    connection.execSql(checkRequest);
});


app.post('/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const checkLoginQuery = `SELECT Id, Password FROM Users WHERE Email = '${email}'`;

    const loginRequest = new Request(checkLoginQuery, (err, rowCount, rows) => {
        if (err) {
            console.error('Error checking login:', err);
            res.status(500).send('Server error. Please try again later.');
        } else if (rowCount > 0 && rows.length > 0) {
            // Assuming rows[0] is an array and the second element contains the Password
            const storedEncryptedPassword = rows[0][1].value; // Adjust index if necessaryS

            // Decrypt the stored password to compare with the plaintext password
            const decryptedStoredPassword = decrypt(storedEncryptedPassword);


            if (password === decryptedStoredPassword) {
                res.status(200).send('You are logged in');
            } else {
                res.status(400).send('Invalid email or password');

            }
        } else {
            res.status(400).send('Invalid email or password');
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
