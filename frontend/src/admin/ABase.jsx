import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, User, FileText, AlertCircle, Activity, Users } from "lucide-react";

const navItems = [
  { path: "admin/foodoffer", label: "Food Offer", icon: <Activity /> },
  { path: "admin/organization", label: "Organization", icon: <Users /> },
  { path: "admin/post", label: "Posts", icon: <FileText /> },
  { path: "admin/profile", label: "Profiles", icon: <User /> },
  { path: "admin/urgentneed", label: "Urgent Needs", icon: <AlertCircle /> },
  { path: "admin/user", label: "Users", icon: <Home /> },
];

const ABase = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <motion.aside
        className="w-64 bg-gray-800 text-white flex flex-col items-center py-6"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
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
              <span className="text-lg">{item.label}</span>
            </Link>
          ))}
        </nav>
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
