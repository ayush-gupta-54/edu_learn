// server.js
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ Gemini SDK

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());
app.use(cors());

// ============= MongoDB Setup =============
mongoose
  .connect("mongodb://127.0.0.1:27017/edustudy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ============= Schemas =============
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  name: String,
  cgpa: Number,
  projects: [String],
  hobbies: [String],
  internships: [String],
  aspirations: String,
  codingLanguages: [String],
  skills: [String],
});
const Student = mongoose.model("Student", studentSchema);

// ============= AUTH ROUTES =============
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully", userId: newUser._id, name: name });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.json({ message: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// ============= PROFILE ROUTES =============
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
    skills,
  } = req.body;

  try {
    let student = await Student.findOne({ userId });
    if (student) {
      student.name = name || student.name;
      student.cgpa = cgpa || student.cgpa;
      student.projects = projects || student.projects;
      student.hobbies = hobbies || student.hobbies;
      student.internships = internships || student.internships;
      student.aspirations = aspirations || student.aspirations;
      student.codingLanguages = codingLanguages || student.codingLanguages;
      student.skills = skills || student.skills;
    } else {
      student = new Student({
        userId,
        name,
        cgpa,
        projects,
        hobbies,
        internships,
        aspirations,
        codingLanguages,
        skills,
      });
    }
    await student.save();
    res.json({ message: "Profile saved successfully", student });
  } catch (err) {
    res.status(500).json({ message: "Error saving profile" });
  }
});

app.get("/student/:userId", async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) return res.status(404).json({ message: "Profile not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// ============= ROADMAP ROUTE (Gemini AI) =============
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/roadmap/:userId", async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) return res.status(404).json({ message: "Profile not found" });

    const prompt = `
      Create a personalized learning roadmap for the following student:
      - Name: ${student.name}
      - CGPA: ${student.cgpa}
      - Projects: ${student.projects.join(", ")}
      - Internships: ${student.internships.join(", ")}
      - Hobbies: ${student.hobbies.join(", ")}
      - Coding Languages: ${student.codingLanguages.join(", ")}
      - Skills: ${student.skills.join(", ")}
      - Career Aspiration: ${student.aspirations}

      Please ONLY return valid JSON in this format:
      {
        "shortTerm": ["step1", "step2"],
        "midTerm": ["step1", "step2"],
        "longTerm": ["step1", "step2"]
      }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Try to extract JSON safely
    const match = text.match(/\{[\s\S]*\}/);
    let roadmap;
    if (match) {
      roadmap = JSON.parse(match[0]); // ✅ parse only the JSON block
    } else {
      roadmap = { shortTerm: [], midTerm: [], longTerm: [], rawResponse: text };
    }

    res.json(roadmap);
  } catch (err) {
    console.error("Roadmap error:", err);
    res.status(500).json({ message: "Error generating roadmap" });
  }
});

// ============= START SERVER =============
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
