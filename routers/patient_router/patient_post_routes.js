const express =  require("express")
const routes = express.Router();
const jwt = require("jsonwebtoken")
const {Patient,VerifyToken} = require('./patient_command')
const BloodCommand = require("../../blood-donation/blood-command");

/*routes.post("/login", Patient.authenticatePatient,(req, res)=>{
    jwt.sign(req.patient, process.env.JWT_SIGNATURE_TOKEN, {expiresIn: 600},(err, token)=>{
        res.status(200).json({UserName:req.body.UserName, Password:req.body.Password, Token: token})
    })
})*/

routes.get('/reports',(req, res)=>{
    // res.send({mes: "done", inof: req.patient})
    res.json({"PHONE": req.patient.phone})
})

routes.get('/getReport', async (req, res)=>{
    try{
        await BloodCommand.getDonner( r => {
            res.status(200).json(r[0])
        })
    }catch (e){
        res.status(400).send(e)
    }
})


module.exports = routes;