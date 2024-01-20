// Konfigurasi Database MySQL
const mysql = require("mysql");
const dbConfig = require("../config/db.config"); // lokasi file db.config.js

// Membuat Koneksi Baru Ke MySQL
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Berhasil terhubung ke database MySQL");
});

module.exports=connection
