const connection = require('../../config/database_sql')
const jwt = require("jsonwebtoken")

class PatientCommand{

    authenticatePatient(req, res, next){
        if (req.body.nameValuePairs !== undefined){
            req.body = req.body.nameValuePairs
        }
        const query = "SELECT p.patient_id, p.phone, p.password FROM users AS p WHERE p.phone ='"+req.body.UserName+"' AND p.password = '"+req.body.Password+"'"
        // console.log(query)
        connection.query(query, (err, data)=>{
            if (data[0] != null){
                req.patient = data[0]
                next()

            }else{
                req.patient = null
            }
        })
    }



}

function verifyPatient(req, res, next){
    const token = req.header('authorization')
    console.log("token is ", token)
    if (token === undefined)
    {
        res.send("token not found")
    }

    jwt.verify(token.split(" ")[1], process.env.JWT_SIGNATURE_TOKEN, {expiresIn: 600},(error, data)=>{
        if (!error){

            req.patient = data
            console.log(data)
            next()
        }else {
            res.status(403).json({error: "Not_Authorized"})
        }
    })



}

module.exports.Patient = new PatientCommand()
