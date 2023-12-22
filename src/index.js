const express = require('express')
const db = require('./database')


const port = 3000
const app = express()


app.set('views', 'src/views')
app.set('view engine', 'ejs')




// select data
// ===========
app.get('/', (req, res) => {
   const sql = 'SELECT * FROM karyawan'
   db.query(sql, (err, result) => {
      const parse = JSON.parse(JSON.stringify(result))
      res.render('index', {'hasil' : parse, 'title' : 'data karyawan'})
   })
})



// insert data 
// ===========
app.post('/add', (req, res) => {
   const sql = `INSERT INTO karyawan(nama, umur) VALUES ('ehsan Fadilah', 18)`
   db.query(sql, (err, result) => {
      const parse = JSON.parse(JSON.stringify(result))

      res.send('ok berhasil add data')
   })
})





// server development
// ==================
app.listen(port, (err) => {
   if (err) {
      console.err(err);
   }
   console.log('server running on http://localhost:3000/');
})