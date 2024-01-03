const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const db = require('../database')
let validator = require('validator')

// setting body-parser
const urlencoded = bodyParser.urlencoded({ extended: true })
const bodyjson = bodyParser.json()


// select data
// ===========
const title = 'data karyawan';
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM karyawan'
    db.query(sql, (err, result) => {
        const parse = JSON.parse(JSON.stringify(result))
        res.render('index', {
            'hasil': parse,
            'title': title,
            'errDataNotFound': ''
        })
    })
})
router.post('/', urlencoded, (req, res) => {
    const sql = `SELECT * FROM karyawan WHERE nama LIKE '${req.body.getDataUser}%' `
    db.query(sql, (err, result) => {
        res.render('index', {
            'hasil': result,
            'title': title,
        })
    })
})




// insert data 
// ===========
let insertTitle = 'TAMBAH KARYAWAN';
router.get('/add', (req, res) => {
    res.render('tambahData', {
        'title': insertTitle,
        'errMsgNama': '',
        'errMsgUmur': '',
        'errMsgNamaInput': '',
        'errMsgUmurInput': '',
    })
})
router.post('/add', urlencoded, (req, res) => {
    const getName = req.body.nama;
    const getUmur = req.body.umur;

    if (validator.isEmpty(getName)) {
        res.render('tambahData', {
            'title': insertTitle,
            'errMsgNama': 'd-block',
            'errMsgNamaInput': 'is-invalid',
            'errMsgUmur': '',
            'errMsgUmurInput': '',
        })
    }
    else if (validator.isEmpty(getUmur)) {
        res.render('tambahData', {
            'title': insertTitle,
            'errMsgUmur': 'd-block',
            'errMsgUmurInput': 'is-invalid',
            'errMsgNama': '',
            'errMsgNamaInput': '',
        })
    }
    else {
        const sql = `INSERT INTO karyawan(nama, umur) VALUES ( '${req.body.nama}', ${req.body.umur})`
        db.query(sql, (err, result) => {
            if (err) {
                res.render('tambahData', {
                    'title': insertTitle,
                    'errMsg': err
                })
            }
            else {
                res.redirect('/')
                console.log('berhasil insert data !!');
            }
        })
    }
})





// update data
// ===========
let updateTitle = 'UPDATE DATA KARYAWAN'
router.get('/update', (req, res) => {
    res.render('updateData', { 'title': updateTitle })
})


router.post('/update', urlencoded, (req, res) => {
    const sql = `UPDATE karyawan SET nama = '${req.body.nama}', umur = ${req.body.umur} WHERE id = ${req.body.id}`
    console.log(sql);
    db.query(sql, (err, result) => {
        if (err) {
            console.log('error update data')
        }
        else {
            res.redirect('/')
        }
    })
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