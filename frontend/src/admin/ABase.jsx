import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, User, FileText, AlertCircle, Activity, Users, LogOut } from "lucide-react";
import { toast } from "react-toastify"; // Assuming you have this installed for showing success messages.

const navItems = [
  { path: "admin/foodoffer", label: "Food Offer", icon: <Activity /> },
  { path: "admin/organization", label: "Organization", icon: <Users /> },
  { path: "admin/post", label: "Posts", icon: <FileText /> },
  { path: "admin/profile", label: "Profiles", icon: <User /> },
  { path: "admin/urgentneed", label: "Urgent Needs", icon: <AlertCircle /> },
  { path: "admin/user", label: "Users", icon: <Home /> },
  { path: "", label: "Logout", icon: <LogOut /> }
];

const ABase = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);  // Declare state for sidebar collapse
  const location = useLocation();
  const navigate = useNavigate();  // Assuming you want to redirect after logout

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <motion.aside
        className={`w-64 bg-gray-800 text-white flex flex-col items-center py-6 ${isSidebarCollapsed ? 'w-20' : ''}`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className={`text-2xl font-bold mb-8 ${isSidebarCollapsed ? 'hidden' : ''}`}>Admin Panel</h1>
        <nav className="flex flex-col space-y-4 w-full px-4">
          {navItems.map((item) => (
            <Link
              to={`/${item.path}`}
              key={item.path}
              className={`flex items-center space-x-4 px-4 py-2 rounded-lg transition-colors ${
                location.pathname.includes(item.path)
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700 hover:text-white text-gray-400"
              }`}
            >
              <span className="w-6 h-6">{item.icon}</span>
              <span className={`text-lg ${isSidebarCollapsed ? 'hidden' : ''}`}>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Toggle Sidebar Collapse */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}  // Toggle collapse
          className="flex items-center px-4 py-2 text-[#D32E28] hover:bg-[#F4D8D8] rounded-lg transition-colors mt-4"
        >
          <LogOut className="w-5 h-5" />
          {!isSidebarCollapsed && <span className="ml-3">Logout</span>}
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        className="flex-1 bg-gray-100 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default ABase;
