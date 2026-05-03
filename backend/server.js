require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 🌍 Allowed Frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https://fundzz-4lpt.vercel.app/"  // Change this to your deployed frontend URL
];

// 🛡️ Security Middleware
app.use(helmet());

// ✅ Corrected CORS Middleware
app.use(
  cors()
);

app.use(express.json());

// ✅ Serve Favicon (Fix for Missing Favicon Crash)
const faviconPath = path.join(__dirname, 'public', 'favicon.ico');
if (require('fs').existsSync(faviconPath)) {
  app.use(favicon(faviconPath));
} else {
  console.warn("⚠️ Favicon not found at", faviconPath);
}

// 🚀 Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 🔄 Routes
const campaignRoutes = require('./routes/campaignRoutes');
const authRoutes = require('./routes/authRoutes');

app.use("/", campaignRoutes);
app.use("/", authRoutes);

// 🌍 Health Check Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// 🎯 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
