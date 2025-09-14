// src/components/Roadmap.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Roadmap.css";

const Roadmap = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/roadmap/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch roadmap");
        return res.json();
      })
      .then((data) => {
        setRoadmap(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching roadmap:", err);
        setError("Failed to generate roadmap. Try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="roadmap-loading">⏳ Generating your roadmap...</div>;
  }

  if (error) {
    return <div className="roadmap-error">{error}</div>;
  }

  return (
    <motion.div
      className="roadmap-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="roadmap-heading">🚀 Your Career Roadmap</h2>

      <div className="roadmap-sections">
        <motion.div
          className="roadmap-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>📅 Short Term (0–6 months)</h3>
          <ul>
            {roadmap.shortTerm?.map((step, idx) => (
              <li key={idx}>{step}</li>
            )) || <li>No steps generated</li>}
          </ul>
        </motion.div>

        <motion.div
          className="roadmap-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>📆 Mid Term (6–18 months)</h3>
          <ul>
            {roadmap.midTerm?.map((step, idx) => (
              <li key={idx}>{step}</li>
            )) || <li>No steps generated</li>}
          </ul>
        </motion.div>

        <motion.div
          className="roadmap-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3>🎯 Long Term (18+ months)</h3>
          <ul>
            {roadmap.longTerm?.map((step, idx) => (
              <li key={idx}>{step}</li>
            )) || <li>No steps generated</li>}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Roadmap;
