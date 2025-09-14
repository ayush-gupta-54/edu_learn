// src/Profile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    cgpa: "",
    projects: "",
    hobbies: "",
    internships: "",
    aspirations: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // ✅ Fetch existing profile if available
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/student/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || "",
            cgpa: data.cgpa || "",
            projects: (data.projects || []).join(", "),
            hobbies: (data.hobbies || []).join(", "),
            internships: (data.internships || []).join(", "),
            aspirations: data.aspirations || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Save / Update profile
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/student/${userId}`, {
        method: "PUT", // ✅ FIXED: matches backend route
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          cgpa: parseFloat(formData.cgpa),
          projects: formData.projects
            ? formData.projects.split(",").map((p) => p.trim())
            : [],
          hobbies: formData.hobbies
            ? formData.hobbies.split(",").map((h) => h.trim())
            : [],
          internships: formData.internships
            ? formData.internships.split(",").map((i) => i.trim())
            : [],
          aspirations: formData.aspirations,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ " + data.message);
        navigate("/dashboard"); // redirect after saving
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Profile save error:", err);
      alert("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Student Profile</h2>
      <form className="profile-form" onSubmit={handleSave}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>CGPA</label>
        <input
          type="number"
          step="0.01"
          name="cgpa"
          value={formData.cgpa}
          onChange={handleChange}
        />

        <label>Projects</label>
        <input
          type="text"
          name="projects"
          value={formData.projects}
          onChange={handleChange}
          placeholder="Comma separated"
        />

        <label>Hobbies</label>
        <input
          type="text"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
          placeholder="Comma separated"
        />

        <label>Internships</label>
        <input
          type="text"
          name="internships"
          value={formData.internships}
          onChange={handleChange}
          placeholder="Comma separated"
        />

        <label>Aspirations</label>
        <textarea
          name="aspirations"
          value={formData.aspirations}
          onChange={handleChange}
          placeholder="Your aspirations"
        ></textarea>

        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
