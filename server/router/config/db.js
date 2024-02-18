
var mysql = require('mysql');
const db_info = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'streaming_db',
    //port:3306
});

module.exports = db_info;