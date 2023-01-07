const express = require ("express")
const router = express.Router()
const postRouter = require("../user/post_routers")
const getRouter = require("../user/user_get_routers")
const putRouter = require ("../user/put_routes")
const {verifyToken, checkUser, authentication, authorization} = require("./commands");

router.post('/login',checkUser, authentication, authorization,(req, res)=>{

})



router.use(postRouter)
router.use(getRouter)
router.use(putRouter)



module.exports = router