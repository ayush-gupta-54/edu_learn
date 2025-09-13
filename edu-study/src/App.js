import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="logo">EduStudy</div>
        <nav>
          <a href="#">Courses</a>
          <a href="#">Exams</a>
          <a href="#">Resources</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Your Learning Journey Starts Here</h1>
        <p>
          From school subjects to skill development, EduStudy is here to guide
          you with personalized learning.
        </p>
        <button className="main-btn">Get Started</button>

        {/* Feature Buttons */}
        <div className="features">
          <button className="feature-btn">📘 Explore Courses</button>
          <button className="feature-btn">📝 Take a Quiz</button>
          <button className="feature-btn">🎯 Track Progress</button>
          <button className="feature-btn">📚 Study Resources</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2025 EduStudy. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
