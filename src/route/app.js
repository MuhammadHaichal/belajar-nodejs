const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()


const db = require('../database')

// setting body-parser
const urlencoded = bodyParser.urlencoded({ extended: true })
const bodyjson = bodyParser.json()



// router.use((req,res,next) => {
//     console.log('hello');
//     next()
// })


// select data
// ===========
router.get('/', (req, res) => {
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

router.get('/add', (req, res) => {
    res.render('tambahData', { 'title': 'tambah data karyawan' })
})


router.post('/tambahJson', urlencoded, (req, res) => {

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


// delete data 
// ============

router.get('/delete/:id', (req,res) => {
    const sql = `DELETE FROM karyawan WHERE nama = ${req.params.id}`
    
    db.query(sql, (err, result) => {
        if (err) {
            console.log('err');
        }
        else {
            res.redirect('/')
        }
    })
})  


module.exports = router;