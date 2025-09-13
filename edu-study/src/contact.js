// src/contact.js
import React from "react";
import "./App.css";

function Contact() {
  return (
    <div className="contact-page">
      <h1>📞 Contact Us</h1>
      <p>If you have questions, feel free to reach out to our developers:</p>

      <div className="contact-cards">
        <div className="card">
          <h3>👩‍💻 Nidhi Sharma</h3>
          <p>Email: nidhi@example.com</p>
          <p>LinkedIn: <a href="https://linkedin.com/in/nidhi" target="_blank" rel="noreferrer">Profile</a></p>
          <p>GitHub: <a href="https://github.com/nidhi" target="_blank" rel="noreferrer">github.com/nidhi</a></p>
        </div>

        <div className="card">
          <h3>👨‍💻 Dev Kumar</h3>
          <p>Email: dev@example.com</p>
          <p>LinkedIn: <a href="https://linkedin.com/in/dev" target="_blank" rel="noreferrer">Profile</a></p>
          <p>GitHub: <a href="https://github.com/dev" target="_blank" rel="noreferrer">github.com/dev</a></p>
        </div>
      </div>

      <button
        className="back-btn"
        onClick={() => window.history.back()}
      >
        ⬅ Back
      </button>
    </div>
  );
}

export default Contact;
