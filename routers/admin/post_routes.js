const express = require('express');
const router = express.Router()
const connection = require('../../config/database_sql')
const Admin = require('./admin_command')

router.post('/add', Admin.checkService,  (req,res)=>{
    const serviceName = req.body.service_name
    const details = req.body.details
    console.log(req.body)
    
    // const query = `insert into services ( service_name , details ) values( "${serviceName}", "${details}")`

    const query = "insert into services ( `service_name` , `details` ) values( '"+serviceName+"', '"+details+"')"

    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data inserted succesfully", data : req.body})
        
        }
    })

})

router.post('/add-doctor', Admin.checkDoctor,  (req,res)=>{
   const doctor_name = req.body.doctor_name
   const phone = req.body.phone
   const district = req.body.district
   const zone = req.body.zone

    console.log(req.body)

    const query = "insert into doctors ( `doctor_name` , `phone` , `district` , `zone` ) values( '"+doctor_name+"', '"+phone+"' , '"+district+"' , '"+zone+"')"

    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data inserted succesfully", data : req.body})
        
        }
    })

})

router.post('/add-department', Admin.checkDepartment,  (req,res)=>{
   const department_name =req.body.department_name
   const description = req.body.description
    console.log(req.body)
    
    const query = "insert into departments ( `department_name` , `description` ) values( '"+department_name+"', '"+description+"')"

    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data inserted succesfully", data : req.body})
        
        }
    })

})

router.post('/add-hospital', Admin.checkHospital,  (req,res)=>{
    const hospital_name =req.body.hospital_name
    const phone = req.body.phone
    const district = req.body.district
    const zone = req.body.zone
    const free_visit_limit = req.body.free_visit_limit
     console.log(req.body)
     
     const query = "insert into hospital ( `hospital_name` , `phone` , `district` , `zone`, `free_visit_limit` ) values( '"+hospital_name+"', '"+phone+"' , '"+district+"' , '"+zone+"' , '"+free_visit_limit+"')"
 
     console.log(query)
 
     connection.query(query, (err,rows)=>{
         if (err) throw err
         else{
         console.log(rows)
         res.json({ status: true, message: "data inserted succesfully", data : req.body})
         
         }
     })
 
 })

module.exports = router