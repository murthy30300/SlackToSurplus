import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Profile.css';
import profilePic from '../assets/images/DP.jpg';
import backgroundBanner from '../assets/images/banner.jpg';
import Base from './Base';

const User = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    profilePicUrl: profilePic,
    bannerPicUrl: backgroundBanner,
    badge: '',
    totalDonations: 0,
    totalReceived: 0,
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [bannerPicFile, setBannerPicFile] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUsername(userData.username || 'Guest');
    } else {
      setUsername('Guest');
    }
  }, []);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "profilePic") {
      setProfilePicFile(files[0]);
    } else if (name === "bannerPic") {
      setBannerPicFile(files[0]);
    }
  };

  const [postk, setPostk] = useState([]);
  const handleDumb = async () => {
    try {
      const response = await axios.get('http://localhost:1987/posts', {
        params: { profileId: 3 },
      });
      console.log("Fetched data:", response.data);
      setPostk(response.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPostk([]);  // Updated to correct the error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uid", 2);  // Update to dynamically fetch uid if needed
    formData.append("name", profileData.name);
    formData.append("dateOfBirth", profileData.dateOfBirth);
    formData.append("phone", profileData.phone);
    formData.append("address", profileData.address);
    formData.append("badge", profileData.badge);

    if (profilePicFile) {
      formData.append("profilePic", profilePicFile);
    }
    if (bannerPicFile) {
      formData.append("bannerPic", bannerPicFile);
    }

    try {
      await axios.post('http://localhost:1987/posts/update', formData, {  // Updated endpoint
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully!');
      setIsEditModalOpen(false);
      // Optionally reload profile data here to reflect updated picture URLs
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <Base>
      <button onClick={handleDumb}>Load Post Details</button>
      
      {postk.length > 0 ? (
        postk.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '16px', marginTop: '16px' }}>
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

      <div className="user-profile-container">
        <div className="banner-image">
          <img src={profileData.bannerPicUrl} alt="Banner" className="banner-img" />
        </div>
        <div className="profile-section">
          <div className="profile-pic-container">
            <img src={profileData.profilePicUrl} alt="Profile" className="profile-pic" />
          </div>
          <div className="user-details">
            <h2>{profileData.name || 'User'}</h2>
            <p className="username">{username}</p>
          </div>
          <button className="edit-btn" onClick={handleEditClick}>Edit</button>
        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="modal">
            <form className="modal-content" onSubmit={handleSubmit}>
              <h3>Edit Profile</h3>
              <input type="text" name="name" placeholder="Name" value={profileData.name} onChange={handleChange} />
              <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={profileData.dateOfBirth} onChange={handleChange} />
              <input type="text" name="phone" placeholder="Phone" value={profileData.phone} onChange={handleChange} />
              <input type="text" name="address" placeholder="Address" value={profileData.address} onChange={handleChange} />
              <input type="file" name="profilePic" onChange={handleImageChange} />
              <input type="file" name="bannerPic" onChange={handleImageChange} />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </Base>
  );
};

export default User;
