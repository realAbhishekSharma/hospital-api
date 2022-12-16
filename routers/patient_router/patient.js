const express = require("express")
const {Patient, VerifyToken} = require("./patient_command");
const jwt = require("jsonwebtoken");
const patientUpdateRoutes = require("./patient_update_routes");
const patientPostRoutes = require("./patient_post_routes");
const patientGetRoutes = require("./patient_get_routes");
const routes = express.Router()

routes.post("/login", Patient.authenticatePatient,(req, res)=>{
    jwt.sign(req.patient, process.env.JWT_SIGNATURE_TOKEN, {expiresIn: 600},(err, token)=>{
        res.status(200).json({UserName:req.body.UserName, Password:req.body.Password, Token: token})
    })
})
routes.use(VerifyToken)

routes.use(patientUpdateRoutes, patientPostRoutes, patientGetRoutes)




module.exports = routes