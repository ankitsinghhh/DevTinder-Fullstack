const express = require('express')
const {adminAuth,userAuth} = require('../middlewares/auth.js')
const {validateEditProfileData} = require("../utils/validation.js")

const profileRouter = express.Router()

//Profile API to see the logged in User's Profile
profileRouter.get("/profile/view",userAuth,async (req,res)=>{

    try{
        const user = req.user
        res.send(user)
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }




})

//function to udpate the profile of the logged in user
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{

    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit request")
        }
    
        const loggedInUser = req.user
        // console.log(loggedInUser)

        //you can do explicity for all of them like this but use loop 
        // loggedInUser.firstName = req.body?.firstName;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
        // console.log(loggedInUser)

        await loggedInUser.save()

        //apart from this below method , you can also use res.json()
        // res.send(loggedInUser.firstName + " your profile updated successfully")

        // giving resposne using res.json() -> much better way to send the response
        res.json({
            "message": `${loggedInUser.firstName} , your profile updated successfully`,
            data : loggedInUser
        })
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }

})

module.exports = profileRouter