import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/Home.css';
import homePic from '../assets/images/home-pic.jpg';

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:1987/login', {
        params: {
          username: user.username,
          password: user.password,
        },
      });
  
      if (response.status === 200 && response.data.user) {
        setMessage('Login successful');
  
        // Store the username in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(user.username)
        navigate('/UserDash');
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error.response || error.message);
      setMessage('Login failed. Please check your credentials.');
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1987/signup', user);
      if (response.status === 200) {
        setMessage('Signup successful');
        setUser({
          username: '',
          email: '',
          password: '',
        });
        toggleForm(); // Switch to login form after successful signup
      }
    } catch (error) {
      console.error(error.message);
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src={homePic} alt="Food Donation" className="image" />
      </div>
      <div className="form-section">
        <div className="form-toggle">
          <button onClick={toggleForm} className={isLogin ? 'inactive' : 'active'}>
            Sign up
          </button>
          <button onClick={toggleForm} className={isLogin ? 'active' : 'inactive'}>
            Login
          </button>
        </div>

        {!isLogin ? (
          <form className="form" onSubmit={handleSignup} method="post">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <input type="password" placeholder="Confirm password" required />
            <button type="submit">Sign up</button>
          </form>
        ) : (
          <form className="form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Home;
