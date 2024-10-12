
# User Authentication System

This is a user authentication system built with Node.js, Express.js, and Microsoft SQL Server. The system allows users to sign up, log in, and have their data stored securely using password hashing and email validation.



## Features

**User Registration:** Users can create accounts with a unique email and password.

**Login System:** Registered users can log in using their email and password.

**Password Hashing:** Passwords are securely hashed before being stored in the database.

**Email Validation:** The system checks for valid email format before registration.

**Session Management:** Once logged in, user sessions are maintained across the platform.

**Profile Creation:** Upon registration, a profile is automatically created for the user in the database.


## Technologies Used

**Node.js**: Backend server handling HTTP requests and application logic.

**Express.js**: Web framework for routing and middleware.

**Microsoft SQL Server**: Database for storing user and profile information.

**bcryptjs**: For password hashing.

**Tailwind**: For frontend user interaction.


## Security Features
**Password Hashing:** Passwords are hashed using bcrypt before being stored in the database.

**SQL Injection Prevention:** SQL queries are executed using prepared statements to prevent SQL injection attacks.


## Future Improvements
* Implement session-based or token-based authentication (e.g., JWT) for better security.
* Add input validation to ensure users provide valid and secure data.
* Improve error handling for edge cases and SQL exceptions.




## Installation
#### Clone the repository

```bash
  git clone https://github.com/MuhammadTaqiRahmani/User-Authentication-System
```

#### Change the Directory

```bash
  cd User-Authentication-System-main
```

#### Install dependencies

```bash
  npm install
```

## Database Setup

* Install MS SQL Server (Developer tool prefered) and SQL Server Management Studio.
* Create and name a Database in Microsoft SQL Server Database.




## Environment Variables

### Set up .env file

This System is setup on Windows Authentication with Database.

Create a file name as .env then define these Variables according to your system.


`DB_SERVER = 'database servername'`

`DB_DATABASE = 'database name'`

`USER_NAME = 'username'`

`PASSWORD = 'password'`

## Run the server

```bash
  node app.js
```

## Possibility of Database connection Error

There is Possibility of Database connection error.

```bash
  Connection failed: ConnectionError: Failed to connect to DB_SERVER:1433 - Could not connect (sequence) at Connection.socketError 
```

### Solution of the Error
* Install mssql

```bash
  npm install mssql --save
```

* Install nodemon

```bash
  npm install -g nodemon
```
## Dependencies

[![express](https://img.shields.io/badge/express-4.19.2-EF2D5E.svg?)](https://expressjs.com/)

[![msnodesqlv8](https://img.shields.io/badge/msnodesqlv8-4.2.1-FF4438.svg?)](https://www.npmjs.com/package/msnodesqlv8)

[![mssql](https://img.shields.io/badge/mssql-11.0.1-FF9E0F.svg?)](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)


[![dotenv](https://img.shields.io/badge/dotenv-16.4.5-0ABF5.svg?)](https://www.npmjs.com/package/dotenv)

[![bcryptl](https://img.shields.io/badge/bcrypt-5.1.1-9999FF.svg?)](https://www.npmjs.com/package/bcryptjs)

[![multer](https://img.shields.io/badge/multer-1.4.5-099DFD.svg?)](https://www.npmjs.com/package/multer)

[![tedious](https://img.shields.io/badge/tedious-19.0.0-7D929E.svg?)](https://www.npmjs.com/package/tedious)
## 🔗 Credit

[![playtailwind](https://img.shields.io/badge/Credit-playtailwind-06B6D4.svg?style=for-the-badge)](https://github.com/uideck/play-tailwind.git)

## 📄 License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)






## 🔗 Profile
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/muhammad-taqi-rahmani-857709255/)


