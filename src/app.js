
// Importing the Express framework
const express = require('express');
const {adminAuth,userAuth} = require('./middlewares/auth.js')
const {connectDB} = require('./config/database');
const User = require('./models/user.js');

// Creating an instance/object of an Express application
const app = express();
//middlware to parse the json data coming from the request body to the javascript object
app.use(express.json())



//API to get singel user by email 
app.get("/user",async (req,res)=>{
    const userEmail = req.body.email
    console.log(userEmail)

    
    try {
      const user = await User.find({email:userEmail})
      res.send(user)
      if(!user){
        res.status(404).send("user not found")
      }else{
        res.send(user)
      }
      
    } catch (error) {
      res.status(404).send("something went wrong while fetching data")
    }
})

//FEED API ->  GET /getAllUsers - get all user from the database
app.get("/getAllUsers", async (req,res)=>{
    
  try{
    const users = await User.find({})
    if(users.length === 0){
      res.status(404).send("no user found")
    }else{
      res.send(users)
    }
  }catch(err){
    res.status(400).send("something went wrong while fetching data")
  }



})

//SignUp API 
app.post("/signup",async (req,res)=>{

  //first task is to pass dynamic data to the API using postman
  const userObj = req.body
  // creating a new instance of the model User and passing the userObj as an argument
  const user = new User(userObj)

  try{
    await user.save()

    res.send("user created successfully")
  }
  catch(err){
    res.status(400).send("user creation failed"+err.message)
  }


})

//deleting the user via API -> using findByIdAndDelete
app.delete("/user",async (req,res)=>{
  const userId = req.body.userId
  // console.log(userId)
  try{
    const user = await User.findByIdAndDelete(userId)
    res.send("user deleted successfully")
  }
  catch(err){
    res.status(400).send("Failed to delete user")
  }
})

//API to update user data -> using findByIdAndUpdate
app.patch("/user/:userId", async (req,res)=>{
  // const userId = req.body.userId
  const userId = req.params?.userId
  const data = req.body

  try{

    //Validation at API level , for which fields can be updated
    // 
    const ALLOWED_UPDATES = ["photoUrl", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
  
    if(!isUpdateAllowed){
      throw new Error("Invalid update fields | update only allowed fields are: "+ ALLOWED_UPDATES)
      throw new Error("Invalid update fields | update only allowed fields are: "+ ALLOWED_UPDATES)
    }
// Never trust user data , keep validation everywhere either at API or at DB level
    if (data?.skills?.length>10){
      throw new Error("skills array can have max 10 elements")
    }
    

    const user = await User.findByIdAndUpdate(userId, data, 
      {
         new: true, 
         runValidators:true,
      });  // 'new: false' means return old document
    if(!user){
      res.status(400).send("user not found")
    }
    else{
      res.send("user -> "+ user.firstName +" updated successfully"+"\n before user details: "+user)
    }
    
  }
  catch(err){
    res.status(400).send("Failed to update user | " + err.message)
  }
})

//connecting to the database first then initializing the server
connectDB()
.then(()=>{
  console.log("database connection established successfully") 
  //after establishing database connection, we can start the server using app.listen
  app.listen(7777, () => {
    console.log("✅ Server is running on port 7777 🚀");
  });
}
)
.catch((err)=>{
  console.log("database connection failed",err)
})



