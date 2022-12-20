const express = require('express')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
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
