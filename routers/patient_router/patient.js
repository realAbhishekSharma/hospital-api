const express = require("express")
const {Patient} = require("./patient_command");
const {verifyToken,authentication} = require("../user/commands");
const jwt = require("jsonwebtoken");
const patientUpdateRoutes = require("./patient_update_routes");
const patientPostRoutes = require("./patient_post_routes");
const patientGetRoutes = require("./patient_get_routes");
const router = express.Router()


router.use(verifyToken)

router.use(patientUpdateRoutes, patientPostRoutes, patientGetRoutes)




module.exports = router