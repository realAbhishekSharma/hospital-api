const express = require('express');
const router = express.Router()
const connection = require('../../config/database_sql')

router.delete('/delete',(req,res)=>{
    const id = req.body.id
    console.log(req.body)
    const query = `DELETE FROM services where id = ${id};`
    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data deleted succesfully", data : req.body})
        
        }
    })
})
 
router.delete('/delete-doctor',(req,res)=>{
    const id = req.body.id
    console.log(req.body)
    const query = `DELETE FROM doctors where id = ${id};`
    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data deleted succesfully", data : req.body})
        
        }
    })
})

router.delete('/delete-department',(req,res)=>{
    const id = req.body.id
    console.log(req.body)
    const query = `DELETE FROM departments where id = ${id}`
    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data deleted succesfully", data : req.body})
        
        }
    })
})

router.delete('/delete-hospital',(req,res)=>{
    const id = req.body.id
    console.log(req.body)
    const query = `DELETE FROM hospital where id = ${id};`
    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data deleted succesfully", data : req.body})
        
        }
    })
})

module.exports = router