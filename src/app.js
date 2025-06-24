// Importing the Express framework
const express = require('express');
const bcrypt = require('bcrypt')
const {adminAuth,userAuth} = require('./middlewares/auth.js')
const {connectDB} = require('./config/database');
const User = require('./models/user.js');
const {validateSignupData, validateLoginData} = require('./utils/validation.js')

// Creating an instance/object of an Express application
const app = express();
//middlware to parse the json data coming from the request body to the javascript object
app.use(express.json())

//API to login
app.post("/login",async ( req,res)=>{
  try{
      //extracting the email and password from the request body
      const { email, password} = req.body
      //Validating if Email entered is valid or not 
      validateLoginData(req)
      //check if user is present in db or not 
      const user = await User.findOne({email:email})
      //now interpreting the response , if user not present , then throw error
      if(!user){
        throw new Error("Invalid Credentails")
      }
      //checking if the password is valid or not using bcrypt.compare
      const isPasswordValid = await bcrypt.compare(password,user.password)
      if(isPasswordValid){
        res.send("Login Successfull")
      }else{
        throw new Error("Password is not correct")
      }


  }
  catch(err){
    res.status(400).send("ERROR : " + err.message)
  }
})

//API to get single user by email 
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

  try{
     // while someone signs up , first validation of data should be there 
    validateSignupData(req)

  //Then Encrypting the Password
  // ! install bcrypt using npm i bcrypt

  const {firstName, lastName, email,password} = req.body
  const passwordHash = await bcrypt.hash(password,10)
  console.log(passwordHash + " -> this is the hashed password ")

  //first task is to pass dynamic data to the API using postman
  // this is not a good way to create userObj
    // const userObj = req.body
    // const user = new User(userObj)
    //instead do this -> you should mention all the fields explicitly
    const user = new User({
      firstName, 
      lastName,
      email,
      password:passwordHash,
    })

    await user.save()

    res.send("user created successfully")
  }
  catch(err){
    res.status(400).send("ERROR : "+err.message)
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



