const mysql = require('mysql');
var conn = mysql.createConnection({
    host: "mysql-168139-0.cloudclusters.net",
    user: "admin",
    password: "vkHP63U1",
    database: 'venta_directa',
    port: 10048

  });
  

conn.connect();

module.exports = conn;