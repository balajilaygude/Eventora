const express=require("express")
const { registerUser, loginUser, verifyOPT } = require("../Controllers/authController")

const authRoute=express.Router()

authRoute.post("/register",registerUser)
authRoute.post("/login",loginUser)
authRoute.post("/varifyotp",verifyOPT)


module.exports=authRoute