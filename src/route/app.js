const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
let validator = require('validator')
const db = require('../database')

// setting body-parser
const urlencoded = bodyParser.urlencoded({ extended: true })
const bodyjson = bodyParser.json()





// select data
// ===========
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM karyawan'
    db.query(sql, (err, result) => {
        if (err == null) {
            console.log('maaf tidak ada data karyawan');
        }
        else {
            const parse = JSON.parse(JSON.stringify(result))
            res.render('index', { 'hasil': parse, 'title': 'data karyawan' })
        }
    })
})

router.post('/', urlencoded, (req, res) => {
    const sql = `SELECT * FROM karyawan WHERE nama = '${req.body.getDataUser}'`
    db.query(sql, (err, result) => {
        if (err == null) {
            console.log('data tidak ditemukan');
        }
        else {
            res.render('index', { 'hasil': result, 'title': 'data karyawan' })
        }
    })
}):==



// insert data 
// ===========
router.get('/add', (req, res) => {
    let title = 'TAMBAH KARYAWAN';
    res.render('tambahData', {
        'title': title,
        'errMsgNama': '',
        'errMsgUmur': '',
    })
})


router.post('/add', urlencoded, (req, res) => {
    let title = 'TAMBAH KARYAWAN';
    const getName = req.body.nama;
    const getUmur = req.body.umur;

    if (validator.isEmpty(getName)) {
        res.render('tambahData', {
            'title': title,
            'errMsgNama': 'd-block',
            'errMsgUmur': 'd-block',
        })
    }

    else if (validator.isEmpty(getUmur)) {
        res.render('tambahData', {
            'title': title,
            'errMsgUmur': 'd-block',
            'errMsgNama': 'd-block',
        })
    }
    
    else {
        const sql = `INSERT INTO karyawan(nama, umur) VALUES ( '${req.body.nama}', ${req.body.umur})`
        db.query(sql, (err, result) => {
            if (err) {
                res.render('tambahData', {
                    'title': title,
                    'errMsg': err
                })
            }
            else {
                res.redirect('/')
                console.log('berhasil !!');
            }
        })
    }
})


// delete data 
// ============

router.get('/delete/:id', (req, res) => {
    const sql = `DELETE FROM karyawan WHERE id = ${req.params.id}`

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/')
        }
    })
})


module.exports = router;