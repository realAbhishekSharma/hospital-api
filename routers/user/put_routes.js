const express = require('express')
const connection = require("../../config/database_sql")
const router = express.Router()

router.put('/updatePassword' , (req,res)=>{
    const id = req.body.id
    const newPassword = req.body.newPassword
    const query = `update user set password = "${newPassword}" where id = ${id}`
    connection.query(query , (err , rows)=>{
        if(err){
            console.log("Unable to update the password.")
            throw err
        }
        else{
            res.json({Message :"Password Update" , newPassword : req.body.newPassword})
        }
    })
})

router.put('/updateEmail' , (req,res)=>{
    const id = req.body.id
    const newEmail = req.body.newEmail
    const query = `update user set email = "${newEmail}" where id = ${id}`
    connection.query(query , (err , rows)=>{
        if(err){
            console.log("Email not Updated")
            throw err
        }
        else{
            res.json({Message :"Email Update" , newEmail : req.body.newEmail})
        }
    })
})

router.put('/updateUserName' , (req,res)=>{
    const id = req.body.id
    const newUserName = req.body.newUserName
    const query = `update user set username = "${newUserName}" where id = ${id}`
    connection.query(query , (err , rows)=>{
        if(err){
            console.log("Username not Updated")
            throw err
        }
        else{
            res.json({Message :"Username Updated" , newUserName : req.body.newUserName})
        }
    })
})

router.put('/updateName' , (req,res)=>{
    const id = req.body.id
    const newName = req.body.newName
    const query = `update user set name = "${newName}" where id = ${id}`
    connection.query(query , (err , rows)=>{
        if(err){
            console.log("Name not Updated")
            throw err
        }
        else{
            res.json({Message :"Name Updated" , newName : req.body.newName})
        }
    })
})


router.put('/updateDistrict' , (req,res)=>{
    const id = req.body.id
    const newDistrict = req.body.newDistrict
    const query = `update user set district = "${newDistrict}" where id = ${id}`
    connection.query(query , (err , rows)=>{
        if(err){
            console.log("District not Updated")
            throw err
        }
        else{
            res.json({Message :"District Updated" , newDistrict : req.body.newDistrict})
        }
    })
})

router.put('/updateZone' , (req,res)=>{
    const id = req.body.id
    const newZone = req.body.newZone
    const query = `update user set zone = "${newZone}" where id = ${id}`
    connection.query(query , (err , rows)=>{
        if(err){
            console.log("Zone not Updated")
            throw err
        }
        else{
            res.json({Message :"Zone Updated" , newZone : req.body.newZone})
        }
    })
})


router.put('/updateAge' , (req,res)=>{
    const id = req.body.id
    const newAge = req.body.newAge
    const query = `update user set age = ${newage} where id = ${id}`
    connection.query(query , (err , rows)=>{
        if(err){
            console.log("Age not Updated")
            throw err
        }
        else{
            res.json({Message :"Age Updated" , newAge : req.body.newAge})
        }
    })
})

module.exports = router