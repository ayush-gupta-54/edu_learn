// server.js
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/edustudy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔹 User Schema (login/signup)
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// 🔹 Student Schema (profile details)
const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  name: String,
  cgpa: Number,
  projects: [String],
  hobbies: [String],
  internships: [String],
  aspirations: String,
  codingLanguages: [String], // ✅ existing field
  skills: [String],          // ✅ NEW field for skills
});
const Student = mongoose.model("Student", studentSchema);

//
// ============= ROUTES =============
//

// 🔹 SIGNUP (only creates User account)
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.json({
      message: "User registered successfully",
      userId: newUser._id,
      name: name,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// 🔹 LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.json({ message: "Login successful", userId: user._id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

// 🔹 PROFILE SETUP / UPDATE
app.put("/student/:userId", async (req, res) => {
  const { userId } = req.params;
  const {
    name,
    cgpa,
    projects,
    hobbies,
    internships,
    aspirations,
    codingLanguages,
    skills, // ✅ accept skills from request
  } = req.body;

  try {
    let student = await Student.findOne({ userId });

    if (student) {
      // Update existing profile
      student.name = name || student.name;
      student.cgpa = cgpa || student.cgpa;
      student.projects = projects || student.projects;
      student.hobbies = hobbies || student.hobbies;
      student.internships = internships || student.internships;
      student.aspirations = aspirations || student.aspirations;
      student.codingLanguages = codingLanguages || student.codingLanguages;
      student.skills = skills || student.skills; // ✅ update skills
    } else {
      // Create new profile
      student = new Student({
        userId,
        name,
        cgpa,
        projects,
        hobbies,
        internships,
        aspirations,
        codingLanguages,
        skills, // ✅ save skills
      });
    }

    await student.save();
    res.json({ message: "Profile saved successfully", student });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: "Error saving profile" });
  }
});

// 🔹 GET PROFILE (for dashboard or edit)
app.get("/student/:userId", async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) return res.status(404).json({ message: "Profile not found" });

    res.json(student); // ✅ includes codingLanguages & skills now
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

//
// ============= START SERVER =============
//
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

