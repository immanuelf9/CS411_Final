const fs = require('fs');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: '35.202.192.135',
    port: '3306',
    user: 'root',
    password: 'group99',
    database: 'discoveat',
    ssl: {
        ca: fs.readFileSync('./server-ca.pem'),
        key: fs.readFileSync('./client-key.pem'),
        cert: fs.readFileSync('./client-cert.pem')
    }
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
   
connection.end();