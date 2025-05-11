const express = require("express");
const app = express();
require("dotenv").config(); // Load environment variables at the top
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

// ✅ Ensure environment variables are defined
const PORT = process.env.SITE || 3600;
const DB = process.env.DB;

if (!DB) {
  console.error("❌ Error: Database connection string (DB) is missing in .env file");
  process.exit(1);
}

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.json());

// ✅ CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ MongoDB Connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ Routes
const userRoutes = require("./routes/route");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", userRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
