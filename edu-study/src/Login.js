import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import logo from "./logo.jpg";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", data.userId);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="EduStudy Logo" className="logo" />
        <h2 className="login-title">Welcome Back!</h2>

        {/* Social buttons with only icons */}
        <div className="social-buttons">
          <button className="google" title="Login with Google">
            <FaGoogle />
          </button>
          <button className="facebook" title="Login with Facebook">
            <FaFacebook />
          </button>
          <button className="github" title="Login with GitHub">
            <FaGithub />
          </button>
        </div>

        <div className="divider"><span>or</span></div>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <a href="#" className="forgot">Forgot password?</a>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="footer-links">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;