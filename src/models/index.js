const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
});

const user = require('./user.model.js')(connection);

module.exports = {
  connection,
  user,
};
