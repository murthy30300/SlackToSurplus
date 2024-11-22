import React from 'react';

function Navbar({ view, setView }) {
  const navButtons = [
    { key: 'donations', label: 'Available Donations' },
    { key: 'myDonations', label: 'My Donations' },
    { key: 'requests', label: 'My Requests' },
    { key: 'myRequests', label: 'Requests on My Donations' },
  ];

  return (
    <nav style={styles.navbar}>
      {navButtons.map((button) => (
        <button
          key={button.key}
          onClick={() => setView(button.key)}
          style={
            view === button.key
              ? { ...styles.navButton, ...styles.activeButton }
              : styles.navButton
          }
        >
          {button.label}
        </button>
      ))}
    </nav>
  );
}

const styles = {
  navbar: { display: 'flex', gap: '10px', marginBottom: '20px' },
  navButton: { padding: '10px', cursor: 'pointer', border: '1px solid #ccc' },
  activeButton: { backgroundColor: '#007BFF', color: '#fff' },
};

export default Navbar;
