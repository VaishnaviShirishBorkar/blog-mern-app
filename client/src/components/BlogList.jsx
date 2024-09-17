import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/blog/getBlogs");
        const data = await res.json(); // Await the parsed JSON response
        setBlogs(data); 
        console.log(data); 
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []); // Run only on component mount

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`); // Navigate to the BlogDetails page with the blog ID
  };

  return (
    <div className="flex flex-col gap-10 justify-center ">
      { blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <div key={index} className="flex shadow-md max-w-3xl gap-5 p-5 cursor-pointer" onClick={() => handleBlogClick(blog._id)}>
          <img className="max-w-sm" src={`http://localhost:3000/images/${blog.file}`} alt={blog.title} />
            <div className="">
              <h1 className="text-2xl font-semibold">{blog.title}</h1>
              <h3>{blog.summary}</h3>
            </div>
          </div>
        ))
      ) : (
        <p>No blogs available</p> // Fallback if no blogs
      )}
    </div>
  );
};

export default BlogList;
