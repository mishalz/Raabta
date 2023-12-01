const express= require('express')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/User')
const {registerValidations,loginValidations} = require('../validations/UserValidations')

router.post('/register',async(req,res)=>{
    //STEP 1: validating user input
    const {error} = registerValidations(req.body)
    if(error) {
        return res.status(400).send({message: error.details[0].message}) 
    }
    try{
        //STEP 2: check if user already exists
        const userExists = await User.findOne({email:req.body.email})
        if(userExists){
            return res.status(400).send({message:"User already exists."})
        }

        //STEP 3: encrypting the password
        const salt = await bcryptjs.genSalt(5)
        const hashedPassword = await bcryptjs.hash(req.body.password, salt)

        //STEP 4: registring the user
        const user = new User({...req.body, password: hashedPassword})
    
        const savedUser = await user.save()
        res.send(savedUser)
    }
    catch(e){
        res.status(400).send({message:e})
    }
     
})


router.post('/login',async(req,res)=>{
    //STEP 1: validating user input
    const {error} = loginValidations(req.body)
    if(error) {
        return res.status(400).send({message: error.details[0].message}) 
    }
    try{
        //STEP 2: check if user already exists
        const userExists = await User.findOne({email:req.body.email})
        if(!userExists){
            return res.status(400).send({message:"User does not already exist."})
        }
        
        //STEP 3: to check user password
        const passwordIsValid = await bcryptjs.compare(req.body.password,userExists.password)
        if(!passwordIsValid){
            return res.status(400).send({message:"Password is incorrect."})
        }
        
        //STEP 4: generating auth token and sending it back
        const token = jsonwebtoken.sign({_id:userExists._id}, process.env.TOKEN_SECRET)
        res.header('auth-token',token).send({'auth-token': token})

        //STEP 5: redirecting to homepage
    }
    catch(e){
        res.status(400).send({message:e.message})
    }
})

module.exports = router