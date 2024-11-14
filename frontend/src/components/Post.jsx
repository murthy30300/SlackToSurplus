import React, { useState, useEffect } from 'react';  // Import useEffect here
import axios from 'axios';
import '../CSS/Post.css';
import Base from './Base';

const Post = () => {
  const [post, setPost] = useState({ caption: '', media: null });
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const fetchUserId = async (username) => {
    try {
      const response = await axios.get(`http://localhost:1987/getUserIdByUsername?username=${username}`);
      setUserId(response.data);  
    } catch (error) {
      setMessage('User is not logged in or not found.');
    }
  };
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    console.log('userData')
    if (userData && userData.username) {
      fetchUserId(userData.username);  
    }
  }, []); 

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'caption') {
      setPost((prev) => ({ ...prev, caption: value }));
    } else if (id === 'media' && files.length > 0) {
      setPost((prev) => ({ ...prev, media: files[0] }));
    }
  };
  const handlePost = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage('User is not logged in.');
      return;
    }
    const formData = new FormData();
    formData.append('caption', post.caption);
    if (post.media) {
      formData.append('image', post.media);
    }
    formData.append('userId', userId);
    try {
      await axios.post('http://localhost:1987/posts/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Post created successfully!');
      setPost({ caption: '', media: null }); // Reset form after successful post creation
    } catch (error) {
      setMessage(`Failed to create post. Error: ${error.message}`);
    }
  };

  return (
    <Base>
      <h2>Create Post</h2>
      <div className="message">
        {message && <p style={{ color: 'red', fontWeight: 'bolder' }}>{message}</p>}
      </div>
      <div className="form-container" style={{ backgroundColor: 'lightgray' }}>
        <form onSubmit={handlePost} method="post">
          <label>Enter Caption</label>
          <textarea
            id="caption"
            value={post.caption}
            onChange={handleChange}
            required
            placeholder="Write a caption..."
          />

          <label>Upload Media</label>
          <input
            type="file"
            id="media"
            accept="image/*,video/*"
            onChange={handleChange}
          />

          {post.media && (
            <div className="media-preview">
              <img
                src={URL.createObjectURL(post.media)}
                alt="Uploaded media preview"
                className="media-preview-img"
              />
            </div>
          )}

          <button type="submit">Create Post</button>
        </form>
      </div>
    </Base>
  );
};

export default Post;
