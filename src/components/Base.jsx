import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import '../CSS/Base.css';
import homeIcon from '../assets/svgs/homeIcon.svg';
import search from '../assets/svgs/search.svg';
import message from '../assets/svgs/message.svg';
import foodDonate from '../assets/svgs/foodDonate.svg';
import food3 from '../assets/svgs/food3.svg';
import create from '../assets/svgs/create.svg';
import User from '../assets/svgs/user.svg';
import UserDash from './UserDash';

const Base = ({ children, toggleSection }) => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // State for search modal visibility
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); // State for chat modal visibility
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState(null);

  // Function to handle modal opening
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to handle search modal opening and closing
  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  // Function to handle chat modal opening and closing
  const openChatModal = () => setIsChatModalOpen(true);
  const closeChatModal = () => setIsChatModalOpen(false);

  // Function to handle caption input change
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  // Function to handle media upload
  const handleMediaUpload = (e) => {
    setMedia(URL.createObjectURL(e.target.files[0]));
  };

  // Function to handle post submission
  const handlePost = () => {
    // Logic for handling post submission (e.g., sending data to the server)
    console.log('Caption:', caption);
    console.log('Media:', media);
    closeModal(); // Close the modal after posting
  };

  return (
    <div className="base-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="icons">
          <img src={homeIcon} alt="Home" onClick={() => navigate('/UserDash')} />
          <img src={search} alt="Search" onClick={openSearchModal} />
          <img src={message} alt="Messages" onClick={openChatModal} />
          <img src={foodDonate} alt="Donate" onClick={() => navigate('/Donate')} />
          <img src={food3} alt="Food" onClick={() => navigate('/Request')} />
          {/* Instead of navigating to '/Post', open the modal */}
          <img src={create} alt="Create" onClick={openModal} />
          <img src = {User} alt="user" onClick={()=>navigate('/User')} />
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="main-wrapper">
        {/* Main content area */}
        <div className="main-content">
          {/* Navbar */}
          <div className="navbar">
            <button onClick={() => toggleSection('hunger')} className="nav-btn">
              Hungers
            </button>
            <button onClick={() => toggleSection('offering')} className="nav-btn">
              Offerings
            </button>
            <button onClick={() => navigate('/')} className="logout-btn">
                Logout
              </button>
            <div className="settings-icon">
              ⚙️ 
             
            </div>
          </div>

          {/* Scrollable dynamic content */}
          <div className="scrollable-content">
            {children}
          </div>
        </div>

        {/* Articles section on the right */}
        <div className="articles-section">
          <h2>Articles</h2>
          <p>SLACK TO SURPLUS </p>
        </div>
      </div>

      {/* Modal for Create Post */}
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

      {/* Modal for Search */}
      {isSearchModalOpen && (
        <div className="modal-overlay" onClick={closeSearchModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Search</h2>
            <input type="text" placeholder="Search for something..." className="search-input" />
            <button onClick={closeSearchModal} className="close-button">Close</button>
          </div>
        </div>
      )}

      {/* Modal for Chat */}
      {isChatModalOpen && (
        <div className="modal-overlay" onClick={closeChatModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Chat</h2>
            <div className="chat-container">
              <div className="chat-message">Welcome to the chat!</div>
              <input type="text" placeholder="Type a message..." className="chat-input" />
            </div>
            <button onClick={closeChatModal} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Base;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
// import '../CSS/Base.css';
// import homeIcon from '../assets/svgs/homeIcon.svg';
// import search from '../assets/svgs/search.svg';
// import message from '../assets/svgs/message.svg';
// import foodDonate from '../assets/svgs/foodDonate.svg';
// import food3 from '../assets/svgs/food3.svg';
// import create from '../assets/svgs/create.svg';

// const Base = ({ children, toggleSection }) => {
//   const navigate = useNavigate(); // Initialize the navigate hook

//   return (
//     <div className="base-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="icons">
//           <img src={homeIcon} alt="Home" onClick={() => navigate('/')} />
//           <img src={search} alt="Search" />
//           <img src={message} alt="Messages" />
//           <img src={foodDonate} alt="Donate" onClick={() => navigate('/Donate')} />
//           <img src={food3} alt="Food"  onClick={() => navigate('/Request')}/>
//           <img src={create} alt="Create" onClick={()=> navigate('/Post')} />
//         </div>
//       </div>

//       {/* Main content wrapper */}
//       <div className="main-wrapper">
//         {/* Main content area */}
//         <div className="main-content">
//           {/* Navbar */}
//           <div className="navbar">
//             <button onClick={() => toggleSection('hunger')} className="nav-btn">
//               Hungers
//             </button>
//             <button onClick={() => toggleSection('offering')} className="nav-btn">
//               Offerings
//             </button>
//             <div className="settings-icon">⚙️</div>
//           </div>

//           {/* Scrollable dynamic content */}
//           <div className="scrollable-content">
//             {children}
//           </div>
//         </div>

//         {/* Articles section on the right */}
//         <div className="articles-section">
//           <h2>Articles</h2>
//           <p>Some interesting articles related to food security and waste management.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Base;
