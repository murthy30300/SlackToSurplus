import React from 'react'; 
import '../CSS/Request.css'; // Ensure this CSS file is updated with new styles
import Food from '../assets/images/food.jpg';
import Base from './Base';

const Request = () => {
  // Example post data
  const posts = [
    {
      id: 1,
      profilePic: 'https://via.placeholder.com/50',
      username: 'John Doe',
      caption: 'Donated freshly cooked meals!',
    },
    {
      id: 2,
      profilePic: 'https://via.placeholder.com/50',
      username: 'Jane Smith',
      caption: 'Providing food for 20 people.',
    },
    {
      id: 3,
      profilePic: 'https://via.placeholder.com/50',
      username: 'Chef Mike',
      caption: 'Made a delicious meal for everyone!',
    },
  ];

  return (
    <Base>
      <div className="request-container">
        {/* Main content area */}
        <div className="request-content">
          {/* Image and details */}
          <div className="food-details">
            <img src={Food} alt="Food" className="food-image" />
            <div className="food-info">
              <p>For 15 people</p>
              <p>Rice, curry, sambar</p>
              <p>Freshly made</p>
            </div>
          </div>
          <div className="posts-container">
            {posts.map(post => (
              <div key={post.id} className="post">
                <div className="post-header">
                  <img src={post.profilePic} alt="Profile" className="profile-pic" />
                  <p className="username">{post.username}</p>
                </div>
                <p className="caption">{post.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Request;
