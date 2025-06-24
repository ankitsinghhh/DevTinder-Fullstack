const validator = require('validator')
const { validate } = require('../models/user')

const validateSignupData = (req)=>{
    const {firstName,lastName,email, password} = req.body

    if(!firstName || !lastName ){
        throw new Error("Name is not valid")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a Strong Password")
    }
}

const validateLoginData = (req) =>{
    const {email} = req.body
    if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }
}

module.exports = {
    validateSignupData,
    validateLoginData,
}