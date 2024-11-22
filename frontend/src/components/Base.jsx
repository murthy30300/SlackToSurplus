import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, MessageCircle, Heart, PlusSquare, User as UserIcon, Settings, LogOut, Package } from 'lucide-react';

const Base = ({ children, toggleSection }) => {
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-16 bg-white shadow-lg flex flex-col items-center py-6 space-y-8 border-r border-gray-200">
        <Home className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/UserDash')} />
        <Search className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => setIsSearchModalOpen(true)} />
        <MessageCircle className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => setIsChatModalOpen(true)} />
        <Heart className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/Donate')} />
        <PlusSquare className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/Post')} />
        <Package className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/Request')} /> 
        <UserIcon className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={() => navigate('/User')} />
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
            <div className="flex-1">
              {children}
            </div>
            <div className="hidden lg:block w-80 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Articles</h2>
              <p className="text-gray-600">SLACK TO SURPLUS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">Search</h2>
            <input type="text" placeholder="Search..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <button onClick={() => setIsSearchModalOpen(false)} className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}

      {isChatModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">Messages</h2>
            <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4">
              <div className="text-gray-600">Welcome to your messages!</div>
            </div>
            <input type="text" placeholder="Type a message..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <button onClick={() => setIsChatModalOpen(false)} className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Base;