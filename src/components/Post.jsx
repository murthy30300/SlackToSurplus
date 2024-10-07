import React, { useState } from 'react';
import '../CSS/Post.css'; // CSS file for styling the modal
import Base from './Base';
const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleMediaUpload = (e) => {
    setMedia(URL.createObjectURL(e.target.files[0]));
  };

  const handlePost = () => {
    // Logic to handle post submission
    console.log('Caption:', caption);
    console.log('Media:', media);
    closeModal(); // Close modal after posting
  };

  return (
    <Base>
    <div className="create-post-container">
      <button className="create-post-icon" onClick={openModal}>
        {/* Icon for Create Post, can replace with an actual icon */}
        <span>✏️</span> Create Post
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create a New Post</h2>
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={handleCaptionChange}
              className="caption-input"
            />
            <div className="media-upload">
              <label htmlFor="media-upload-input">
                <span role="img" aria-label="media">📷</span> Upload Media
              </label>
              <input
                id="media-upload-input"
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
              />
            </div>
            {media && <img src={media} alt="Uploaded media preview" className="media-preview" />}
            <button className="post-button" onClick={handlePost}>Post</button>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
    </Base>
  );
};

export default Post;
