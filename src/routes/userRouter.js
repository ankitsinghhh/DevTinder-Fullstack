const express = require('express')
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")

const userRouter = express.Router()

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"

// /user/requests/received = get all the pending connection reuqest for the loggedInUser
userRouter.get(
    "/user/requests/received",
    userAuth,
    async (req,res) =>{
        try {

            const loggedInUser = req.user

            const connectionRequests = await ConnectionRequest.find({
                toUserId: loggedInUser._id,
                status: "interested"
            }).populate("fromUserId","firstName lastName photoUrl age gender about skills",) // we can also write like a string where the fields name are separated by space
            // }).populate("fromUserId",["firstName","lastName"],) // we can write like a array consisting of strings 

            res.json({
                message:"Data fetched Successfully",
                data: connectionRequests
            })

            

            
        } catch (error) {
            res.status(400).send("ERROR : ",+error.message)
        }
    }

)

// /user/connections  - > it fetches the list of users who has accepted the connection request from the loggedInUser
userRouter.get(
    "/user/connections",
    userAuth,
    async(req,res) =>{
        try {
            const loggedInUser = req.user

            const connectionRequests = await ConnectionRequest.find({
                $or:[
                    {toUserId:loggedInUser._id, status:"accepted"},
                    {fromUserId:loggedInUser._id, status:"accepted"},
                ]
            }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)

            const data = connectionRequests.map((row)=>{
                if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                    return row.toUserId
                }
                  return  row.fromUserId
                
            })

            res.json({message:"Data fetched Successfully", data:data})

        } catch (error) {
            res.status(400).send("ERROR : "+ error.message)
        }
    }
)

module.exports = userRouter