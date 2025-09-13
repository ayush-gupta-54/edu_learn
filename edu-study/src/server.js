// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/edustudy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log(err));

/* ==============================
   Schemas & Models
================================ */

// User Schema (for login/signup)
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Student Schema (profile details)
const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // linked to User
  name: String,
  cgpa: Number,
  projects: [String],
  hobbies: [String],
  internships: [String],
  aspirations: String,
  createdAt: { type: Date, default: Date.now }
});
const Student = mongoose.model("Student", studentSchema);

/* ==============================
   Routes
================================ */

// Register API (Signup)
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
});

// Create or Update Student Profile
app.post("/student", async (req, res) => {
  const { userId, name, cgpa, projects, hobbies, internships, aspirations } = req.body;

  try {
    let student = await Student.findOne({ userId });

    if (student) {
      student.name = name;
      student.cgpa = cgpa;
      student.projects = projects;
      student.hobbies = hobbies;
      student.internships = internships;
      student.aspirations = aspirations;
      await student.save();

      return res.json({ message: "Student profile updated", student });
    }

    student = new Student({ userId, name, cgpa, projects, hobbies, internships, aspirations });
    await student.save();

    res.json({ message: "Student profile created", student });
  } catch (err) {
    res.status(500).json({ message: "Error saving student profile", error: err });
  }
});

// Get Student Profile
app.get("/student/:userId", async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) return res.status(404).json({ message: "Student profile not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student profile", error: err });
  }
});

/* ==============================
   Start Server
================================ */
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
