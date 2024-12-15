const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'feneress',
  password: '1234',
  database: 'bdlibras'
});

module.exports = db;

