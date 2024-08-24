


const express = require("express");
const sql = require("mssql");

const app = express();

var Connection = require('tedious').Connection;
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
            //trust the god damned certificates
        }
    };
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        // If no error, then good to proceed.
        console.log("Connected");
    });

    connection.connect();
// Define route for fetching data from SQL Server
app.get("/", (request, response) => {
    // Execute a SELECT query
    new sql.Request().query("SELECT * FROM Employee", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            response.send(result.recordset); // Send query result as response
            console.dir(result.recordset);
        }
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Listening on port 3000...");
});