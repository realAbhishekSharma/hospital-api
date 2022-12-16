const express = require("express")
const router = express.Router()

router.get('/fetch-user-details', (req, res)=>{
    res.status(200).json({message:"authorized person doing", user : req.details})
})



module.exports = router