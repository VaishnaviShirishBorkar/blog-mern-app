import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.user.js';
import blogRouter from './routes/blog.auth.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connecting to MongoDB with timeout options
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
})
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.log('MongoDB connection error:', error));

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());

// Serve static files from the "images" folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
