const express = require('express');
const router = express.Router()
const postHAdmin = require('./post_routes')

 router.use(postHAdmin)


 module.exports = router