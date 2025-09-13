// src/Signup.js
import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css"; // import CSS file

// ✅ Import images from src folder
import upPhoto from "./upphoto.jpg";
import logo from "./logo.jpg";

const Signup = () => {
  return (
    <div className="signup-page">
      {/* Left Illustration */}
      <div className="signup-left">
        <img src={upPhoto} alt="Signup Illustration" />
      </div>

      {/* Right Signup Form */}
      <div className="signup-right">
        <div className="logo-header">
          <img src={logo} alt="EduStudy Logo" className="logo" />
          <h2>EduStudy</h2>
        </div>

        <h1>Sign up with email</h1>

        <form className="signup-form">
          <input type="text" placeholder="Full name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            Send me special offers, personalized recommendations, and learning tips.
          </label>

          <button type="submit" className="continue-btn">
            Continue
          </button>
        </form>

        <div className="divider">
          <span>Other sign up options</span>
        </div>

        <div className="social-buttons">
          <button>G</button>
          <button>f</button>
          <button></button>
        </div>

        <p className="terms">
          By signing up, you agree to our{" "}
          <Link to="/terms">Terms of Use</Link> and{" "}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
