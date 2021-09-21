const mysql2 = require('mysql2');

// create the connection to database
const connection = mysql2.createConnection({
    user: 'root',
    password: 'root',
    database: 'apr-2021',
    host: 'localhost'
});

module.exports = connection.promise();
