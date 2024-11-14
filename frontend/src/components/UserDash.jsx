import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Base from './Base';
import '../CSS/User.css';
import DP from '../assets/images/DP.jpg'; // Default profile picture

const API_BASE_URL = 'http://localhost:1987';

const UserDash = () => {
  const [currentSection, setCurrentSection] = useState('hunger');
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, { withCredentials: true });
        setUsername(response.data.name || 'Guest');
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
    fetchPosts();
  }, []);

  // Function to fetch posts from the backend without profileId
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/posts/home`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setCurrentSection(section);
  };

  return (
    <Base toggleSection={toggleSection}>
      <div className="user-header">
        <h2>Welcome, {username}</h2>
      </div>
      
      {loading ? (
        <div>Loading posts...</div> // Display loading message
      ) : (
        currentSection === 'hunger' ? (
          <div className="posts-section scrollable">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} style={{ border: '1px solid #ccc', padding: '16px', marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <img
                      src={post.profilePicUrl || DP}
                      alt="User Profile"
                      width="50"
                      height="50"
                      style={{ borderRadius: '50%', marginRight: '10px' }}
                    />
                    <p><strong>{post.username}</strong></p>
                  </div>
                  <h2>Post Details</h2>
                  <p><strong>ID:</strong> {post.id}</p>
                  <p><strong>Caption:</strong> {post.caption}</p>
                  <p><strong>Image:</strong> <img src={post.imageUrl} alt="Post" width="200" /></p>
                  <p><strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleString()}</p>
                  <p><strong>Like Count:</strong> {post.likeCount}</p>
                  <p><strong>Active:</strong> {post.active ? "Yes" : "No"}</p>
                </div>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        ) : (
          <div className="offerings-section scrollable">
            <h2>Offerings</h2>
            <p>Offering 1: Surplus food available for donation.</p>
            <p>Offering 2: Food donation for 10 people.</p>
          </div>
        )
      )}
    </Base>
  );
};

export default UserDash;
