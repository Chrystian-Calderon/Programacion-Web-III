const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: "localhost",
    database: "umsa_db_practica4",
    user: "root",
    password: "",
    port: 3307,
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = connection;