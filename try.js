


const express = require("express");
const sql = require("mssql");

const app = express();

var config = {
    "server": "DESKTOP-AJ58TNK", // Local server IP address or hostname
    "database": "Rely", // Database name
    "options": {
        "authentication": {
            "type": "ntlm" // Use Windows Authentication
        },
        "encrypt": true, // Keep encryption enabled
        "trustServerCertificate": true // Trust self-signed certificate
    }
};

// Connect to SQL Server
sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful!");
});

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