// userModel.js
const { Connection, Request, TYPES } = require('tedious');

const createUsersTable = (connection) => {
    const sql = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        email NVARCHAR(255) NOT NULL,
        password NVARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT GETDATE()
    )`;

    const request = new Request(sql, (err) => {
        if (err) {
            console.log("Error creating table:", err);
        } else {
            console.log("Users table created or already exists");
        }
    });

    connection.execSql(request);
};

module.exports = createUsersTable;
