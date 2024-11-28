import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Heart, Clock, AlertCircle, Users, Settings, LogOut,
  Truck, Calculator, BookOpen
} from 'lucide-react';

const ROBase = ({ children }) => {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/ro/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">RO Dashboard</h1>
          </div>
          
          <nav className="flex-1 px-4">
            <div className="space-y-2">
              <button
                onClick={() => navigate('/ro/dashboard')}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </button>
              
              <button
                onClick={() => navigate('/ro/impact')}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Heart className="w-5 h-5 mr-3" />
                Impact Tracker
              </button>
              
              <button
                onClick={() => navigate('/ro/history')}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Clock className="w-5 h-5 mr-3" />
                Request History
              </button>
              
              <button
                onClick={() => navigate('/ro/urgent')}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 mr-3" />
                Urgent Needs
              </button>

              <button
                onClick={() => navigate('/ro/logistics')}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Truck className="w-5 h-5 mr-3" />
                Logistics
              </button>

              <button
                onClick={() => navigate('/ro/distribution')}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Calculator className="w-5 h-5 mr-3" />
                Distribution Plan
              </button>

              <button
                onClick={() => navigate('/ro/stories')}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Success Stories
              </button>
              
              <button
                onClick={() => navigate('/ro/community')}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Users className="w-5 h-5 mr-3" />
                Community
              </button>

              <button
                onClick={() => navigate('/ro/requests')}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Heart className="w-5 h-5 mr-3" />
                Food Requests
              </button>
            </div>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <main className="p-6">{children}</main>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ROBase;