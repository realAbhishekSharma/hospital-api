const {ignoreRoot} = require("nodemon/lib/config/defaults");
const validatePhone = (phone)=>{
    try {
        phone = phone.trim()
        if (phone.length !== 10) {
            const error = new Error("Phone Number is not valid.")
            error.code = ("INVALID_NUMBER")
            throw error
        }
        for (var i = 0; i < phone.length; i++) {
            if (isNaN(parseInt(phone[i]))) {
                const error = new Error("Provided number is not a phone number.")
                error.code = "NOT_A_PHONE_NUMBER"
                throw error
            }
        }
    }catch (e){
        throw e
    }
}

const validateName = (name)=> {

    try {
        if (name.length > 50) {
            const error = new Error("Name is too long.")
            error.code = "NAME_TOO_LONG"
            throw error
        } else if (name.length < 5) {
            const error = new Error("Name is too short.")
            error.code = "NAME_TOO_SHORT"
            throw error
        }

        name = name.split(" ")
        if (name[3] == null && name[2] == null && name[1] == null) {
            const error = new Error("Provided name is not valid.")
            error.code = "NOT_VALID_NAME"
            throw error
        } else {
            return true
        }
    }catch (e){
        throw e
    }
}
const validateNull = (value)=>{
    value = value.trim()
    if (value == null){
        const error = new Error("Value can not be null")
        error.code = "NULL_VALUE_PROVIDED"
        throw error
    }
}


module.exports = {validateName,validatePhone, validateNull}