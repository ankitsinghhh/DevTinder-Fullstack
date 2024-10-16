const express = require('express');
const { connectDB } = require('./config/database');
const User = require('./models/user');  // Import the model correctly

const app = express();



// Middleware to parse JSON data
app.use(express.json()); // it will convert the json to javascript object -> this middleware will work for all the routes


connectDB()
    .then(() => {
        console.log("Database connection established");
        app.listen(3000, () => {
            console.log("Server is successfully listening on port 3000");
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

app.get("/", (req, res) => {
    res.send("Handling root route");
});

app.post("/signup", async (req, res) => {
    console.log("signup route called");

    // const userObj = {
    //     "firstName": "Raeyan",
    //     "lastName": "Riley",
    //     "email": "raegann@gmail.com",
    //     "password": "12345678",
    //     "age": 35,
    //     "gender": "female",
      
    // }

    console.log(req)
    console.log(req.body)

    const userObj = req.body



    const user = new User(userObj);

   try{
    await user.save();
    res.send("user added successfully")
   }
   catch(err){
    res.status(400).send("error saving the user" + err.message)
   }

});

// GET user by email
app.get("/user", async (req,res) =>{
    const userEmail = req.body.email
    // const age = req.body.age
    try{
        const user = await User.find({email: userEmail}) // to fetch users using email ID
        // const user = await User.find({age: age}) // to fetch users of same age 
        // const user = await User.find({}) // to fetch all the users
        console.log(user)

        if(user.length === 0 ){
            res.status(404).send("No user found with that email")
   
        }else{
            res.send(user)
        }


    }
    catch(err){
        res.status(400).send("error fetching the user" + err.message)
    }
})
// FEED API -> GET /getAllUsers - > get all users from database
app.get("/getAllUsers", async (req,res) => {
    console.log("getAllUsers route called");
    try{
        const users = await User.find({}) // to fetch all the users
        res.send(users)
    }
    catch(err){
        res.status(400).send("error fetching the users" + err.message)
    }
})

//Delete data of the user
app.delete("/user", async (req,res) => {
    const userId = req.body.userId

    try {
        const user = await User.findByIdAndDelete(userId);

        if(!user){
            res.status(404).send(`user does not exist with this given id - ${userId}`)
        }else{
            res.send(user)
        }
      
    } catch (error) {
        res.status(400).send("something went wrong"+ error.message)
    }
})

app.get("/random", (req,res)=>{
    const randomNum = Math.floor(Math.random() * 100) + 1;
    res.send(`Random number is: ${randomNum}`);
})

app.patch("/patch", async (req,res) => {
    console.log("patch /user called");
    const userId = req.body.userId;
    const updatedInfo = req.body.data;
    // const updatedInfo = {
    //     "firstName": "Raeyan ",
    //     "lastName": "Riley",
    //     "email": "ramaya@gmail.com",
    //     "password": "12345678",
    //     "age": 35,
    //     "gender": "female",
    // }
    console.log(updatedInfo);

    try {
        // Add { new: true } to return the updated document
        const user = await User.findByIdAndUpdate(userId, updatedInfo, { new: true, runValidators: true });
        console.log("i am here in try");

        if (!user) {
            res.status(404).send(`user does not exist with this given id - ${userId}`);
        } else {
            console.log("i am here in TRY - else");
            res.status(201).json({
                status:"sucess",
                data: user
            })
        }
    } catch (err) {
        res.status(400).send("error updating the user: " + err.message);
    }
});



















// ! NOTES --- > 

// ? -- optional 
// * -- you can write anything in between the previous and next one 
// + -- you can write as many of previous letter
// /a/ --this regex means that if that routee contains letter 'a' it will work 

// handling get request
// app.get('/user/:userId/:name/:pwd',(req,res) =>{
//     console.log(req.query)
//     console.log(req.params)
//     res.send(
//         {firstname:"John",lastname:"doe"}
//     )
// })

// //handling post request
// app.post('/user', (req,res) =>{
//     //saving data to database
//     console.log("saving data to database...")
//     res.send("Data saved successfully")
// })

// app.use -> it handles any type of request method that is -> post or get or delete or put or patch
// app.get -> it handles only GET requests
// app.post -> it handles only POST requests
// app.delete -> it handles only DELETE requests

// GET /users => it checks all the app.xxx("matching server ") functions 
// get /users => middleware chain => request handler -> ( )



// we can also wrap all callback functions for route handling in an array , or some of them -> everything will be same , no functionality will change
// app.use("/login",
//     (req,res,next) => {
//     console.log("handling login route, 1st Response!!!!!!!!!!!!")

//     next()
//     // res.send("This is login route handler")
//     },
//     (req,res,next) => {
//         console.log("handling login route, 2nd Response!!!!!!!!!!!!")

//         // res.send("2nd Response!!!!!!")
//         next()
//     }
//     ,
//     (req,res,next) => {
//         console.log("handling login route, 3rd Response!!!!!!!!!!!!")

//         // res.send("3rd Response!!!!!!")
//         next()
//     }
//     ,
//     (req,res,next) => {
//         console.log("handling login route, 4th Response!!!!!!!!!!!!")
//         res.send("4th Response!!!!!!")
//         // next()

//     }
// )

// difference between app.use and app.all - https://stackoverflow.com/questions/47480386/difference-between-app-all-vs-app-usefunction

 
// * Writing Middlwares
// ? -------- for handling authentication for all request GET, POST, 
// app.use("/admin", (req,res,next)=>{

//      //Logic of checking if request is authorised
//     const token = "xyz"
//     const isAdminAuthorized = token === "xyz"

//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized Access")
//     }
//     else{
//         console.log("admin authorized")
//         next()
//     }
// })

// const {adminAuth,userAuth} = require("./middlewares/auth") // middlwares imported from middlware file
// app.use("/admin",adminAuth)
// // app.use("/user",userAuth) // to check auth in all routes of /user/<routename>

// app.get(
//     "/admin/getAllData",
//     (req,res,next) =>{
        
//         //LOGIC OF FETCHING ALL DATA
        
//         res.send("all data sent")
//     }
// )

// app.get(
//     "/admin/deleteUser/:id",
//     (req,res,next) =>{
//         //LOGIC OF FETCHING ALL DATA
        
//         res.send(`User with id ${req.params.id} deleted`)
        
     
//     }
// )

// app.get("/user",(req,res,next)=>{

//     console.log(req.query)
//     res.send("user route is called")
// })

// app.get("/user/login", (req,res,next) =>{

//     res.send("User logged in successfully")
// })

// app.get("/user/data", userAuth,(req,res,next) =>{ // to check in this route

//     res.send("User data fetched successfully")
// })

// app.get("/getUserData", (req,res)=>{

//    try{
//     //logic of fetching user data from database
//     throw new Error("rnadomdsljfl;dsfj;ladfj;sdfj")
//     res.send("user data sent successfully!!!!!!!!!")
//    }
//    catch(err){
//     res.status(500).send("something went wrong while fetching data")
//    }
// })

// app.use("/", (err,req,res,next)=>{
//     //error handling for all routes where error is unhandled by them internally
//     if(err){
//         res.status(500).send("something went Wrong")
//     }

// })


// app.use("/",(req,res)=>{
//     res.send("welcome to my first server , port used: 3000")
// })







