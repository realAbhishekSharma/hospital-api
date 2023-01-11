const express =  require("express")
const routes = express.Router();
const jwt = require("jsonwebtoken")
const {Patient,VerifyToken} = require('./patient_command')
const sqlConnection = require("../../config/database_sql")
const BloodCommand = require("../../blood-donation/blood-command");
const {getCurrentDateTime} = require("../user/commands");

/*routes.post("/login", Patient.authenticatePatient,(req, res)=>{
    jwt.sign(req.patient, process.env.JWT_SIGNATURE_TOKEN, {expiresIn: 600},(err, token)=>{
        res.status(200).json({UserName:req.body.UserName, Password:req.body.Password, Token: token})
    })
})*/

routes.post('/enroll-department', (req, res)=>{
    try {

        const patientId = req.body.patient_id
        const serviceId = req.body.service_id
        const departmentId = req.body.department_id
        const doctorId = req.body.doctor_id
        const enrollStatus = req.body.enroll_status
        const enrollOpenDate = getCurrentDateTime()
        const modifiedDate = getCurrentDateTime()

        const query = "INSERT INTO enroll (patient_id, service_id, department_id, doctor_id, enroll_status, enroll_open_date, modified_date) VALUES('" + patientId + "', '" + serviceId + "', '" + departmentId + "', '" + doctorId + "', 1, '" + enrollOpenDate + "', '" + modifiedDate + "')"
        sqlConnection.query(query, (err, data) => {
            if (err) {
                throw err
                return
            }
            res.status(200).send({status: true, message: "enrolled to " + departmentId + " successfully"})
        })
    }catch (e){
        console.log(e.message)
        res.status(500).send({status: false, message: e.message})
    }
})

module.exports = routes;