const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const sqlConnection = require("../../config/database_sql")
const {checkUser, authentication, authorization, verifyToken} = require("./commands");





module.exports = router
