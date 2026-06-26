const eventModel = require("../Models/eventmodel");

async function getAllEvent(req, res) {
  const filters = {};
  console.log(req.query.search);
  try {
    if (req.query.search) {
      filters.title = {
        $regex: req.query.search,
        $options: "i",
      };
    }
    console.log(filters)
    const eventSet = await eventModel.find(filters);
    return res.json(eventSet);
  } catch (error) {
    res.status(400).json({ error: error.messege });
  }
}

async function getEventById(req, res) {
  const { id } = req.params;
  try {
    const eventSet = await eventModel.findById(id);
    if (!eventSet) {
      return res.status(400).json({ messege: "Event not Found" });
    }
    res.json(eventSet);
  } catch (error) {
    res.status(400).json({ error: error.messege });
  }
}

async function createEvent(req, res) {
  console.log("hi create",req.body)
  const {
    title,
    description,
    date,
    location,
    categary,
    totalSeats,
    availableSeats,
    ticketPrice,
    imageURL,
  } = req.body;
  try {
    const eventNew = await eventModel.create({
      title,
      description,
      date,
      location,
      categary,
      totalSeats,
      availableSeats,
      ticketPrice,
      imageURL,
      createdBy:req.user._id
    });
    console.log(eventNew)
    res.status(200).json({message:"Done Event Created"});
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.messege });
  }
}

async function updateEvent(req,res) {
      const {
    title,
    description,
    date,
    location,
    categary,
    totalSeats,
    availableSeats,
    ticketPrice,
    imageURL,
  } = req.body;
  const {id}=req.params.id
  try {
    const eventUpdate= await eventModel.findByIdAndUpdate(id,{title,
    description,
    date,
    location,
    categary,
    totalSeats,
    availableSeats,
    ticketPrice,
    imageURL},{new:true});
    if(!eventUpdate){
        return res.status(400).json({messege:"Event not Found"})
    }
    res.json(eventUpdate)
  } catch (error) {
    res.status(400).json({ error: error.messege });
  }
}

async function deleteEvent(req,res) {
    const {id}=req.params
    try {
        const eventdel=await eventModel.findByIdAndDelete(id)
        if(!eventdel){
            return res.status(400).json({messege:"Event not found"})
        }
        res.json({messege:"Event Deleted Successfully"})
    } catch (error) {
        res.status(400).json({ error: error.messege });
    }
}

module.exports={getAllEvent,getEventById,createEvent,updateEvent,deleteEvent}


