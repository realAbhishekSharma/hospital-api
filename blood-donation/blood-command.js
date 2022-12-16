const connection = require('../config/database_sql')
const {validateName,validateNull, validatePhone} = require('../validator/validator')
const {add} = require("nodemon/lib/rules");
const {raw} = require("mysql");

class SqlCommand{
    addDonner(donerDetails, callback){
        try{
            validateName(donerDetails.DONER_NAME)
            validatePhone(donerDetails.PHONE)
            validateNull(donerDetails.EMAIL)
            validateNull(donerDetails.DISTRICT)
            validateNull(donerDetails.ZONE)
            validateNull(donerDetails.PIN)
            validateNull(donerDetails.BLOOD_GROUP)

            this.checkExistingUser(donerDetails.PHONE, result => {

                if (!result) {
                    const addQuery = "INSERT INTO BLOOD_DONER(`doner_name`, `email`, `phone`, `district`, `zone`, `doner_status`, `weight`, `blood_group`, `pin`) VALUES('" + donerDetails.DONER_NAME + "', '" + donerDetails.EMAIL + "', '" + donerDetails.PHONE + "', '" + donerDetails.DISTRICT + "', '" + donerDetails.ZONE + "', " + donerDetails.DONER_STATUS + ", " + donerDetails.WEIGHT + ", '" + donerDetails.BLOOD_GROUP + "', '" + donerDetails.PIN + "')"
                    connection.query(addQuery, (error, result) => {
                        console.log(error)

                    })
                }
                callback(result)
            })
        }catch (e) {
            if (e.code === "INVALID_NUMBER" || e.code === "NOT_A_PHONE_NUMBER") {
                throw "Please check your phone number."
            }
            if (e.code === "NOT_VALID_NAME" || e.code === "NAME_TOO_LONG" || e.code === "NAME_TOO_LONG") {
                throw "Please enter valid name."
            }
        }

    }


    getDonner(callback){
        const checkQuery = "SELECT * FROM BLOOD_DONER"
        const resul = connection.query(checkQuery, (err,result)=>{
            if (result){
                callback(result)
            }else {
                callback(false)
            }

        })
    }


    async updateDonnerStatus(detail, callback) {

        try {
            await this.checkDonnerActiveStatus(detail, statusResult => {
                if (statusResult === "false") {
                    console.log("User not found.")
                    return
                }

                var updateQuery
                if (statusResult) {
                    updateQuery = "UPDATE blood_doner  SET `DONER_STATUS` = FALSE WHERE `PHONE`= '" + detail + "'"
                } else {
                    updateQuery = "UPDATE blood_doner  SET `DONER_STATUS` = TRUE WHERE `PHONE`= '" + detail + "'"
                }
                connection.query(updateQuery, (err, result)=>{
                    callback(result, statusResult)
                })

            })


        } catch (e) {
            if (e.code === "INVALID_NUMBER" || e.code === "NOT_A_PHONE_NUMBER") {
                throw "Invalid phone number."
            }
        }
    }


    async updateDonateDate(detail, callback){
        try {
            validatePhone(detail)

            const updateQuery = "UPDATE blood_doner  SET `LAST_DONATE` = CURRENT_TIMESTAMP  WHERE `PHONE`= '" + detail + "'"

            connection.query(updateQuery, (err, result)=>{
                callback(result)
            })


        } catch (e) {
            if (e.code === "INVALID_NUMBER" || e.code === "NOT_A_PHONE_NUMBER") {
                throw "Invalid phone number."
            }
        }

    }


    checkExistingUser(detail, callback){
        const checkQuery = "SELECT DONER_NAME,PHONE FROM BLOOD_DONER WHERE PHONE ='"+detail+"'"
        const resul = connection.query(checkQuery, (err,result)=>{
            if (result[0]){
                callback(result[0].DONER_NAME)
            }else {
                callback(false)
            }

        })
    }


    checkDonnerActiveStatus(detail, callback){
        try {
            const checkQuery = "SELECT DONER_NAME, DONER_STATUS FROM BLOOD_DONER WHERE PHONE ='"+detail+"'"
            validatePhone(detail)
            connection.query(checkQuery, (err,result)=>{
                if (result[0]){
                    console.log("name is "+result[0].DONER_NAME)
                    console.log("status is "+result[0].DONER_STATUS)
                    callback(result[0].DONER_STATUS)
                }else {
                    callback("false")
                }
            })
        }catch (e){
            throw e
        }

    }

    getHospital(callback){
        const checkQuery = "SELECT * FROM hospital"
        const resul = connection.query(checkQuery, (err,result)=>{
            if (result){
                callback(result)
            }else {
                callback(false)
            }

        })
    }
}

module.exports = new SqlCommand()
