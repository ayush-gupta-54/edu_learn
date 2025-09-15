// src/components/StudentDashboard.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(
    JSON.parse(localStorage.getItem("studentProfile")) || {
      name: "",
      aspirations: "",
      cgpa: "",
      projects: [],
      internships: [],
      hobbies: [],
      codingLanguages: [],
      skills: [],
    }
  );

  const [analysisData, setAnalysisData] = useState({});
  const [closenessScore, setClosenessScore] = useState(0);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

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
      .catch((err) => console.error("Error fetching student profile:", err));
  }, []);

  const handleViewAnalysis = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  setLoadingAnalysis(true);
  fetch(`http://localhost:5000/analysis/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      // Save the full analysis object instead of just chartData
      setAnalysisData(data);
      setClosenessScore(data.closenessScore || 0);
    })
    .catch((err) => console.error("Error fetching analysis data:", err))
    .finally(() => setLoadingAnalysis(false));
};


  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🎯 Community Icon */}
      <motion.div
        className="community-icon-wrapper"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Link to="/community" className="community-icon-link" title="Join Community">
          <FaUsers size={28} />
        </Link>
      </motion.div>

      <div className="dashboard-content">
        {/* Left Section */}
        <div className="left-section">
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
              Hey, <span className="student-name">{studentData.name || "Student"}</span>
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
                <span>{studentData.projects?.length ? studentData.projects.join(", ") : "—"}</span>
              </div>
              <div className="info-item">
                <strong>Internships</strong>
                <span>{studentData.internships?.length ? studentData.internships.join(", ") : "—"}</span>
              </div>
              <div className="info-item">
                <strong>Hobbies</strong>
                <span>{studentData.hobbies?.length ? studentData.hobbies.join(", ") : "—"}</span>
              </div>
              <div className="info-item">
                <strong>Coding Languages</strong>
                <span>{studentData.codingLanguages?.length ? studentData.codingLanguages.join(", ") : "—"}</span>
              </div>
              <div className="info-item">
                <strong>Skills</strong>
                <span>{studentData.skills?.length ? studentData.skills.join(", ") : "—"}</span>
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
            <Link to="/roadmap" className="btn-primary">Generate Roadmap</Link>
            <button onClick={handleViewAnalysis} className="btn-secondary">
              {loadingAnalysis ? "Loading..." : "View Analysis"}
            </button>
          </motion.div>
        </div>

        {/* Right Section: Analysis Charts */}
        <div className="right-section">
          <motion.div
            className="analysis-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="section-heading">Progress Analysis</h3>
            {Object.keys(analysisData).length > 0 ? (
              <>
                {/* Heading for Radial Progress */}
                <h4 style={{ textAlign: "center", marginBottom: "8px" }}>🎯 Goal Progress</h4>
                <ResponsiveContainer width="100%" height={260}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    barSize={15}
                    startAngle={90}
                    endAngle={-270}
                    data={[
                      { name: "Background", value: 100, fill: "url(#bgGradient)" },
                      { name: "Progress", value: closenessScore, fill: "url(#progressGradient)" },
                    ]}
                  >
                    <defs>
                      <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f0f0f0" />
                        <stop offset="100%" stopColor="#d9d9d9" />
                      </linearGradient>
                      <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="red" />
                        <stop offset="100%" stopColor="yellow" />
                      </linearGradient>
                    </defs>
                    <RadialBar minAngle={15} clockWise dataKey="value" cornerRadius={10} />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="600" fill="#333">
                      {closenessScore}%
                    </text>
                    <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="#666">
                      towards your goal
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>

                {/* Heading for Bar Chart */}
                <h4 style={{ textAlign: "center", marginTop: "20px", marginBottom: "8px" }}>📊 Skills Breakdown</h4>
                <ResponsiveContainer width="100%" height={260}>
  <BarChart
    data={[
      { skill: "Creativity", score: analysisData.creativity || 0, fill: "url(#creativityGradient)" },
      { skill: "Confidence", score: analysisData.confidence || 0, fill: "url(#confidenceGradient)" },
      { skill: "Logical Thinking", score: analysisData.logicalThinking || 0, fill: "url(#logicGradient)" },
    ]}
    margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
  >
    <defs>
      <linearGradient id="creativityGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff4d4d" />
        <stop offset="100%" stopColor="#ff8080" />
      </linearGradient>
      <linearGradient id="confidenceGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff176" />
        <stop offset="100%" stopColor="#ffeb3b" />
      </linearGradient>
      <linearGradient id="logicGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#81c784" />
        <stop offset="100%" stopColor="#a5d6a7" />
      </linearGradient>
    </defs>

    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis dataKey="skill" />
    <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
    <Tooltip formatter={(val) => `${val}%`} />
    <Bar dataKey="score" radius={[10, 10, 0, 0]}>
      <LabelList dataKey="score" position="top" formatter={(val) => `${val}%`} />
    </Bar>
  </BarChart>
</ResponsiveContainer>

              </>
            ) : (
              <p style={{ textAlign: "center", padding: "20px" }}>
                Click “View Analysis” to generate your charts.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;
