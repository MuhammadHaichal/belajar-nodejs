# description 
belajar nodejs dengan konsep crud dan menggunakan express 
dan bahasa pemroramman javascript..  dan database menggunakan
mysql.. sebelum itu install mysql anda sesuai sistem operasi kalian


<bold> installasi </bold>
   
    npm install

lalu buat file di root folder dengan nama .env 
dan sesuaikan dengan konfig di database.js 

dan install package <bold> npm install --save dotenv</bold>



<bold> di database.js </bold>
=============================

    const rahasia = {
        user: process.env.user  
        password: process.env.password
        database: process.env.database  
        host: process.env.host
        port: process.env.port  
    }
bisa juga key nya di ganti sesuka hati... misalnya..
    
    
    const rahasia = {
        user: process.env.username
    }
    
    
tetapi di file .env harus sama pemanggilan key nya

    username = 'your username mysql'

<bold> di file .env </bold>
===========================


    user = 'your username mysql'
    password =  'your password mysql'
    database = 'database name mysql'
    host = 127.0.0.1 // bisa juga di ganti alamat host nya
    port = 3306  // bisa juga di ganti alamat port nya

