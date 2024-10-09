

//creating a server using express js 

const express = require('express')

const app = express()

// ? -- optional 
// * -- you can write anything in between the previous and next one 
// + -- you can write as many of previous letter
// /a/ --this regex means that if that routee contains letter 'a' it will work 


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





