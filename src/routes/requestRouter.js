const express = require('express')
const {adminAuth,userAuth} = require('../middlewares/auth.js')

const requestRouter = express.Router()

//Dummy API to see the connection request sent by the logged in user
requestRouter.post("/sendConnectionRequest", userAuth,async  (req,res)=>{
    const user = req.user
    //sending connection request to the user
    res.send(user.firstName + " is sending connection request")
  })

module.exports = requestRouter