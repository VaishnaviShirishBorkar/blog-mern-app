import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='container flex items-center justify-between w-full p-1 bg-white shadow-md'>
        <h1 className='font-bold text-2xl text-gray-800'>Blogs</h1>
        {/* Navigation Links */}
        <nav className='flex items-center gap-8 text-gray-700 font-semibold'>
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/create-blog" className="hover:text-blue-600">Blog</Link>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 rounded-md text-white px-6 py-2">Login</Link>
        </nav>
    </header>
  );
}

export default Navbar;
