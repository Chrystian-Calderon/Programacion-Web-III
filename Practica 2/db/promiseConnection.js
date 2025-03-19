const mysql = require('mysql2/promise');
const config = require('../config/config');

const conn = mysql.createPool(config);

module.exports = conn;