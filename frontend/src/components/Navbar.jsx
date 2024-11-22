import React from 'react';

function Navbar({ view, setView }) {
  const navButtons = [
    { key: 'donations', label: 'Available Donations' },
    { key: 'myDonations', label: 'My Donations' },
    { key: 'requests', label: 'My Requests' },
    { key: 'myRequests', label: 'Requests on My Donations' },
  ];

  return (
    <nav className="flex space-x-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
      {navButtons.map((button) => (
        <button
          key={button.key}
          onClick={() => setView(button.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors
            ${view === button.key
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'}`}
        >
          {button.label}
        </button>
      ))}
    </nav>
  );
}

export default Navbar;