const express = require('express')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'http://hospital-env.eba-da4xbhmu.us-east-1.elasticbeanstalk.com',
    user: 'root',
    password: 'chek123456',
    database: 'hospital'
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
