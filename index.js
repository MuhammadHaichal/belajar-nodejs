const express = require('express')
const bodyParser = require('body-parser')
const router = require('./src/route/app')

const port = 3000
const app = express()



// setting templating 
app.set('views', 'src/views')
app.set('view engine', 'ejs')


// setting bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// setting route page
app.use('/', router)


// server development
// ==================
app.listen(port, (err) => {
    if (err) {
        console.err(err);
    }
    console.log('server running on http://localhost:3000/');
})