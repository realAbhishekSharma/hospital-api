const sqlConnection = require("../../config/database_sql")
const jwt = require("jsonwebtoken");

function checkUser(req, res, next){
    const username = req.body.username
    const query = "SELECT * FROM user where username = '"+username+"'"
    sqlConnection.query(query, (err, data)=>{
        if (!data[0]){
            req.userStatus = false

        }else {
            req.userStatus = true
        }
        next()
    })

}

function authentication(req,res,next){
    const username = req.body.username
    const password = req.body.password

    if (!req.userStatus){
        res.status(400).send("USERNAME_NOT_FOUND")
        return
    }


    const query = "SELECT * FROM user WHERE username ='"+username+"' AND password = '"+password+"'"
    sqlConnection.query(query, (err, data)=>{
        if (data[0]){
            req.user = data[0]
            next()
        }

    })

}

function authorization(req, res, next){

    jwt.sign(req.user, process.env.JWT_SIGNATURE_TOKEN, {expiresIn: 600000}, (err, token)=>{
        res.json({ user:req.user ,Token: token})
    })

}

function verifyToken(req, res, next){
    const token = req.header('authorization')
    if (!token){
        res.status(400).send("TOKEN_NOT_FOUND")
        return
    }

    jwt.verify(token.split(" ")[1], process.env.JWT_SIGNATURE_TOKEN, {expiresIn: 600000}, (err, detail)=>{
        if (!err){
            req.details = detail
            next()
        }else {
            res.status(400).send("SESSION_EXPIRE")
        }
    })
}



module.exports = {checkUser, authentication, authorization,verifyToken}