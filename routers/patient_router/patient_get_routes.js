const express =  require("express")
const app = express();
const connection = require('../../config/database_sql')
const routes = express.Router();

routes.get('/getService', (req, res)=>{

    const query = "SELECT DEP.id ,DEP.department_id, DEP.department_name, DEP.service_id, s.service_name FROM services s INNER JOIN (SELECT ds.id ,ds.department_id, d.department_name, ds.service_id FROM department_service ds INNER JOIN departments d on ds.department_id = d.id) AS DEP on DEP.service_id = s.id"

    connection.query(query, (err, data)=>{
        if (!err){
            res.json(data)
        }
    })
})

routes.get('/getHospital', (req, res)=>{
    const id = req.body.department_id
    const query = "SELECT HOS.id, HOS.h_id, HOS.hospital_name, d.department_name,d.id as d_id FROM departments d INNER JOIN (SELECT hd.id,h.id as h_id,h.hospital_name, hd.department_id FROM hospital_department hd INNER JOIN hospital h on h.id = hd.hospital_id) AS HOS ON d.id = HOS.department_id WHERE d.id = '"+id+"'"

    connection.query(query, (err, data)=>{
        if(!err){
            res.json(data)
        }
    })
})

routes.get('/getDoctors',  (req, res)=>{
    const doctor_id = req.body.d_id
    const hospital_id = req.body.h_id
    const query = "SELECT ddp.doctor_id, ddp.department_id, DOC.hospital_id, Doc.doctor_name FROM doctor_department ddp INNER JOIN (SELECT hd.hospital_id, hd.doctor_id, d.doctor_name FROM hospital_doctor hd INNER JOIN doctors d ON d.id = hd.doctor_id) AS DOC ON ddp.doctor_id = DOC.doctor_id WHERE ddp.doctor_id = '"+doctor_id+"' AND DOC.hospital_id = '"+hospital_id+"'"

    connection.query(query, (err, data)=>{
        if (!err){
            res.json(data)
        }
    })

})


routes.get('/getReport',(req,res)=>{
    const patient_id = req.body.patient_id
    const query = "select "
})



module.exports = routes;