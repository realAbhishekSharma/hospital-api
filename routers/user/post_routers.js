const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const sqlConnection = require("../../config/database_sql")
const {checkUser, authentication, authorization, verifyToken, getCurrentDateTime} = require("./commands");
const {DATE, DATETIME} = require("mysql/lib/protocol/constants/types");


router.post("/patient-admit-opd", async (req,res)=>{
    try {
        const userId = req.details.id
        const title = req.body.title
        const description = req.body.description
        const hospitalId = req.body.hospital_id
        const serviceId = req.body.service_id
        const departmentId = req.body.department_id
        const doctorId = req.body.doctor_id
        const admitDate = getCurrentDateTime()
        const modifiedDate = getCurrentDateTime()


        const startTransaction = "START TRANSACTION"
        const insertInToPatient = `INSERT INTO patient (title, description, user_id, hospital_id, admit_date, modified_date) VALUES( "${title}", "${description}", ${userId}, ${hospitalId}, '${admitDate}', '${modifiedDate}')`
        const insertInToEnroll = `INSERT INTO enroll ( patient_id, service_id, department_id, doctor_id, enroll_status, enroll_open_date, modified_date) VALUES(LAST_INSERT_ID(), ${serviceId}, ${departmentId}, ${doctorId}, 1, '${admitDate}', '${modifiedDate}')`
        const endTransaction = "COMMIT"

        const c = await sqlConnection.promise().query(startTransaction).then((res) => {
            return sqlConnection.promise().query(insertInToPatient)
        }).then((res) => {
            return sqlConnection.promise().query(insertInToEnroll)
        }).then((res) => {
            return sqlConnection.promise().query(endTransaction)
        }).then(() => {
            res.status(200).send({status : true, message: "admitted successfully"})
        })

    }catch (e){
        console.log(e.message)
        res.status(500).json({status : false,error: e.message})
    }
})



module.exports = router
