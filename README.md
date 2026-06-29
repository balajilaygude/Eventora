# Eventora – Event Booking & Management System

## Overview

Eventora is a full-stack MERN event booking platform that enables users to browse and book events while providing administrators with a dedicated dashboard to manage events, bookings, users, and ticket statuses. The application implements secure authentication, role-based access control, and email verification using OTP to ensure a reliable and secure booking experience.

The project was built to gain hands-on experience in developing a production-ready event management system with authentication, authorization, email services, and complete CRUD operations.

## Key Features

* User registration and login with JWT authentication
* Email verification using OTP sent via Nodemailer
* OTP generation with 5-minute expiration and database storage
* Separate dashboards for Admin and Users
* Browse and book available events
* Create, update, and delete events (Admin)
* Manage event bookings and enrolled users
* Update booking status (Confirmed, Cancelled, Paid, Unpaid)
* Responsive UI with protected routes
* RESTful API architecture
* Secure password hashing using bcrypt

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Context API
* React Router DOM
* Axios
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt
* Nodemailer
* CORS
* dotenv

### Development

* Nodemon

## Architecture

React Frontend (Tailwind CSS)
↓
Context API & Axios
↓
Express.js REST APIs
↓
JWT Authentication Middleware
↓
MongoDB Atlas (Mongoose)
↓
Nodemailer (OTP Verification)

## Challenges Faced

### 1. Role-Based Access Control

Implemented separate user and admin dashboards while restricting access to protected routes based on user roles.

### 2. OTP Email Verification

Developed an email verification system that generates unique OTPs, stores them securely in MongoDB with a 5-minute expiration, and validates them before allowing critical actions.

### 3. Booking Management

Designed APIs for event booking and enabled administrators to manage booking statuses, payment status, and enrolled users efficiently.

### 4. Authentication & Security

Implemented JWT authentication, bcrypt password hashing, protected routes, and middleware-based authorization for secure access control.

## Security Implementations

* JWT Authentication & Authorization
* bcrypt Password Hashing
* OTP-based Email Verification
* Role-Based Access Control (RBAC)
* Protected API Routes
* Environment Variable Management using dotenv
