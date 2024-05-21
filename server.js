const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/api/userRoutes')); // Ensure this path is correct
app.use('/api/thoughts', require('./routes/api/thoughtRoutes')); // Ensure this path is correct

// Connect to MongoDB and start server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Error handling for MongoDB connection
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});