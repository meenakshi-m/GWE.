const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware to handle CORS with specific origin
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL if different
}));

// Middleware to parse JSON
app.use(express.json({ extended: false }));

// Connect Database
connectDB();

// Check if the uploads directory exists, if not create it
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Define Routes
const grievanceRoutes = require('./routes/grievances');
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');

app.use('/api/auth', authRoutes);
app.use('/api/grievances', grievanceRoutes); // Ensure this route is correctly set up
app.use('/api/search', searchRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
