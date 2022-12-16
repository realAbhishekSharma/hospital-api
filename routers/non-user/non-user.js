const express = require("express")
const BloodCommand = require("../../blood-donation/blood-command");
const {checkUser} = require("../user/commands")
const sqlConnection = require("../../config/database_sql")

const router = express.Router()

router.get("/getDonner", async (req, res)=>{

    try{
        await BloodCommand.getDonner( r => {
            res.status(200).json(r)
        })
    }catch (e){
        res.status(400).send(e)
    }
})

router.post("/sign-up", checkUser, (req, res)=>{

    const username = req.body.username
    const name = req.body.name
    const email = req.body.email
    const gender = req.body.gender
    const district = req.body.district
    const zone = req.body.zone
    const age = req.body.age
    const password = req.body.password

    if (req.userStatus){
        res.status(400).send("USER_ALREADY_EXIST")
        return
    }

    try {
        const query = "INSERT INTO user (username, name, email, gender, district, zone, age, password) VALUES('"+username+"', '"+name+"', '"+email+"', '"+gender+"', '"+district+"', '"+zone+"', "+age+", '"+password+"')"
        sqlConnection.query(query, (err, result)=>{
            if (!err){
                res.status(201).json({"message": "user Created Successfully", "user": req.body})
                return
            }
            res.send("cannot created")
        })
    }catch (e){
        res.status(403).send(e)
    }

})

router.get("/getHospitals", async (req, res)=>{

    try{
        await BloodCommand.getHospital( r => {
            res.status(200).json(r)
        })
    }catch (e){
        res.status(400).send(e)
    }
})


module.exports = router