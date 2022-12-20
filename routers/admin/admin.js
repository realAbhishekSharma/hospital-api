const express = require('express');
const router = express.Router()
const adminUpdateRouter = require('./update_routes')
const adminPosttRouter = require('./post_routes')
const adminDeleteRouter = require('./delete_routes')

router.use(adminUpdateRouter, adminPosttRouter, adminDeleteRouter)

module.exports = router
