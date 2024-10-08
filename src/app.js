

//creating a server using express js 

const express = require('express')

const app = express()

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})

app.use("/test",(req,res)=>{
    res.send("welcome to my first server , port used: 3000")
})
app.use("/hello",(req,res)=>{
    res.send("Hello hello helloo")
})

app.use("/dash",(req,res)=>{
    res.send("This is dashboard page")
})
app.use("/",(req,res)=>{
    res.send("This is Home page")
})


