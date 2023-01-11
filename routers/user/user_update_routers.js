const express = require("express")
const router = express.Router()
const sqlConnection = require("../../config/database_sql")

router.put('/hello', (req, res)=>{
    res.send("hello")
})



module.exports = router
