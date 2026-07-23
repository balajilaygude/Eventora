const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const User = require("./models/user");
const Event = require("./models/eventmodel");
const Booking = require("./models/bookingmodel");

dotenv.config();

const users = [
  // ----------------------
  // Admins
  // ----------------------
  {
    name: "Super Admin",
    email: "admin@eventora.com",
    password: "password123",
    role: "admin",
  },
  {
    name: "Event Manager",
    email: "manager@eventora.com",
    password: "password123",
    role: "admin",
  },

  // ----------------------
  // Users
  // ----------------------
  {
    name: "Arjun Sharma",
    email: "arjun@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Priya Patel",
    email: "priya@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Rahul Verma",
    email: "rahul@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Sneha Joshi",
    email: "sneha@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Rohan Mehta",
    email: "rohan@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Ananya Singh",
    email: "ananya@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Karan Malhotra",
    email: "karan@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Neha Gupta",
    email: "neha@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Aditya Kumar",
    email: "aditya@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Pooja Nair",
    email: "pooja@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Vikram Desai",
    email: "vikram@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Meera Iyer",
    email: "meera@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Siddharth Roy",
    email: "siddharth@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Aisha Khan",
    email: "aisha@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Dev Patel",
    email: "dev@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Ishita Kapoor",
    email: "ishita@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Yash Agarwal",
    email: "yash@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Kavya Reddy",
    email: "kavya@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Aman Choudhary",
    email: "aman@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Nisha Sharma",
    email: "nisha@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Harsh Jain",
    email: "harsh@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Simran Kaur",
    email: "simran@gmail.com",
    password: "password123",
    role: "user",
  },
];

async function seedUsers() {
  console.log("Deleting existing users...");
  await User.deleteMany({});

  const salt = await bcrypt.genSalt(10);

  const hashedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, salt),
  }));

  const createdUsers = await User.insertMany(hashedUsers);

  console.log(`✅ ${createdUsers.length} users created.`);

  const admins = createdUsers.filter((u) => u.role === "admin");
  const normalUsers = createdUsers.filter((u) => u.role === "user");

  return { admins, normalUsers };
}

const events = [
  {
    title: "Open Source Meetup",
    description:
      "Meet open source contributors, developers and tech enthusiasts.",
    location: "Pune",
    categary: "Technology",
    ticketPrice: 0,
    totalSeats: 70,
    imageURL:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Community Yoga Morning",
    description: "A free wellness session for everyone.",
    location: "Bangalore",
    categary: "Health",
    ticketPrice: 0,
    totalSeats: 60,
    imageURL:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Career Networking Evening",
    description: "Build your professional network with industry experts.",
    location: "Mumbai",
    categary: "Networking",
    ticketPrice: 0,
    totalSeats: 80,
    imageURL:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "React India Summit 2026",
    description:
      "Join React developers from across India for talks, workshops, and networking.",
    location: "Bangalore",
    categary: "Technology",
    ticketPrice: 999,
    totalSeats: 80,
    imageURL:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "AI & Machine Learning Conference",
    description:
      "Explore the latest trends in Artificial Intelligence and Machine Learning.",
    location: "Pune",
    categary: "Technology",
    ticketPrice: 1499,
    totalSeats: 90,
    imageURL:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Startup Connect",
    description:
      "Meet founders, investors, and entrepreneurs from India's startup ecosystem.",
    location: "Mumbai",
    categary: "Business",
    ticketPrice: 799,
    totalSeats: 70,
    imageURL:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Music Fiesta",
    description:
      "An unforgettable night featuring India's top live performers.",
    location: "Delhi",
    categary: "Music",
    ticketPrice: 1999,
    totalSeats: 95,
    imageURL:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Photography Masterclass",
    description:
      "Learn portrait, landscape and street photography from professionals.",
    location: "Jaipur",
    categary: "Photography",
    ticketPrice: 599,
    totalSeats: 50,
    imageURL:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Food Carnival",
    description:
      "Experience dishes from over 50 restaurants and celebrity chefs.",
    location: "Hyderabad",
    categary: "Food",
    ticketPrice: 399,
    totalSeats: 85,
    imageURL:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Digital Marketing Bootcamp",
    description:
      "SEO, Social Media, Ads and Branding taught by industry experts.",
    location: "Ahmedabad",
    categary: "Marketing",
    ticketPrice: 899,
    totalSeats: 65,
    imageURL:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "National Gaming Championship",
    description: "Compete in Valorant, BGMI and EA FC tournaments.",
    location: "Chennai",
    categary: "Gaming",
    ticketPrice: 499,
    totalSeats: 75,
    imageURL:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Yoga & Wellness Retreat",
    description:
      "A peaceful one-day retreat focused on mindfulness and wellness.",
    location: "Rishikesh",
    categary: "Health",
    ticketPrice: 699,
    totalSeats: 45,
    imageURL:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Business Leadership Forum",
    description:
      "Learn leadership strategies from successful CEOs and founders.",
    location: "Gurgaon",
    categary: "Business",
    ticketPrice: 1299,
    totalSeats: 60,
    imageURL:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Art & Design Expo",
    description:
      "Discover amazing artwork from emerging and established artists.",
    location: "Kolkata",
    categary: "Art",
    ticketPrice: 350,
    totalSeats: 55,
    imageURL:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Blockchain & Web3 Summit",
    description:
      "Learn about Blockchain, Crypto, Web3 and decentralized applications.",
    location: "Bangalore",
    categary: "Technology",
    ticketPrice: 1599,
    totalSeats: 80,
    imageURL:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Finance & Investment Workshop",
    description: "Understand investing, mutual funds and financial planning.",
    location: "Mumbai",
    categary: "Finance",
    ticketPrice: 999,
    totalSeats: 40,
    imageURL:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cricket Fans Meet",
    description: "Meet former players and interact with cricket enthusiasts.",
    location: "Ahmedabad",
    categary: "Sports",
    ticketPrice: 450,
    totalSeats: 90,
    imageURL:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Networking Night",
    description:
      "Expand your professional network with entrepreneurs and developers.",
    location: "Pune",
    categary: "Networking",
    ticketPrice: 299,
    totalSeats: 60,
    imageURL:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  },
];

async function seedEvents(admins) {
  console.log("Deleting existing events...");
  await Event.deleteMany({});

  const today = new Date();

  const eventsWithData = events.map((event, index) => {
    const eventDate = new Date(today);

    // Spread events over the next 90 days
    eventDate.setDate(today.getDate() + (index + 1) * 6);

    return {
      ...event,
      date: eventDate,
      availableSeats: event.totalSeats,
      createdBy: admins[index % admins.length]._id,
    };
  });

  const createdEvents = await Event.insertMany(eventsWithData);

  console.log(`✅ ${createdEvents.length} events created.`);

  return createdEvents;
}

async function seedBookings(users, events) {
  console.log("Deleting existing bookings...");
  await Booking.deleteMany({});

  const bookings = [];

  // Reset available seats
  for (const event of events) {
    event.availableSeats = event.totalSeats;
  }

  for (const user of users) {
    // Each user books between 3 and 8 unique events
    const bookingCount = Math.floor(Math.random() * 6) + 3;

    const shuffledEvents = [...events].sort(() => Math.random() - 0.5);

    const selectedEvents = shuffledEvents.slice(0, bookingCount);

    for (const event of selectedEvents) {
      let status;

      const random = Math.random();

      if (random < 0.75) {
        status = "confirmed";
      } else if (random < 0.9) {
        status = "pending";
      } else {
        status = "cancelled";
      }

      // Don't overbook
      if (status === "confirmed" && event.availableSeats <= 0) {
        status = "pending";
      }

      const paymentStatus =
        event.ticketPrice === 0
          ? "paid"
          : status === "confirmed"
            ? "paid"
            : "non_paid";

      bookings.push({
        userId: user._id,
        eventId: event._id,
        status,
        paymentStatus,
        amount: event.ticketPrice,
      });

      if (status === "confirmed") {
        event.availableSeats--;
      }
    }
  }

  await Booking.insertMany(bookings);

  // Save updated seats
  for (const event of events) {
    await event.save();
  }

  console.log(`✅ ${bookings.length} bookings created.`);
}


async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");

    // Delete old data
    await Booking.deleteMany({});
    await Event.deleteMany({});
    await User.deleteMany({});

    // Seed
    const { admins, normalUsers } = await seedUsers();

    const createdEvents = await seedEvents(admins);

    await seedBookings(normalUsers, createdEvents);

    console.log("Database Seeded Successfully");

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase();
