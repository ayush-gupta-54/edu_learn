// src/App.js
import React from "react";
import "./App.css";
import logo from "./logo.jpg"; // Place your logo in src folder

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="EduStudy Logo" className="logo" />
        <h1>EduStudy</h1>
      </header>

      {/* Contact Container */}
      <div className="container">
        <h2>Contact Us</h2>

        {/* Contact Info */}
        <div className="contact-details">
          <div>
            <h3>📞 Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div>
            <h3>📧 Email</h3>
            <p>support@edustudy.com</p>
          </div>
          <div>
            <h3>📍 Address</h3>
            <p>123 Edu Street, Learning City</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 EduStudy | All Rights Reserved
      </footer>
    </div>
  );
}

export default App;
