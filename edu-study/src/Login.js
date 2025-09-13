import React from "react";
import "./login.css";
import logo from "./logo.jpg"; // EduStudy logo

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <img src={logo} alt="EduStudy Logo" className="logo" />

        {/* Title */}
        <h2 className="login-title">Log in to EduStudy</h2>

        {/* Social Login */}
        <div className="social-buttons">
          <button className="google">G</button>
          <button className="facebook">f</button>

        </div>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Email / Password */}
        <form>
          <label>Email address</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <div className="password-container">
            <input type="password" placeholder="Enter your password" required />
            <span className="eye">👁️</span>
          </div>

          <a href="#" className="forgot">
            Forgot password?
          </a>

          <button type="submit" className="login-btn">
            Log in
          </button>
        </form>

        {/* Bottom Links */}
        <div className="footer-links">
          <p>
            Can’t access your account? <a href="#">Help</a>
          </p>
          <p>
            Don’t have an account? <a href="#">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
