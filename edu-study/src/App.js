// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./logo.jpg";
import bgImage from "./background.png";
import Login from "./login";     // Your login page
import Contact from "./contact"; // Contact page
import Signup from "./Signup";   // ✅ Import Signup page

function Landing() {
  return (
    <div className="App">
      {/* Navbar */}
      <header>
        <div className="logo">
          <img src={logo} alt="EduStudy Logo" />
        </div>
        <nav>
          <ul>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="login">Login</Link>
          <Link to="/signup" className="signup">Signup</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to EduStudy</h1>
          <p>
            Learn new skills, grow your career, and unlock your potential
            with our expert-led courses.
          </p>
          <Link to="/courses" className="learn-btn">Learn More</Link>
        </div>
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
        <Route path="/signup" element={<Signup />} />   {/* ✅ Signup route added */}
        <Route path="/contact" element={<Contact />} />
        {/* ✅ More pages can be added here */}
      </Routes>
    </Router>
  );
}

export default App;
