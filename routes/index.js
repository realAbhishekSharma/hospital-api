const express = require('express');
const app = express()
const router = express.Router();
const bloodDonation = require('../blood-donation/blood-donation-routes')


router.use('/api/blood', bloodDonation)

router.use((req, res)=>{
  res.status(404).send("Url Not Found okay..")
})

module.exports = router;
