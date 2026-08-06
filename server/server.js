const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

// Routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const photographerRoutes = require("./routes/photographerRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const packageRoutes = require("./routes/packageRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static frontend build if it exists (production)
const clientDist = path.join(__dirname, "..", "client", "dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
}

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/photographers", photographerRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);

// Health check (API)
if (clientDist) {
  app.get("/api/health", (req, res) => {
    res.json({ message: "Meenakshi Studio API is running 🚀" });
  });

  // SPA fallback: serve index.html for any non-API route (client-side routing)
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Meenakshi Studio API is running 🚀" });
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
