const express = require('express');
const router = express.Router()
const connection = require('../../config/database_sql')


router.patch('/update',(req,res)=>{
    const id = req.body.id
    const details = req.body.details
    const query = `update services set details = "${details}" where id = ${id}`
    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data updated succesfully", data : req.body})
        
        }
    })
})

router.post('/update-doctor',(req,res)=>{
    const id = req.body.id
    const district = req.body.district
    const zone = req.body.zone
    const query = `update doctors set district = "${district}" , zone = "${zone}" where id = ${id}`
    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data updated succesfully", data : req.body})
        
        }
    })
})

router.patch('/update-department',(req,res)=>{
    const id = req.body.id
    const department_name = req.body.department_name
    const query = `update departments set department_name = "${department_name}"  where id = ${id}`
    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data updated succesfully", data : req.body})
        
        }
    })
})

router.patch('/update-hospital',(req,res)=>{
    const id = req.body.id
    const phone = req.body.phone
    const query = `update hospital set phone = "${phone}"  where id = ${id}`
    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data updated succesfully", data : req.body})
        
        }
    })
})

module.exports = router