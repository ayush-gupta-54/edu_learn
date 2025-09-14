// src/Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import upPhoto from "./upphoto.jpg";
import logo from "./logo.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle submit
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ " + data.message);
        localStorage.setItem("userId", data.userId);

        // redirect to profile page to fill remaining details
        navigate("/profile-setup");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        <h1>Create your account</h1>

        <form className="signup-form" onSubmit={handleSignup}>
          <input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

          <button type="submit" className="continue-btn" disabled={loading}>
            {loading ? "Signing up..." : "Continue"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
