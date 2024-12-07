import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, MessageCircle, HandCoins, PlusSquare, User as UserIcon, Settings, LogOut, Package } from 'lucide-react';
import axios from 'axios';

const Base = ({ children, toggleSection }) => {
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery to state
  const [searchResults, setSearchResults] = useState([]); // Add searchResults to state
  const articles = [
    {
      title: '10 Shocking Facts About Food Waste',
      description: 'Learn about the global impact of food waste and how we can reduce it.',
      link: '#',
      image: 'https://res.cloudinary.com/dovvc3hvb/image/upload/v1733562245/bphfxqu0kpjdtkfjij1k.jpg'
    },
    {
      title: 'How to Reduce Food Waste at Home',
      description: 'Simple tips to help you cut down on food waste in your daily life.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=100&h=100'
    },
    {
      title: 'The Environmental Cost of Wasted Food',
      description: 'Discover the hidden costs of food waste to the environment.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1488558980948-81db7f6c239c?auto=format&fit=crop&w=100&h=100'
    },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:1987/profile/search?username=${searchQuery}`);
      setSearchResults(response.data ? [response.data] : []); // Ensure results are in an array
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleUserClick = (username) => {
    setIsSearchModalOpen(false);
    navigate(`/User/${username}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-16 bg-white shadow-lg flex flex-col items-center py-6 space-y-8 border-r border-gray-200">
        <Home className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/UserDash')} />
        <Search className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => setIsSearchModalOpen(true)} />
        <MessageCircle className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => setIsChatModalOpen(true)} />
        <HandCoins className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/Donate')} />
        <PlusSquare className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/Post')} />
        <Package className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/Request')} />
        <UserIcon className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate(`/User/${JSON.parse(localStorage.getItem('user')).user.username}`)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-16">
        {/* Navbar */}
        <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex space-x-4">
                <button onClick={() => toggleSection('hunger')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Hungers
                </button>
                <button onClick={() => toggleSection('offering')} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Offerings
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={handleLogout} className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
                <Settings className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <div className="flex-1">{children}</div>
            <div className="hidden lg:block w-80 bg-[#EDE8DC] p-6 rounded-lg shadow-xl border-2 border-black">
              <h2 className="text-xl font-bold text-black mb-6 border-b-2 border-black pb-2">
                Latest Articles
              </h2>
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {articles.map((article, index) => (
                  <div
                    key={index}
                    className="group bg-[#E7CCCC] rounded-lg p-4 border-2 border-black
                      transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex gap-4">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-black group-hover:text-[#A5B68D] transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-black/80 mt-1">{article.description}</p>
                        <a
                          href={article.link}
                          className="text-sm text-black hover:text-[#A5B68D] mt-2 inline-block
                            border-b border-transparent hover:border-[#A5B68D] transition-all duration-300"
                        >
                          Read more →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
         
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-[#F7EFEA] rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-[#4A4A4A] mb-4">Search Users</h2>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full px-4 py-2 border border-[#E7CCCC] rounded-lg"
              />
            </form>
            <div className="mt-4">
              {searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div
                    key={user.username}
                    onClick={() => handleUserClick(user.username)}
                    className="p-2 hover:bg-[#F4D8D8] rounded-lg cursor-pointer"
                  >
                    <span>{user.name || user.username}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No users found.</p>
              )}
            </div>
            <button onClick={() => setIsSearchModalOpen(false)} className="mt-4 bg-[#4C6CE7] text-white py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Base;
