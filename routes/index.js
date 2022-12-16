const express = require('express');
const router = express.Router();
const bloodDonation = require('../blood-donation/blood-donation-routes')
const patientGetRoutes = require('../routers/patient_router/patient_get_routes')
const patientPostRoutes = require('../routers/patient_router/patient_post_routes')
const patientUpdateRoutes = require('../routers/patient_router/patient_update_routes')
const {Patient,VerifyToken} = require('../routers/patient_router/patient_command')
const users = require("../routes/users")


// router.use('/api/blood', bloodDonation)
router.use('/api', users)

router.use((req, res)=>{
  res.status(404).send("Url Not Found okay..")
})

module.exports = router;
