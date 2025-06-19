// Load Environment Variables
const dotenv = require("dotenv");
dotenv.config();

// Import Dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");

// Import Controllers
const authRouter = require("./controllers/auth");
const kidRouter = require("./controllers/kids");
const goalRouter = require("./controllers/goals");
const activityRouter = require("./controllers/activities");

// Initialize App
const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
const corsOptions = {
  origin: [
    'https://lamaslo-kids-prod.netlify.app',
    'http://localhost:3000'
  ],
  // No credentials: true needed since we're using localStorage
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/auth", authRouter);
app.use("/kids", kidRouter);
app.use("/goals", goalRouter);
app.use("/activities", activityRouter);

// Start Server
app.listen(PORT, () => {
  console.log("The express app is ready!");
});
