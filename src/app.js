

//creating a server using express js 

const express = require('express')

const app = express()

// ? -- optional 
// * -- you can write anything in between the previous and next one 
// + -- you can write as many of previous letter
// /a/ --this regex means that if that routee contains letter 'a' it will work 

//handling get request
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
//app.post -> it handles only POST requests
//app.delete -> it handles only DELETE requests

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

const {adminAuth,userAuth} = require("./middlewares/auth") // middlwares imported from middlware file
app.use("/admin",adminAuth)
// app.use("/user",userAuth) // to check auth in all routes of /user/<routename>

app.get(
    "/admin/getAllData",
    (req,res,next) =>{
        
        //LOGIC OF FETCHING ALL DATA
        
        res.send("all data sent")
    }
)

app.get(
    "/admin/deleteUser/:id",
    (req,res,next) =>{
        //LOGIC OF FETCHING ALL DATA
        
        res.send(`User with id ${req.params.id} deleted`)
        
     
    }
)

app.get("/user",(req,res,next)=>{

    console.log(req.query)
    res.send("user route is called")
})

app.get("/user/login", (req,res,next) =>{

    res.send("User logged in successfully")
})

app.get("/user/data", userAuth,(req,res,next) =>{ // to check in this route

    res.send("User data fetched successfully")
})

app.get


app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})

// app.use("/",(req,res)=>{
//     res.send("welcome to my first server , port used: 3000")
// })







