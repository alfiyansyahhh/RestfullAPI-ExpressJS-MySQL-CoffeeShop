// const Connection = require("mysql2/typings/mysql/lib/Connection");
// bisa tergubung ke mysql2
const mysql = require('mysql2');
// require('dotenv').config()
const { dbUsername, dbPassword } = require('../helpers/env');

// untuk mengkoneksikan backend dengan mysql
const db = mysql.createConnection({
  host: 'localhost',
  user: dbUsername,
  password: dbPassword,
  database: 'db_coffee-shop',
});
// unutk mengecek koneksi
db.connect((err) => {
  if (err) {
    console.log(`error connection${err}`);
  } else {
    console.log('connection succes');
  }
});

module.exports = db;
