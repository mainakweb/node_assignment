require('dotenv').config()

//use mysql database
const mysql = require('mysql');
const dynamic_db = {};

dynamic_db.connection = (db_name) => {
  //console.log(id);
  let connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      dateStrings:true,
      database: db_name
  });
  return connection;
};

module.exports = dynamic_db;