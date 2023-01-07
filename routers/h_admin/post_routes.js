const express = require('express')
const router = express.Router()
const connection = require('../../config/database_sql')

router.post("/hire-doctor" ,(req , res ) =>{
    const hospital_id = req.body.hospital_id
    const doctor_id = req.body.doctor_id
    
    const query = "insert into hospital_doctor ( `hospital_id`, `doctor_id` ) values ("+hospital_id+" , "+doctor_id+")"

    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "Inserted succesfully", data : req.body})
        
        }
    })

    

})

router.post('/add-department' , (req , res) =>{
    const hospital_id = req.body.hospital_id
    const department_id = req.body.department_id
    const query = "insert into hospital_department (`hospital_id` , `department_id`) values ("+hospital_id+" , "+department_id+")"
    
    connection.query(query, (err,rows)=>{
        if (err) throw err
        else{
        console.log(rows)
        res.json({ status: true, message: "Inserted succesfully", data : req.body})
        
        }
    })
})

    router.get('/find-dep-using-doctor-id', (req , res)=>{
        const doctor_id = req.body.doctor_id
        const department_id = req.body.department_id
        const query = `select department_id from doctor_department where doctor_id = ${doctor_id}`
        connection.query(query, (err,rows)=>{
            if (err) throw err
            else{
            console.log(rows)
            res.send(rows)
            
            }
        })

    })


    router.post('/doctor_department', (req , res)=>{
        const hospital_id = req.body.hospital_id
        const doctor_id = req.body.doctor_id
        const query = `select d.department_id from (select * from doctor_department where doctor_id = ${doctor_id} ) as a inner join (select * from hospital_department where hospital_id =${hospital_id}) as d on a.department_id=d.department_id`
        connection.query(query, (err,rows)=>{
            if (err) throw err
            else{
            console.log(rows)
            res.send(rows)
            
            }
        })

    })

    

module.exports =router