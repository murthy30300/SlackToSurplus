import React, { useState, useEffect } from 'react';
import Base from './Base';
import '../CSS/User.css';
import DP from '../assets/images/DP.jpg';
import hunger from '../assets/images/hunger.jpg';

const UserDash = () => {
  const [currentSection, setCurrentSection] = useState('hunger');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUsername(userData.username || 'Guest');
    } else {
      setUsername('Guest');
    }
  }, []);
  

  const posts = [
    { id: 1, username: 'Sathwik Reddy', text: "Hunger allows no Choice 😢", image: hunger, request: 'Need food for 5 people' },
  ];

  const toggleSection = (section) => {
    setCurrentSection(section);
  };

  return (
    <Base toggleSection={toggleSection}>
      <div className="user-header">
        <h2>Welcome, {username}</h2>
      </div>
      
      {currentSection === 'hunger' ? (
        <div className="posts-section scrollable">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <img src={DP} alt="Profile" className="profile-pic" />
                <div className="post-details">
                  <h3>{post.username}</h3>
                  <p>{post.text}</p>
                </div>
              </div>
              <img src={post.image} alt="Hunger Post" className="post-image" />
              <p className="post-request">{post.request}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="offerings-section scrollable">
          <h2>Offerings</h2>
          <p>Offering 1: Surplus food available for donation.</p>
          <p>Offering 2: Food donation for 10 people.</p>
        </div>
      )}
    </Base>
  );
};

export default UserDash;
