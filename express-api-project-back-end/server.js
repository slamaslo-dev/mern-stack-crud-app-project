// Load Environment Variables
const dotenv = require('dotenv');
dotenv.config();

// Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

// Import Controllers
const authRouter = require('./controllers/auth.js');
const kidRouter = require('./controllers/kids.js');
const goalRouter = require('./controllers/goals.js');
const activityRouter = require('./controllers/activities.js');

// Initialize App
const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/auth', authRouter);
app.use('/kids', kidRouter);
app.use('/goals', goalRouter);
app.use('/activities', activityRouter);

// Start Server
app.listen(PORT, () => {
  console.log('The express app is ready!');
});
