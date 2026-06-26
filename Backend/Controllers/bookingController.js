const bookingModel=require("../Models/bookingmodel")
const eventModel = require("../Models/eventmodel")
const otpModel = require("../Models/opt")
const { sendBookingEmail, sendOtpEmail } = require("../Utils/email")

const generateOtp=()=>{
    return Math.floor(100000 +Math.random()*900000).toString();
}

async function sendBookingOTP(req,res) {
    const otp=generateOtp()
    await otpModel.findOneAndDelete({email:req.user.email,action:"event_booking"});
    await otpModel.create({email:req.user.email,otp: otp,action:"event_booking"})
    await sendOtpEmail(req.user.email,otp,"event_booking")
    return res.json({message:"Otp sent To email"})
}

async function bookEvent(req,res) {
    const {eventId,otp}=req.body;
    console.log(req.body)
    const otpRecord=await otpModel.findOne({email:req.user.email,otp,action:"event_booking"});
    if(!otpRecord){
        return res.status(404).json({message:"Invalid or Expired otp "})
    }
    console.log(otpRecord)
    const event=await eventModel.findById(eventId);
    if(!event){
        return res.status(404).json({error:"event not found"})
    }
    console.log(event)
    if(event.totalSeats <=0){
        return res.status(409).json({error:"No seat available "})
    }
    console.log("next to event")
    console.log("userid",req.user._id,"event id",eventId)
    const existingBooking=await bookingModel.findOne({userId:req.user._id,eventId:eventId});
    console.log(existingBooking)
    if(existingBooking){
        console.log("inside exitbook")
        return res.status(409).json({error:"You have ready booked this Event"})
    }
    console.log("exiting",existingBooking)
    const booking=await bookingModel.create({
        userId:req.user._id,
        eventId,
        status:"pending",
        paymentStatus:"non_paid",
        amount:event.ticketPrice
    });
    console.log("booking",booking)
    await otpModel.deleteMany({email:req.user.email,action:"event_booking"});
    res.status(201).json({message:"booking created please check you email "})
}

async function getMyBookings(req,res) {
    if (req.user.role === "admin") {
        // Admin gets all bookings
        bookings = await bookingModel.find().populate("eventId userId");
    } else {
        // User gets only their bookings
        bookings = await bookingModel
            .find({ userId: req.user._id })
            .populate("eventId");
    }
    return res.json(bookings)
}

async function confirmEvent(req,res) {
    console.log(req.params.id ," Id \n ",req.body.paymentStatus)
    const paymentStatus=req.body.paymentStatus;
    if(!["paid","non_paid"].includes(paymentStatus)){
        return res.status(400).json({error:"Invalid Payment status"})
    }
    console.log("here")
    const booking= await bookingModel.findById(req.params.id).populate("eventId");
    if(!booking){
        return res.status(400).json({error:"Booking not found"})
    }
    console.log(booking)
    if(booking.status==="confimed"){
        return res.status(400).json({error:"Booking is already confiremed"})
    }
    const event=await eventModel.findById(booking.eventId._id)
    if(event.totalSeats<=0){
        return res.status(400).json({error:"No seats available"})
    }
    console.log(event)
    booking.status="confimed";
    if(paymentStatus){
        booking.paymentStatus=paymentStatus;
    }
    await booking.save()
    event.totalSeats-=1;
    await event.save()
    await sendBookingEmail(req.user.email,event.title,booking._id)
    res.json({message:"Booking confirmend"})
}

async function cancelEvent(req,res) {
    const {id}=req.params
    const booking =await bookingModel.findById(id).populate("eventId")
    if(!booking){
        return res.status(400).json({error:"Booking not found"})
    }
    if(booking.userId.toString()!== req.user._id.toString() && req.user.role !="admin"){
        console.log("bye")
        return res.status(400).json({message:"Unauthorized"})
    }

    if(booking.status=="confimed"){
        const event=await eventModel.findById(booking.eventId._id)
        event.totalSeats+=1;
        await event.save()
    }
        booking.status="cancelled";
    await booking.save()
    res.json({message:"Booking cancelled"})
}

module.exports={getMyBookings,bookEvent,confirmEvent,cancelEvent,sendBookingOTP}