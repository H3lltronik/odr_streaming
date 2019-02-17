var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'odr_streaming'
});

connection.query("SELECT * FROM saga", (err, rows) => {
    if (err) {
        console.log("ERROR", err)
    } else {
        console.log("CONNECTION", rows)
    }
});