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


routes.get('/enroll-by-patient',(req,res)=>{
    try {
        const patientId = req.body.patient_id
        const query = "SELECT srvcdpr.id as enroll_id, srvcdpr.patient_id, srvcdpr.service_name, srvcdpr.service_id, srvcdpr.department_name,srvcdpr.department_id ,doc.doctor_name, srvcdpr.doctor_id, srvcdpr.enroll_status, srvcdpr.enroll_open_date, srvcdpr.enroll_close_date, srvcdpr.created_date, srvcdpr.modified_date FROM (SELECT ews.id, ews.patient_id, ews.service_name, ews.service_id, d.department_name, ews.department_id, ews.doctor_id, ews.enroll_status, ews.enroll_open_date, ews.enroll_close_date, ews.created_date, ews.modified_date FROM (SELECT sr.id, sr.patient_id,s.service_name,sr.service_id, sr.department_id, sr.doctor_id, sr.enroll_status, sr.enroll_open_date, sr.enroll_close_date, sr.created_date, sr.modified_date  FROM (SELECT * FROM enroll WHERE enroll.patient_id = '" + patientId + "') as sr LEFT JOIN services s on sr.service_id = s.id) as ews LEFT JOIN departments d on ews.department_id = d.id) as srvcdpr LEFT JOIN doctors doc on srvcdpr.doctor_id = doc.id"

        connection.query(query, (err, data) => {
            if (err){
                throw err
                return
            }
            if (data[0] != null){
                console.log("data "+data)
                res.send(data)
            }else {
                res.status(404).send("empty.")
            }

        })
    }catch (e){
        console.log("error "+e.message)
        res.send(e.message)
    }
})


routes.get('/get-reports-by-enroll',(req,res)=>{
    try {
        const enrollId = req.body.enroll_id
        console.log(enrollId)
        const query = "SELECT dewlab.id, dewlab.enroll_id, dewlab.doctor_name, dewlab.refered_doctor_id, dewlab.emp_name, dewlab.test_emp_id, l.lab_name,dewlab.lab_id, dewlab.test_name, dewlab.test_description, dewlab.sample_date, dewlab.test_date, dewlab.created_date, dewlab.modified_date FROM (SELECT rwdoc.id, rwdoc.enroll_id, rwdoc.doctor_name, rwdoc.refered_doctor_id, e.emp_name,rwdoc.test_emp_id, rwdoc.lab_id, rwdoc.test_name, rwdoc.test_description, rwdoc.sample_date, rwdoc.test_date, rwdoc.created_date, rwdoc.modified_date FROM (SELECT rprt.id, rprt.enroll_id, d.doctor_name, rprt.refered_doctor_id, rprt.test_emp_id, rprt.lab_id,rprt.test_name, rprt.test_description, rprt.sample_date, rprt.test_date, rprt.created_date, rprt.modified_date FROM (SELECT * FROM reports r WHERE r.enroll_id = '" + enrollId + "') as rprt LEFT JOIN doctors d on rprt.refered_doctor_id = d.id) as rwdoc LEFT JOIN employees e on rwdoc.test_emp_id = e.id) as dewlab LEFT JOIN labs l on dewlab.lab_id = l.id"

        connection.query(query, (err, data) => {
            if (err){
                throw err
                return
            }
            if (data[0] != null){
                console.log("data "+data)
                res.send(data)
            }else {
                res.status(404).send("empty.")
            }

        })
    }catch (e){
        console.log("error "+e.message)
        res.send(e.message)
    }
})



routes.get('/get-report-by-patient',(req,res)=>{
    try {
        const patientId = req.body.patient_id
        console.log(patientId)
        const query = "SELECT r.id, r.enroll_id, r.refered_doctor_id, r.test_emp_id,r.lab_id, r.test_name, r.test_description, r.sample_date, r.test_date, r.created_date, r.modified_date  FROM reports r LEFT JOIN (SELECT * FROM enroll WHERE enroll.patient_id = '"+patientId+"') as et on et.id = r.enroll_id"

        connection.query(query, (err, data) => {
            if (err){
                throw err
                return
            }
            if (data[0] != null){
                console.log("data "+data)
                res.send(data)
            }else {
                res.status(404).send("empty.")
            }

        })
    }catch (e){
        console.log("error "+e.message)
        res.send(e.message)
    }
})




module.exports = routes;