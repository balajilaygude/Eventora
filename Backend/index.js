const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const cors=require("cors")
const dbConnect = require("./config/dbConnect")
const authRoute = require("./Routes/auth")
const eventRoute = require("./Routes/event")
const bookingRoute = require("./Routes/booking")

const app=express()
app.use(cors())
app.use(express.json())
const PORT=process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send({
        message:"Connect Jhalo "
    })
})

//Routes 
app.use("/api/auth",authRoute)
app.use("/api/events",eventRoute)
app.use("/api/bookings",bookingRoute)


app.listen(PORT,()=>{
    console.log("Server started on ",PORT)
    dbConnect()
})
