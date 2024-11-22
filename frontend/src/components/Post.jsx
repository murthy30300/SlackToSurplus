import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Post.css";
import Base from "./Base";

const Post = () => {
  const [post, setPost] = useState({ caption: "", media: null });
  const [message, setMessage] = useState("");
  const storedData = JSON.parse(localStorage.getItem("user"));
  const usid = storedData.user.uid;
  console.log("near first point",usid);
  // Handle input changes
  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "caption") {
      setPost((prev) => ({ ...prev, caption: value }));
    } else if (id === "media" && files.length > 0) {
      setPost((prev) => ({ ...prev, media: files[0] }));
    }
  };

  // Handle form submission
  const handlePost = async (e) => {
    e.preventDefault();
    if (!usid) {
      setMessage("User data is incomplete. Cannot fetch User ID.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", post.caption);
    if (post.media) {
      formData.append("image", post.media);
    }
    formData.append("userId", usid);

    try {
      await axios.post("http://localhost:1987/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Post created successfully!");
      setPost({ caption: "", media: null }); // Reset form after successful post creation
    } catch (error) {
      setMessage(`Failed to create post. Error: ${error.message}`);
    }
  };

  return (
    <Base>
      <h2>Create Post</h2>
      <div className="message">
        {message && <p style={{ color: "red", fontWeight: "bolder" }}>{message}</p>}
      </div>
      <div className="form-container" style={{ backgroundColor: "lightgray" }}>
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
