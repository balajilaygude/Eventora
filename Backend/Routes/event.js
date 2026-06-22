const express=require("express")
const { protect, admin } = require("../Middleware/isAuth")
const { getEventById, getAllEvent, createEvent, updateEvent, deleteEvent } = require("../Controllers/eventController")

const eventRoute=express.Router()

eventRoute.get("/",getAllEvent)
eventRoute.get("/:id",getEventById)
eventRoute.post("/",protect,admin,createEvent)
eventRoute.patch("/:id",protect,admin,updateEvent)
eventRoute.delete("/:id",protect,admin,deleteEvent)


module.exports=eventRoute