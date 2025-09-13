import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./logo.jpg";
import bgImage from "./background image.webp";
import Login from "./Login"; // Import your login page

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
            <li><a href="#">Courses</a></li>
            <li><a href="#">Resources</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          {/* ✅ Changed <a> to <Link> */}
          <Link to="/login" className="login">Login</Link>
          <a href="#" className="signup">Signup</a>
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
          <a href="#" className="learn-btn">Learn More</a>
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
      </Routes>
    </Router>
  );
}

export default App;
