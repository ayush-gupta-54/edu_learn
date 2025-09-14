// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";
import logo from "./logo.jpg";
import bgImage from "./background.png";

// Pages
import Login from "./login";
import Signup from "./Signup";
import Profile from "./profile";
import Contact from "./contact";
import StudentDashboard from "./components/StudentDashboard";
import Roadmap from "./components/Roadmap";
import Community from "./components/Community"; // 👈 Add this import

function Landing() {
  return (
    <div className="App">
      {/* Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="logo">
          <motion.img
            src={logo}
            alt="EduStudy Logo"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <nav>
          <ul>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/courses">Courses</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/resources">Resources</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/about">About</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/contact">Contact</Link>
            </motion.li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login" className="login">Login</Link>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-overlay"></div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Welcome to EduStudy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Learn new skills, grow your career, and unlock your potential with
            our expert-led courses.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Link to="/signup" className="learn-btn">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Your Profile
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile-setup" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/community" element={<Community />} /> {/* 👈 Added route */}
      </Routes>
    </Router>
  );
}

export default App;
