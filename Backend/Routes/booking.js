const express=require("express")
const { protect, admin } = require("../Middleware/isAuth")
const { bookEvent, getMyBookings, confirmEvent, cancelEvent } = require("../Controllers/bookingController")
// const { bookEvent, sendBookingOTP, getMyBookings, confirmEvent, cancelEvent } = require("../Controllers/bookingController")

const bookingRoute=express.Router()

bookingRoute.post("/",protect,bookEvent)
// bookingRoute.post("/send-otp",protect,sendBookingOTP)
bookingRoute.get("/my",protect,getMyBookings)
bookingRoute.put("/:id/confirm",protect,admin,confirmEvent);
bookingRoute.delete("/:id",protect,cancelEvent);


module.exports=bookingRoute