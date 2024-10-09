

//creating a server using express js 

const express = require('express')

const app = express()

// ? -- optional 
// * -- you can write anything in between the previous and next one 
// + -- you can write as many of previous letter
// /a/ --this regex means that if that routee contains letter 'a' it will work 

// app.use -> it handles any type of request method that is -> post or get or delete or put or patch
// app.get -> it handles only GET requests
//app.post -> it handles only POST requests
//app.delete -> it handles only DELETE requests

app.use("/login",
    (req,res,next) => {
    console.log("handling login route, 1st Response!!!!!!!!!!!!")

    next()
    // res.send("This is login route handler")
    },
    (req,res,next) => {
        console.log("handling login route, 2nd Response!!!!!!!!!!!!")

        // res.send("2nd Response!!!!!!")
        next()
    }
    ,
    (req,res,next) => {
        console.log("handling login route, 3rd Response!!!!!!!!!!!!")

        // res.send("3rd Response!!!!!!")
        next()
    }
    ,
    (req,res,next) => {
        console.log("handling login route, 4th Response!!!!!!!!!!!!")
        res.send("4th Response!!!!!!")
        // next()

    }
)

// we can also wrap all callback functions for route handling in an array , or some of them -> everything will be same , no functionality will change 

//handling get request
app.get('/user/:userId/:name/:pwd',(req,res) =>{
    // console.log(req.query)
    console.log(req.params)
    res.send(
        {firstname:"John",lastname:"doe"}
    )
})

//handling post request
app.post('/user', (req,res) =>{
    //saving data to database
    console.log("saving data to database...")
    res.send("Data saved successfully")
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})

app.use("/",(req,res)=>{
    res.send("welcome to my first server , port used: 3000")
})





