// Import the mysql2 package
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    // Enter the database-specific information here
    host: 'localhost',         // The hostname of the database server
    user: 'root',     // The username used to connect to the database
    password: 'Cst499!', // The password used to connect to the database
    database: 'cst499', // The name of the database to connect to
    port: 3306,                // The port number to use for the database connection (default is 3306)
    connectionLimit: 10,       // The maximum number of connections to create at once (default is 10)
    waitForConnections: true,  // Whether the pool should wait for connections to become available when the connection limit is reached (default is true)
    queueLimit: 0              // The maximum number of connections to queue when waiting for a connection (default is 0)
});

// Export the pool so that it can be used in other modules
module.exports = pool;

// Import the connection pool
const pool = require('./path/to/connection/pool');

// Execute a query
pool.query('SELECT * FROM user_journal_entry', (err, results, fields) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(results);
});
