// src/components/Community.js
import React from "react";
import { motion } from "framer-motion";
import "./Community.css";

const Community = () => {
  return (
    <motion.div
      className="community-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Sidebar */}
      <motion.aside
        className="community-sidebar"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Community</h2>
        <ul>
          <li>💬 Discussions</li>
          <li>📚 Resources</li>
          <li>🎉 Events</li>
          <li>❓ Help</li>
        </ul>
      </motion.aside>

      {/* Main Content */}
      <main className="community-content">
        <motion.header
          className="community-header"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Welcome to the Student Community</h1>
          <p>Connect, collaborate, and grow with your peers 🚀</p>
        </motion.header>

        <motion.section
          className="community-posts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div className="community-post" whileHover={{ scale: 1.03 }}>
            <h3>📢 New Hackathon Coming!</h3>
            <p>Join the upcoming hackathon to showcase your skills 🚀</p>
          </motion.div>

          <motion.div className="community-post" whileHover={{ scale: 1.03 }}>
            <h3>💡 Share Your Projects</h3>
            <p>Post about what you are building and get feedback!</p>
          </motion.div>

          <motion.div className="community-post" whileHover={{ scale: 1.03 }}>
            <h3>🤝 Find Collaborators</h3>
            <p>Team up with like-minded students on exciting projects!</p>
          </motion.div>

          <motion.div className="community-post" whileHover={{ scale: 1.03 }}>
            <h3>🎯 Career Guidance</h3>
            <p>Get tips, roadmaps, and mentorship for your career goals.</p>
          </motion.div>
        </motion.section>
      </main>
    </motion.div>
  );
};

export default Community;
