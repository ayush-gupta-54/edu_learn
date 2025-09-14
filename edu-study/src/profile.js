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
    codingLanguages: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // ✅ Fetch existing profile if available
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) return; // safeguard
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
            codingLanguages: (data.codingLanguages || []).join(", "),
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [userId]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Save / Update profile
  const handleSave = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("⚠️ User not logged in!");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/student/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
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
          codingLanguages: formData.codingLanguages
            ? formData.codingLanguages.split(",").map((c) => c.trim())
            : [],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Profile saved successfully!");
        navigate("/dashboard");
      } else {
        alert("❌ " + (data.message || "Failed to save profile"));
      }
    } catch (err) {
      console.error("Profile save error:", err);
      alert("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-wrapper">
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

          {/* ✅ Coding Languages moved ABOVE Aspirations */}
          <label>Coding Languages</label>
          <input
            type="text"
            name="codingLanguages"
            value={formData.codingLanguages}
            onChange={handleChange}
            placeholder="e.g. JavaScript, Python, C++"
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
    </div>
  );
};

export default Profile;
