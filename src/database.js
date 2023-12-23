const mysql = require('mysql2')
const env = require('dotenv').config()


// kredensial 
const rahasia = {
   'user': process.env.user,
   'password': process.env.password,
   'database': process.env.database,
   'host': process.env.host,
   'port': process.env.port,

}


// konfigurasi server koneksi database mysql
const db = mysql.createConnection({
   user: rahasia.user,
   password: rahasia.password,
   database: rahasia.database,
   host: rahasia.host,
   port: rahasia.port,
})


// periksa kondisi jika server sedang error atau down
db.connect((err) => {
   if (err) {
      console.log(`gagal terhubung ke database { eror_log: ${err}}`);
   }
   else {
      console.log('berhasil koneksi ke database mysql')
   }
})




module.exports = db