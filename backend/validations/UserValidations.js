const joi = require('joi')

const registerValidations = (userData) =>{
    const schemaValidation = joi.object({
        username:joi.string().required().min(3).max(256),
        email:joi.string().required().email(),
        password:joi.string().required().min(10).max(1024)
    })

    return schemaValidation.validate(userData)
}

const loginValidations = (userData) =>{
    const schemaValidation = joi.object({
        email:joi.string().required().email(),
        password:joi.string().required().min(10).max(1024)
    })

    return schemaValidation.validate(userData)
}

module.exports = {registerValidations,loginValidations}