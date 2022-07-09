const express = require('express')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mydata'
})

connection.connect((err) =>{
    if (err){
        console.log("Can't connect.")
        console.trace()
    }else {
        console.log("Connected.")
    }
} )

module.exports = connection