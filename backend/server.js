const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 8003;
const MONGO_URI = "mongodb+srv://priya:priya@cluster0.epuug.mongodb.net/New";
const JWT_SECRET = "fundz";

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5174", "https://fundzz-blush.vercel.app"], // Array of allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true // Allow cookies and authorization headers
}));


// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("fundzs", userSchema);

// Signup Route
// Signup Route
app.post("/signup", async (req, res) => {
  try {
    console.log("Signup request received:", req.body); // Debug log

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log("User created successfully:", newUser); // Debug log
    res.status(201).json({ message: "Signup successful! You can now log in." });

  } catch (error) {
    console.error("Error during signup:", error); // Log full error
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});


// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});