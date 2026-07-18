const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const User = require("./models/user");
const Event = require("./models/eventmodel");
const Booking = require("./models/bookingmodel");

dotenv.config();

const users = [
  {
    name: "Super Admin",
    email: "admin1@eventora.com",
    password: "password123",
    role: "admin",
    isVerify: true,
  },
  {
    name: "Event Admin",
    email: "admin2@eventora.com",
    password: "password123",
    role: "admin",
    isVerify: true,
  },
  {
    name: "John Doe",
    email: "john@eventora.com",
    password: "password123",
    role: "user",
    isVerify: true,
  },
  {
    name: "Alice Smith",
    email: "alice@eventora.com",
    password: "password123",
    role: "user",
    isVerify: false,
  },
  {
    name: "Bob Johnson",
    email: "bob@eventora.com",
    password: "password123",
    role: "user",
    isVerify: false,
  },
];

const events = [
  {
    title: "React Conference 2026",
    description: "Learn advanced React, Redux and Next.js.",
    date: new Date(Date.now() + 5 * 86400000),
    location: "Bangalore",
    categary: "Technology",
    totalSeats: 150,
    ticketPrice: 499,
    imageURL:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Node.js Backend Bootcamp",
    description: "Master Express, MongoDB and REST APIs.",
    date: new Date(Date.now() + 10 * 86400000),
    location: "Hyderabad",
    categary: "Technology",
    totalSeats: 120,
    ticketPrice: 699,
    imageURL:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Startup Meetup",
    description: "Meet founders and investors.",
    date: new Date(Date.now() + 15 * 86400000),
    location: "Mumbai",
    categary: "Business",
    totalSeats: 200,
    ticketPrice: 299,
    imageURL:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Music Festival",
    description: "Enjoy live performances by top artists.",
    date: new Date(Date.now() + 20 * 86400000),
    location: "Delhi",
    categary: "Music",
    totalSeats: 500,
    ticketPrice: 999,
    imageURL:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "AI & ML Summit",
    description: "Explore the future of Artificial Intelligence.",
    date: new Date(Date.now() + 25 * 86400000),
    location: "Pune",
    categary: "Technology",
    totalSeats: 180,
    ticketPrice: 799,
    imageURL:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Art Exhibition",
    description: "Modern art from world famous artists.",
    date: new Date(Date.now() + 8 * 86400000),
    location: "Kolkata",
    categary: "Art",
    totalSeats: 250,
    ticketPrice: 150,
    imageURL:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Food Carnival",
    description: "Taste dishes from around the world.",
    date: new Date(Date.now() + 18 * 86400000),
    location: "Chennai",
    categary: "Food",
    totalSeats: 300,
    ticketPrice: 199,
    imageURL:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cricket Fan Meetup",
    description: "Meet cricket lovers and former players.",
    date: new Date(Date.now() + 30 * 86400000),
    location: "Ahmedabad",
    categary: "Sports",
    totalSeats: 400,
    ticketPrice: 350,
    imageURL:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");

    await Booking.deleteMany({});
    await Event.deleteMany({});
    await User.deleteMany({});

    console.log("Previous data deleted.");

    const salt = await bcrypt.genSalt(10);

    const hashedUsers = users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, salt),
    }));

    const createdUsers = await User.insertMany(hashedUsers);

    const admins = createdUsers.filter((u) => u.role === "admin");
    const normalUsers = createdUsers.filter((u) => u.role === "user");

    const eventsWithAdmin = events.map((event, index) => ({
      ...event,
      availableSeats: event.totalSeats,
      createdBy: admins[index % admins.length]._id,
    }));

    const createdEvents = await Event.insertMany(eventsWithAdmin);

    const bookings = [];

    for (const event of createdEvents) {
      for (const user of normalUsers) {
        const status =
          Math.random() > 0.5 ? "confimed" : "pending";

        const paymentStatus =
          event.ticketPrice === 0
            ? "paid"
            : status === "confimed"
            ? "paid"
            : "non_paid";

        bookings.push({
          userId: user._id,
          eventId: event._id,
          status,
          paymentStatus,
          amount: event.ticketPrice,
        });

        if (status === "confimed") {
          event.availableSeats--;
          await event.save();
        }
      }
    }

    await Booking.insertMany(bookings);

    console.log("================================");
    console.log("Database Seeded Successfully");
    console.log("================================");

    console.log("Admins");
    console.log("admin1@eventora.com");
    console.log("admin2@eventora.com");

    console.log();

    console.log("Users");
    console.log("john@eventora.com");
    console.log("alice@eventora.com");
    console.log("bob@eventora.com");

    console.log();

    console.log("Password for all users:");
    console.log("password123");

    console.log("================================");

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDatabase();