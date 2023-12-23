const express = require('express')
const bodyParser = require('body-parser')

const db = require('./database')


const port = 3000
const app = express()



// setting templating 
app.set('views', 'src/views')
app.set('view engine', 'ejs')

// setting body-parser
const urlencoded = bodyParser.urlencoded({ extended: true })
const bodyjson = bodyParser.json()



// select data
// ===========
app.get('/', (req, res) => {
   const sql = 'SELECT * FROM karyawan'

   db.query(sql, (err, result) => {
      if (err) {
         console.log(err);
      }
      else {
         const parse = JSON.parse(JSON.stringify(result))
         res.render('index', { 'hasil': parse, 'title': 'data karyawan' })
      }
   })
})



// insert data 
// ===========

app.get('/add', (req, res) => {
   res.render('tambahData', { 'title': 'tambah data karyawan' })
})


app.post('/tambahJson', urlencoded, (req, res) => {

   const sql = `INSERT INTO karyawan(nama, umur) VALUES ( '${req.body.nama}', ${req.body.umur})`

   db.query(sql, (err, result) => {
      if (err) {
         res.redirect('/add')
         console.log(err);
      }
      else {
         res.redirect('/')
      }
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