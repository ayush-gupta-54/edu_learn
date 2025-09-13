import React, { useState } from "react";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="logo">EduStudy</div>
        <nav>
          <a href="#">Home</a>
          <a href="#">Courses</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Personalized Learning for Every Student 🚀</h1>
          <p>
            EduStudy adapts to your pace, style, and goals. Experience a smarter
            way of learning that is engaging, effective, and designed just for
            you.
          </p>
          <p>
            <strong>Start your journey today with EduStudy!</strong>
          </p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png"
          alt="Learning Illustration"
        />
      </section>

      {/* Quotes Section */}
      <section className="quotes">
        <h2>Motivational Quotes ✨</h2>
        <div className="quote">
          “Education is the most powerful weapon which you can use to change the
          world.” – Nelson Mandela
        </div>
        <div className="quote">
          “The beautiful thing about learning is that no one can take it away
          from you.” – B.B. King
        </div>
        <div className="quote">
          “Success is the sum of small efforts, repeated day in and day out.” –
          Robert Collier
        </div>
        <div className="quote">
          “Learning never exhausts the mind.” – Leonardo da Vinci
        </div>
      </section>

      {/* Auth Section */}
      <section className="auth-section">
        <div className="auth-box">
          <h3>{isLogin ? "Login" : "Sign Up"}</h3>
          <form>
            {!isLogin && (
              <input type="text" placeholder="Full Name" required />
            )}
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
          </form>
          <div className="toggle-text">
            {isLogin ? (
              <p>
                Don’t have an account?{" "}
                <span onClick={() => setIsLogin(false)}>Sign Up</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Login</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>© 2025 EduStudy. All rights reserved.</footer>
    </div>
  );
}

export default App;
