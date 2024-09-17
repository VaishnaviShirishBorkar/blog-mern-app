import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logging formData to check if it's storing values correctly
    console.log(formData);

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),  // Send formData to backend
      });

      const data = await res.json();
      if (res.ok) {
        console.log('Registered!');
        alert('Register successful!'); // Success message
        navigate('/login'); // Redirect on success
      } else {
        throw new Error(data.message || 'Login failed!'); 
      }

    } catch (error) {
      console.log(error);
      alert('Not Registered! Enter correct Details!');
    }
  }

  return (
    <div className='flex items-center justify-center my-20'>
      <div className='flex flex-col p-8 rounded-lg shadow-lg gap-5 max-w-sm w-full items-center justify-center'>
        <h1 className='text-2xl font-bold'>Register</h1>
        
        {/* Make sure each input has the correct id for state updates */}
        <input onChange={handleChange} id="username" className='w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500' type="text" placeholder='Enter your Username' />
        <input onChange={handleChange} id="email" className='w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500' type="text" placeholder='Enter your Email' />
        <input onChange={handleChange} id="password" className='w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500' type="password" placeholder='Enter your Password' />
        
        <button onClick={handleSubmit} className='bg-blue-600 rounded-md text-white px-7 py-2' type='submit'>Register</button>
        <span>Logged In? <Link className='text-blue-600' to="/login">Login</Link></span>
      </div>
    </div>
  )
}

export default Register;
