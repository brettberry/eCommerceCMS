const mysql = require('mysql');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'brett',
  password: 'password',
  database: 'cms'
});

connection.connect();
module.exports = Promise.promisifyAll(connection);
