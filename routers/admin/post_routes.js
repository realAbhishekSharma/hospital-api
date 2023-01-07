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
 router.post('/add-lab', (req,res)=>{
    const labName = req.body.labName
    const description = req.body.description
    const query = "insert into labs (`lab_name` , `lab_description`) values ('"+labName+"' , '"+description+"')"

    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data inserted succesfully", data : req.body})
        
        }
    })

 })

 router.post('/add-role', (req,res)=>{
    const roleName = req.body.roleName
    const description = req.body.description
    const query = "insert into roles (`role_name` , `description`) values ('"+roleName+"' , '"+description+"')"
    
    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data inserted succesfully", data : req.body})
        
        }

    })

 })

 router.post('/add-employee', (req,res)=>{
    const empName = req.body.empName
    const phone = req.body.phone
    const zone = req.body.zone
    const district = req.body.district
    const role_id = req.body.role_id
    const query = "insert into employees (`emp_name` , `phone`, `zone` ,`district`, `role_id`) values ('"+empName+"' , '"+phone+"' , '"+zone+"' , '"+district+"' , "+role_id+")"
    
    console.log(query)

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "data inserted succesfully", data : req.body})
        
        }
    })

 })


 router.post('/add-report', (req,res)=>{
   const enroll_id = req.body.enroll_id
   const refered_doctor_id = req.body.refered_doctor_id
   const test_emp_id = req.body.test_emp_id
   const lab_id = req.body.lab_id
   const test_name = req.body.test_name
   const test_description = req.body.test_description
   const sample_date = req.body.sample_date
   const test_date = req.body.test_date
   const created_date = req.body.created_date
   const modified_date = req.body.modified_date

    const query = "insert into report (`enroll_id` , `refered_doctor_id`, `test_emp_id` ,`lab_id`, `teat_name`, `test_description`, `sample_date`, `test_date`, `created_date`, `modified_date`) values ('"+enroll_id+"', '"+refered_doctor_id+"',''"+test_emp_id+"' '"+lab_id+"', '"+test_name+"', '"+test_description+"', '"+sample_date+"', '"+test_date+"', '"+created_date+"', '"+modified_date+"' )"
    
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