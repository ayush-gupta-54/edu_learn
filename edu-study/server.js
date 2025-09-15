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
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.json({
      message: "User registered successfully",
      userId: newUser._id,
      name: name,
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

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

// ============= GEMINI AI SETUP =============
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ============= ROADMAP ROUTE (Gemini AI) =============
app.get("/roadmap/:userId", async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) return res.status(404).json({ message: "Profile not found" });

    const prompt = `
      You are an expert career and learning advisor. Create a highly personalized learning roadmap
      for this student, based entirely on their profile. Each step must be actionable, unique,
      and directly relevant to the student’s goals, strengths, and experience. 

      Student Profile:
      - Name: ${student.name}
      - CGPA: ${student.cgpa}
      - Projects: ${student.projects.join(", ") || "None"}
      - Internships: ${student.internships.join(", ") || "None"}
      - Hobbies: ${student.hobbies.join(", ") || "None"}
      - Coding Languages: ${student.codingLanguages.join(", ") || "None"}
      - Skills: ${student.skills.join(", ") || "None"}
      - Career Aspiration: ${student.aspirations || "Not specified"}

      Guidelines:
      1. Short-term (0–6 months): actionable skill/project steps.
      2. Mid-term (6–18 months): internships, projects, skill growth.
      3. Long-term (18+ months): career placement, specialization, mastery.
      Respond ONLY with valid JSON in this format:

      {
        "shortTerm": ["step1", "step2"],
        "midTerm": ["step1", "step2"],
        "longTerm": ["step1", "step2"]
      }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const match = text.match(/\{[\s\S]*\}/);
    let roadmap;
    if (match) roadmap = JSON.parse(match[0]);
    else roadmap = { shortTerm: [], midTerm: [], longTerm: [], rawResponse: text };

    res.json(roadmap);
  } catch (err) {
    console.error("Roadmap error:", err);
    res.status(500).json({ message: "Error generating roadmap" });
  }
});

// ============= ANALYSIS ROUTE (Gemini AI) ============= 
app.get("/analysis/:userId", async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student)
      return res.status(404).json({ message: "Profile not found" });

    const prompt = `
      Analyze the student profile for closeness to their aspiration and soft skills.
      Aspiration: ${student.aspirations}
      CGPA: ${student.cgpa}
      Projects: ${student.projects.join(", ")}
      Internships: ${student.internships.join(", ")}
      Hobbies: ${student.hobbies.join(", ")}
      Coding Languages: ${student.codingLanguages.join(", ")}
      Skills: ${student.skills.join(", ")}

      Return valid JSON ONLY:
      {
        "closenessScore": 0-100,
        "creativity": 0-100,
        "confidence": 0-100,
        "logicalThinking": 0-100,
        "strengths": ["..."],
        "gaps": ["..."],
        "recommendations": ["..."]
      }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const match = text.match(/\{[\s\S]*\}/);
    let analysis;
    if (match) {
      analysis = JSON.parse(match[0]);
    } else {
      analysis = {
        closenessScore: 0,
        creativity: 0,
        confidence: 0,
        logicalThinking: 0,
        strengths: [],
        gaps: [],
        recommendations: [],
        rawResponse: text,
      };
    }

    // First chart (progress donut)
    const chartData = [
      { metric: "Progress", score: analysis.closenessScore },
      { metric: "Remaining", score: 100 - analysis.closenessScore },
    ];

    // Second chart (bar skills)
    const skillsData = [
      { skill: "Creativity", score: analysis.creativity },
      { skill: "Confidence", score: analysis.confidence },
      { skill: "Logical Thinking", score: analysis.logicalThinking },
    ];

    res.json({
      closenessScore: analysis.closenessScore,
      creativity: analysis.creativity,
      confidence: analysis.confidence,
      logicalThinking: analysis.logicalThinking,
      strengths: analysis.strengths,
      gaps: analysis.gaps,
      recommendations: analysis.recommendations,
      chartData,   // For donut chart
      skillsData,  // For bar chart
    });
  } catch (err) {
    console.error("Analysis error:", err);
    res.status(500).json({ message: "Error generating analysis" });
  }
});

// ============= START SERVER =============
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);