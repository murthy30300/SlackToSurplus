// Import necessary dependencies
import React from 'react';
import Base from './Base';  // Assuming base.jsx is located in the same folder
import Map from '../assets/images/map.jpg'
const Donate = () => {
  return (
    <Base>
      {/* Main container for the food sharing UI */}
      <div className="share-food-container" style={{ display: 'flex' }}>
        {/* Left Side - Form for Individual/Bulk food sharing */}
        <div className="food-sharing-form" style={{ flex: '1', padding: '20px' }}>
          <h2>Want to share food?</h2>
          <div>
            <button className="btn-individual" style={buttonStyle}>Individual</button>
            <button className="btn-bulk" style={buttonStyle}>Bulk</button>
          </div>
          <div className="location-search">
            <input
              type="text"
              placeholder="Search Location"
              style={{
                marginTop: '20px',
                padding: '10px',
                width: '100%',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        </div>

        {/* Right Side - Displaying the Map */}
        <div className="food-map" style={{ flex: '1', padding: '20px' }}>
          <img
            src={Map}
            alt="Map"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>
      </div>
    </Base>
  );
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  backgroundColor: '#f5c6c6',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

// Export the component
export default Donate;
