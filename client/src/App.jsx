import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/blog/:id' element={<BlogDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
