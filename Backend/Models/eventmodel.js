const mongoose =require("mongoose")

const eventSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    categary:{
        type:String,
    },
    totalSeats:{
        type:Number,
        required:true
    },
    availableSeats:{
        type:Number,
    },
    ticketPrice:{
        type:Number,
        required:true
    },
    imageURL:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const eventModel=mongoose.model("Event",eventSchema)

module.exports=eventModel

