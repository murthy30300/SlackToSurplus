import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation
import '../CSS/Home.css';
import homePic from '../assets/images/home-pic.jpg';

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here, then navigate to userDashboard
    navigate('/UserDash');
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
          <form className="form">
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <form className="form" onSubmit={handleLogin}>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;
