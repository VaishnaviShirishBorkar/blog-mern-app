import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
  },

  summary: {
    type: String,
  },

  content: {
    type: String,
  },

  file: {
    type: String, // Store the path of the uploaded file (image)
  }

});

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;
