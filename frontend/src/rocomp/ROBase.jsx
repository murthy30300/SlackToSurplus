import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Heart, Clock, AlertCircle, Users, Settings, LogOut,
  Truck, Calculator, BookOpen, ChevronLeft, ChevronRight, Menu, Columns4
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import CONFIG from ".././config"
const ROBase = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/ro/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/ro/impact', icon: Heart, label: 'Impact Tracker' },
    { path: '/ro/history', icon: Clock, label: 'Request History' },
    { path: '/ro/urgent', icon: AlertCircle, label: 'Urgent Needs' },
    // { path: '/ro/logistics', icon: Truck, label: 'Logistics' },
    { path: '/ro/distribution', icon: Calculator, label: 'Distribution Plan' },
    { path: '/ro/stories', icon: BookOpen, label: 'Success Stories' },
    { path: '/ro/community', icon: Users, label: 'Organization' },
    { path: '/ro/story', icon: Columns4, label: 'View Stories' }
   

  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const sidebarVariants = {
    expanded: { width: '16rem' },
    collapsed: { width: '4rem' }
  };

  const mobileMenuVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  return (
    <div className="flex min-h-screen bg-[#F7EFEA]">
      <Toaster position="top-right" />
      
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#4C6CE7] text-white rounded-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar - Desktop */}
      <motion.div
        className="hidden lg:flex fixed top-0 left-0 h-full bg-white shadow-lg border-r border-[#E7CCCC] flex-col"
        variants={sidebarVariants}
        animate={isSidebarCollapsed ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 flex items-center justify-between border-b border-[#E7CCCC]">
          {!isSidebarCollapsed && (
            <h1 className="text-xl font-bold text-[#4A4A4A]">RO Dashboard</h1>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 hover:bg-[#F4D8D8] rounded-lg transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </motion.button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.button
                key={item.path}
                whileHover={{ x: 4 }}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-4 py-3 mb-2 transition-colors ${
                  isActive
                    ? 'bg-[#4C6CE7] text-white'
                    : 'text-[#4A4A4A] hover:bg-[#F4D8D8]'
                } ${isActive ? 'rounded-r-lg' : 'rounded-lg'}`}
              >
                <Icon className={`w-5 h-5 ${!isSidebarCollapsed && 'mr-3'}`} />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </motion.button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E7CCCC]">
          <div className="flex flex-col space-y-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center px-4 py-2 text-[#4A4A4A] hover:bg-[#F4D8D8] rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              {!isSidebarCollapsed && <span className="ml-3">Settings</span>}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-[#D32E28] hover:bg-[#F4D8D8] rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {!isSidebarCollapsed && <span className="ml-3">Logout</span>}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-[#E7CCCC]">
                <h1 className="text-xl font-bold text-[#4A4A4A]">RO Dashboard</h1>
              </div>

              <nav className="flex-1 overflow-y-auto py-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 mb-2 transition-colors ${
                        isActive
                          ? 'bg-[#4C6CE7] text-white'
                          : 'text-[#4A4A4A] hover:bg-[#F4D8D8]'
                      } rounded-lg`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-[#E7CCCC]">
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="flex items-center px-4 py-2 text-[#4A4A4A] hover:bg-[#F4D8D8] rounded-lg transition-colors"
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-[#D32E28] hover:bg-[#F4D8D8] rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300`}>
        <main className="p-6">{children}</main>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsSettingsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md m-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#4A4A4A]">Settings</h2>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-[#4A4A4A] hover:text-[#D32E28] transition-colors"
                >
                  <Settings className="w-6 h-6" />
                </button>
              </div>

              {/* Settings Content */}
              <div className="space-y-4">
                <div className="p-4 bg-[#F7EFEA] rounded-lg">
                  <h3 className="font-medium text-[#4A4A4A] mb-2">Notifications</h3>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-[#4C6CE7]" />
                    <span className="text-sm text-[#4A4A4A]">Enable Push Notifications</span>
                  </label>
                </div>

                <div className="p-4 bg-[#F7EFEA] rounded-lg">
                  <h3 className="font-medium text-[#4A4A4A] mb-2">Theme</h3>
                  <select className="w-full px-3 py-2 border border-[#E7CCCC] rounded-lg focus:ring-2 focus:ring-[#4C6CE7] focus:border-transparent">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setIsSettingsOpen(false)}
                className="mt-6 w-full bg-[#4C6CE7] text-white py-2 rounded-lg hover:bg-[#E78F6C] transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ROBase;