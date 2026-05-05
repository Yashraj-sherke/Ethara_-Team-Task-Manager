const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server running on port ${PORT} (DB failed)`);
  });
});
