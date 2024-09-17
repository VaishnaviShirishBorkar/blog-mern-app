import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/blog/${id}`); // Fetch blog by ID
        const data = await res.json();
        setBlog(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [id]); // Fetch blog whenever the ID changes

  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      {blog ? (
        <div className="bg-white rounded-lg shadow-lg p-5 max-w-4xl w-full">
          {/* Blog Title */}
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{blog.title}</h1>
          
          {/* Blog Image */}
          <img 
            className="w-full h-64 object-cover rounded-md mb-6" 
            src={`http://localhost:3000/images/${blog.file}`} 
            alt={blog.title} 
          />

          {/* Blog Summary */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4">{blog.summary}</h3>

          {/* Blog Contentv */} 
          <div
            className="prose prose-lg text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default BlogDetails;
