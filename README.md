# 🎉 Eventora – Event Booking & Management System

## Overview

**Eventora** is a full-stack MERN Event Booking & Management platform that enables users to discover, book, and manage events while providing administrators with a dedicated dashboard to manage events, bookings, users, and booking statuses.

The project was built to gain hands-on experience in developing a production-ready event management system with secure authentication, role-based authorization, email verification, and complete CRUD operations. It focuses on delivering a seamless booking experience while ensuring security, scalability, and efficient event administration.

---

## ✨ Key Features

- 🔐 User registration and login with JWT Authentication
- 📧 Email verification using OTP via Nodemailer
- ⏱️ OTP generation with 5-minute expiration
- 👤 Separate dashboards for Admin and Users
- 🎫 Browse and book available events
- ➕ Create, update, and delete events (Admin)
- 👥 Manage bookings and enrolled users
- ✅ Update booking status (Confirmed / Cancelled)
- 💳 Track payment status (Paid / Unpaid)
- 🛡️ Protected routes with Role-Based Access Control (RBAC)
- 📱 Responsive UI built with Tailwind CSS
- ⚡ RESTful API architecture
- 🔒 Secure password hashing using bcrypt

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Context API
- React Router DOM
- Axios
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- Nodemailer
- CORS
- dotenv

### Development

- Nodemon

---

## 🏗️ Architecture

```text
React Frontend (Tailwind CSS)
            │
            ▼
     Context API & Axios
            │
            ▼
     Express REST APIs
            │
            ▼
 JWT Authentication Middleware
            │
            ▼
   MongoDB Atlas (Mongoose)
            │
            ▼
 Nodemailer (OTP Verification)
```

---

## 🚀 How It Works

### Simple & Secure Event Booking

Booking an event with **Eventora** is quick and hassle-free.

1. Register and verify your email using OTP.
2. Login securely using JWT Authentication.
3. Browse available events.
4. View event details.
5. Book your preferred event.
6. Administrators review booking requests.
7. Booking status is updated.
8. Users can track bookings from their dashboard.

The admin dashboard allows administrators to create events, manage bookings, update booking statuses, and monitor enrolled participants from one place.

---

## 🔒 Security Implementations

- JWT Authentication & Authorization
- Password Hashing using bcrypt
- OTP-based Email Verification
- Role-Based Access Control (RBAC)
- Protected API Routes
- Input Validation
- Environment Variables using dotenv

---

## ⚡ Challenges Faced

### 1. Role-Based Access Control

Built separate Admin and User dashboards while restricting access through middleware-based authorization.

### 2. OTP Email Verification

Implemented a secure OTP verification system with 5-minute expiration using Nodemailer and MongoDB.

### 3. Booking Management

Designed APIs for event booking while enabling administrators to manage booking confirmations, cancellations, and enrolled users efficiently.

### 4. Authentication & Security

Implemented JWT authentication, bcrypt password hashing, protected routes, and middleware authorization for secure application access.



---

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/Eventora.git
```


### Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000



```




## 🌟 Future Improvements

- 💳 Online Payment Integration
- 🎟️ QR Code Tickets
- ⭐ Event Reviews & Ratings
- 🔍 Advanced Search & Filters
- 📧 Booking Email Notifications
- 📊 Admin Analytics Dashboard
- ❤️ Wishlist & Favorites
- 📅 Calendar Integration

---

## 🌐 Live Demo

**Live Demo:** https://eventora-app-f9qc.onrender.com

---

## 💡 Impact

Eventora demonstrates strong full-stack MERN development skills through secure authentication, role-based authorization, OTP email verification, RESTful API development, and scalable CRUD operations.

The project showcases the ability to build a production-ready Event Booking & Management platform with separate user and administrator workflows while emphasizing security, maintainability, and modern web application architecture.

---

# 🎟️ Making Event Booking

## Simple, Secure & Modern

**Eventora** is a modern Event Booking & Management platform built using the **MERN Stack**.

Whether you're attending a conference, workshop, seminar, cultural event, or community meetup, Eventora provides a fast, secure, and intuitive booking experience while giving administrators complete control over event management.

---

## 📸 Screenshots

> Add screenshots here.

### Home Page

<img width="1895" height="908" alt="Screenshot 2026-08-16 154053" src="https://github.com/user-attachments/assets/f7b5dcc2-1158-4a5d-8505-a186eeb071c9" />

<img width="1887" height="914" alt="Screenshot 2026-08-16 154111" src="https://github.com/user-attachments/assets/6e0ece46-19a1-4abd-815f-87758f53ca03" />


### User Dashboard

<img width="1900" height="909" alt="Screenshot 2026-08-16 154252" src="https://github.com/user-attachments/assets/b81e7c8f-8855-4e23-a791-af116e24ef89" />


### Admin Dashboard

<img width="1899" height="911" alt="Screenshot 2026-08-16 154337" src="https://github.com/user-attachments/assets/ee144c8b-edce-429d-acc4-409e8aec4f62" />
<img width="1901" height="904" alt="Screenshot 2026-08-16 154357" src="https://github.com/user-attachments/assets/50a808e4-315e-4027-8162-172b1fcf33b4" />

### Event Details

<img width="1898" height="909" alt="Screenshot 2026-08-16 154553" src="https://github.com/user-attachments/assets/97946926-750f-49fb-b833-eb1f016b6968" />


## 👨‍💻 Author

Balaji Laygude
