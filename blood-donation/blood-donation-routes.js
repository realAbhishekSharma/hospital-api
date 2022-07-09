const express = require('express')
const router = express.Router()
const BloodCommand = require('../blood-donation/blood-command')

router.post('/addDonner', async (req, res)=>{
    try{
        await BloodCommand.addDonner(req.body, result => {
            if (result) {
                res.status(409).send("User Already Exist With name "+result)
            } else {
                res.status(201).send("user added successfully.")
            }
        })
    }catch (e){
        res.status(400).send(e)
    }
})


router.get('/getDonner', async (req, res)=>{
    try{
        await BloodCommand.getDonner( r => {
            res.status(200).json(r)
        })
    }catch (e){
        res.status(400).send(e)
    }
})


router.put('/donnerStatus',async (req,res)=>{
    try {
        await BloodCommand.updateDonnerStatus(req.body.PHONE, (result, status)=>{
            if (result){
                res.status(202).send("Active status set "+!status+" successfully.")
            }
        })
    }catch (e){
        res.status(400).send(e)
    }

})


router.put('/updateDonateDate',async (req,res)=>{
    try {
        await BloodCommand.updateDonateDate(req.body.PHONE, (result)=>{
            if (result){
                res.status(202).send("Donate Date set successfully.")
            }
        })
    }catch (e){
        res.status(400).send(e)
    }

})

module.exports = router