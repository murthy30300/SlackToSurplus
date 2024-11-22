import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Profile.css";
import profilePic from "../assets/images/DP.jpg";
import backgroundBanner from "../assets/images/banner.jpg";
import Base from "./Base";

const User = () => {
  const storedData = JSON.parse(localStorage.getItem("user"));
  console.log('in first User',storedData.user.uid);
  const [profileData, setProfileData] = useState({
    name: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    profilePicUrl: profilePic,
    bannerPicUrl: backgroundBanner,
    badge: "",
    totalDonations: 0,
    totalReceived: 0,
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [bannerPicFile, setBannerPicFile] = useState(null);
  const [posts, setPosts] = useState([]);

  const loadUserPosts = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:1987/posts/user/${userId}`
      );
      console.log("Fetched posts:", response.data);
      setPosts(response.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const userData = storedUser;
      const userId = userData.uid;
      loadUserPosts(userId);
    } else {
      console.log("No user logged in.");
    }
  }, []);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
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

  const handleSubmit = async (e) => {
  
    const userId = storedData.user.uid;
    console.log('handle submit',userId)
    if(userId){
    console.log('in handle submit',userId);
    }
    else{
      console.log('in handle submit uid not found')
    }
    
    e.preventDefault();
    const formData = new FormData();
    formData.append("uid", userId); // Update to dynamically fetch uid if needed
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
      await axios.post("http://localhost:1987/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <Base>
      <h2>User Profile</h2>
      <div className="user-profile-container">
        <div className="banner-image">
          <img
            src={profileData.bannerPicUrl}
            alt="Banner"
            className="banner-img"
          />
        </div>
        <div className="profile-section">
          <div className="profile-pic-container">
            <img
              src={profileData.profilePicUrl}
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <div className="user-details">
            <h2>{localStorage.getItem("user").username}</h2>
          </div>
          <button className="edit-btn" onClick={handleEditClick}>
            Edit
          </button>
        </div>

        {/* Display User Posts */}
        <div className="user-posts">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.caption}</h3>
                {post.imageUrl && (
                  <img src={post.imageUrl} alt="Post" width="200" />
                )}
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>

        {/* Edit Profile Modal */}

        <div className="modal">
          <form className="modal-content" onSubmit={handleSubmit}>
            <h3>Edit Profile</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={profileData.name}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={profileData.dateOfBirth}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={profileData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={profileData.address}
              onChange={handleChange}
            />
            <input type="file" name="profilePic" onChange={handleImageChange} />
            <input type="file" name="bannerPic" onChange={handleImageChange} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default User;
