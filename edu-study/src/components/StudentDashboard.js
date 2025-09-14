// src/StudentDashboard.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(
    JSON.parse(localStorage.getItem("studentProfile")) || {}
  );

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:5000/student/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setStudentData(data);
        localStorage.setItem("studentProfile", JSON.stringify(data));
      })
      .catch((err) => {
        console.error("Error fetching student profile:", err);
      });
  }, []);

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dashboard Heading */}
      <motion.h1
        className="dashboard-heading"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Student Dashboard
      </motion.h1>

      {/* Welcome Section */}
      <motion.div
        className="welcome-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>
          Hey,{" "}
          <span className="student-name">
            {studentData.name || "Student"}
          </span>
        </h2>
      </motion.div>

      {/* Career Info */}
      <motion.div
        className="section-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="section-heading">Career Info</h3>
        <div className="info-item">
          <strong>Aspirant</strong>
          <span>{studentData.aspirations || "—"}</span>
        </div>
      </motion.div>

      {/* Student Info */}
      <motion.div
        className="section-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="section-heading">Student Info</h3>
        <div className="profile-info-grid">
          <div className="info-item">
            <strong>CGPA</strong>
            <span>{studentData.cgpa || "—"}</span>
          </div>
          <div className="info-item">
            <strong>Projects</strong>
            <span>
              {studentData.projects?.length
                ? studentData.projects.join(", ")
                : "—"}
            </span>
          </div>
          <div className="info-item">
            <strong>Internships</strong>
            <span>
              {studentData.internships?.length
                ? studentData.internships.join(", ")
                : "—"}
            </span>
          </div>
          <div className="info-item">
            <strong>Hobbies</strong>
            <span>
              {studentData.hobbies?.length
                ? studentData.hobbies.join(", ")
                : "—"}
            </span>
          </div>
          <div className="info-item">
            <strong>Coding Languages</strong>
            <span>
              {studentData.codingLanguages?.length
                ? studentData.codingLanguages.join(", ")
                : "—"}
            </span>
          </div>
          {/* ✅ New Skills Tab */}
          <div className="info-item">
            <strong>Skills</strong>
            <span>
              {studentData.skills?.length
                ? studentData.skills.join(", ")
                : "—"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="button-group"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link to="/roadmap" className="btn-primary">
          Generate Roadmap
        </Link>
        <Link to="/analysis" className="btn-secondary">
          View Analysis
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default StudentDashboard;