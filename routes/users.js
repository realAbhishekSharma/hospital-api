var express = require('express');
var router = express.Router();
const patient = require("../routers/patient_router/patient")
const nonUser = require("../routers/non-user/non-user")
const mainUser = require("../routers/user/main_user")
const admin = require("../routers/admin/admin")


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.use("/non-user", nonUser)
router.use('/patient', patient)
router.use("/main-user" , mainUser)
router.use('/admin', admin)
// router.use('/api/hospital', hospital);

module.exports = router;
