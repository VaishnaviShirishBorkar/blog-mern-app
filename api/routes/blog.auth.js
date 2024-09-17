import express from 'express';
import multer from 'multer';
import path from 'path';
import { createBlog,getBlogById,getBlogs } from '../controllers/blog.controller.js'; // Adjust the path if necessary

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use path.join for cross-platform compatibility
    cb(null, path.join('routes', '../images')); // Directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    // Use the original file name to avoid conflicts
    cb(null, Date.now() + path.extname(file.originalname)); // Append a timestamp and original extension
  }
});

const upload = multer({ storage: storage });

// Define routes
router.post('/create-blog', upload.single('file'), createBlog);
router.get('/getblogs',getBlogs);
router.get('/:id',getBlogById);

export default router;
