const express=require("express")
const connection = require("./src/config/db")
const { AuthRouter } = require("./src/Routes/Auth.route")
const cors =require("cors")
require("dotenv").config()
const app=express()
const Port=process.env.PORT
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("yes")
})

app.use(cors())
app.use("/auth",AuthRouter)

app.listen(Port,async ()=>{
    await connection
    console.log(`server started At http://localhost:${Port}`)
    console.log(" Connected To DataBase")

 
})