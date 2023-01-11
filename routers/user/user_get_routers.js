const express = require("express")
const connection = require("../../config/database_sql");
const router = express.Router()

router.get('/fetch-user-details', (req, res)=>{
    res.status(200).json({message:"authorized person doing", user : req.details})
})


router.get('/get-hospital-list', (req,res)=>{
    try {
        const query = "select * from hospital"
        connection.query(query, (err,data) => {
            res.json({data: data})
        })
    }catch (e){
        console.log(e.message)
        res.json({error: e.message})
    }
})

router.get('/get-service-list', (req,res)=>{
    try {
        const query = "select * from services"
        connection.query(query, (err,data) => {
            res.json({data: data})
        })
    }catch (e){
        console.log(e.message)
        res.json({error: e.message})
    }
})

router.get('/get-doctor-list', (req,res)=>{
    try {
        const query = "select * from doctors"
        connection.query(query, (err,data) => {
            res.json({data: data})
        })
    }catch (e){
        console.log(e.message)
        res.json({error: e.message})
    }
})

router.get('/get-donner-list', (req,res)=>{
    try {
        const query = "select * from hospital"
        connection.query(query, (err,data) => {
            res.json({data: data})
        })
    }catch (e){
        console.log(e.message)
        res.json({error: e.message})
    }
})

router.get('/getPatient', (req,res)=>{
    try {
        const query = "select * from patient"
        connection.query(query, (err,data) => {
            res.json({data: data})
        })
    }catch (e){
        console.log(e.message)
        res.json({error: e.message})
    }
})


module.exports = router