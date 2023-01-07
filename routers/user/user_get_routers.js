const express = require("express")
const connection = require("../../config/database_sql")
const router = express.Router()

router.get('/fetch-user-details', (req, res)=>{
    res.status(200).json({message:"authorized person doing", user : req.details})
})

router.get('/getUserDetails' , (req , res ) =>{
    const id = req.body.id
    const query = `select * from user where id = ${id}`

    connection.query(query , (err , rows )=>{
        if (err){
            console.log("Error occured")
            throw err
        } 
        else{
            res.json({
                message : "Record fetched." ,
                user : rows
            })
        }
    })
})




module.exports = router