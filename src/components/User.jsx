import React from 'react';
import '../CSS/Profile.css'; // Assuming you have a CSS file to style this component
import profilePic from '../assets/images/DP.jpg'; // Example profile image
import backgroundBanner from '../assets/images/banner.jpg'; // Example banner image
import Base from './Base';
const User = () => {
  return (
    <Base>
    <div className="user-profile-container">
      {/* Banner Image */}
      <div className="banner-image">
        <img src={backgroundBanner} alt="Banner" className="banner-img" />
      </div>
      
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-pic-container">
          <img src={profilePic} alt="Profile" className="profile-pic" />
        </div>
        <div className="user-details">
          <h2>Sathwik Reddy</h2>
          <p className="username">@sathwik@13</p>
        </div>
        <button className="edit-btn">Edit</button>
      </div>

      {/* User Stats */}
      <div className="user-stats">
        <div className="stat-item">
          <p>Donations</p>
        </div>
        <div className="stat-item">
          <p>Received</p>
        </div>
        <div className="stat-item">
          <p>Points</p>
        </div>
      </div>

      {/* Actions */}
      <div className="user-actions">
        <div className="action-item">
          <button>Post</button>
        </div>
        <div className="action-item">
          <button>Request</button>
        </div>
        <div className="action-item">
          <button>Donation</button>
        </div>
        <div className="action-item">
          <button>Feedback</button>
        </div>
      </div>
    </div>
    </Base>
  );
};

export default User;
