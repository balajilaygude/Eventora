import {
  FaCalendarAlt,
  FaShieldAlt,
  FaUsers,
  FaTicketAlt,
  FaMagic,
  FaTachometerAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function About() {
  const features = [
    {
      icon: <FaCalendarAlt size={28} className="text-blue-600" />,
      title: "Discover Amazing Events",
      description:
        "Explore conferences, workshops, concerts, sports events, networking sessions, and much more—all in one place.",
    },
    {
      icon: <FaTicketAlt size={28} className="text-blue-600" />,
      title: "Easy Event Booking",
      description:
        "Book your favorite events in just a few clicks and manage all your bookings from your personal dashboard.",
    },
    {
      icon: <FaTachometerAlt size={28} className="text-blue-600" />,
      title: "Admin Dashboard",
      description:
        "Admins can create, edit, and manage events while monitoring bookings, users, and platform activity.",
    },
    {
      icon: <FaUsers size={28} className="text-blue-600" />,
      title: "User Management",
      description:
        "Manage participants, booking information, and event attendance efficiently.",
    },
    {
      icon: <FaShieldAlt size={28} className="text-blue-600" />,
      title: "Secure Authentication",
      description:
        "JWT authentication, encrypted passwords using bcrypt, protected routes, and role-based authorization keep your account secure.",
    },
    {
      icon: <FaMagic size={28} className="text-blue-600" />,
      title: "Modern Experience",
      description:
        "Built with React, Node.js, Express, MongoDB, and Tailwind CSS to deliver a fast and responsive experience.",
    },
  ];

  return (
    <div className="bg-white text-zinc-900">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-sky-100 to-cyan-100 opacity-80"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-medium">
            About Eventora
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Making Event Booking
            <span className="block text-blue-600">
              Simple, Secure & Modern
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-zinc-600 text-lg leading-8">
            Eventora is a modern event booking and management platform built
            using the MERN Stack. Whether you're attending your next conference,
            music festival, workshop, or managing events as an organizer,
            Eventora provides a smooth and intuitive experience.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Everything You Need in One Platform
          </h2>

          <p className="mt-4 text-zinc-600">
            Designed for both event attendees and organizers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-zinc-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Eventora */}
      <section className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold">
              Built for Users & Event Organizers
            </h2>

            <p className="mt-6 text-zinc-600 leading-8">
              Eventora combines an elegant booking experience with a powerful
              admin dashboard. Users can discover and reserve events, while
              administrators manage events, users, bookings, and platform
              activity from one centralized place.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "JWT Authentication",
                "Role-Based Access Control",
                "Responsive Design",
                "Event & Booking Management",
                "RESTful APIs",
                "Scalable MERN Stack",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl shadow-lg p-10">
            <h3 className="text-2xl font-bold mb-8">
              Technology Stack
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                "React.js",
                "Tailwind CSS",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Mongoose",
                "JWT",
                "bcrypt",
                "Axios",
                "Context API",
              ].map((tech) => (
                <div
                  key={tech}
                  className="border border-zinc-200 rounded-xl p-4 text-center bg-white font-medium hover:bg-blue-50 transition"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold">
          More Than Just Event Booking
        </h2>

        <p className="mt-6 text-lg text-zinc-600 leading-8">
          Eventora is a full-stack MERN application built to demonstrate secure
          authentication, role-based access control, event management, booking
          workflows, and responsive UI design. It showcases modern web
          development practices while providing a practical solution for
          discovering and managing events.
        </p>
      </section>
    </div>
  );
}