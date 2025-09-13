import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import upPhoto from "./upphoto.jpg";
import logo from "./logo.jpg";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Register user
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ " + data.message);

        // Save userId for session
        localStorage.setItem("userId", data.userId);

        // 2️⃣ Create an empty Student profile for this user
        await fetch("http://localhost:5000/student", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: data.userId,
            name: name,          // take name from signup form
            cgpa: null,          // initially empty
            projects: [],
            hobbies: [],
            internships: [],
            aspirations: "",
          }),
        });

        // 3️⃣ Redirect to login (or dashboard)
        window.location.href = "/login";
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

        <h1>Sign up with email</h1>

        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            Send me special offers, personalized recommendations, and learning tips.
          </label>

          <button type="submit" className="continue-btn" disabled={loading}>
            {loading ? "Signing up..." : "Continue"}
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
