import React from 'react';

function Navbar({ view, setView }) {
  const navButtons = [
    { key: 'donations', label: 'Available Donations' },
    { key: 'myDonations', label: 'My Donations' },
    { key: 'requests', label: 'My Requests' },
    { key: 'myRequests', label: 'Requests on My Donations' },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#F7EFEA] to-[#F4D8D8] p-4 rounded-xl shadow-lg mb-8">
      <div className="flex flex-wrap gap-4">
        {navButtons.map((button) => (
          <button
            key={button.key}
            onClick={() => setView(button.key)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
              view === button.key
                ? 'bg-[#4C6CE7] text-white shadow-lg'
                : 'bg-[#F7EFEA] text-[#4A4A4A] hover:bg-[#E78F6C] hover:text-white'
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;