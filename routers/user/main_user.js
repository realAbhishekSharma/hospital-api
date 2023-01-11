const express = require ("express")
const routes = express.Router()
const postRouters = require("../user/post_routers")
const getRouters = require("../user/user_get_routers")
const updateRouters = require("../user/user_update_routers")
const {verifyToken, checkUser, authentication, authorization} = require("./commands");

routes.post('/login',checkUser, authentication, authorization,(req, res)=>{

})

routes.get("/getOTP", (req, res)=>{
    const randomOTP = (Math.random()*1000000).toFixed(0).toString()
    console.log(randomOTP)
    res.send(randomOTP);
})



routes.use(verifyToken,postRouters)
routes.use(verifyToken,getRouters)
routes.use(verifyToken,updateRouters)



module.exports = routes
