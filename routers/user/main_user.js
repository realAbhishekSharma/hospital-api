const express = require ("express")
const router = express.Router()
const postRouter = require("../user/post_routers")
const getRouter = require("../user/user_get_routers")
const {verifyToken, checkUser, authentication, authorization} = require("./commands");

router.post('/login',checkUser, authentication, authorization,(req, res)=>{

})



router.use(verifyToken,postRouter)
router.use(verifyToken,getRouter)



module.exports = router