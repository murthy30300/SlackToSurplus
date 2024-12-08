import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import config from '../config'

const Home = () => {
  const [activeModule, setActiveModule] = useState("user");
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const modules = [
    { id: "user", label: "User" },
    { id: "organization", label: "Organization" },
    { id: "admin", label: "Admin" },
  ];
  const validateForm = () => {
    const newErrors = {};
  
    // Username validation
    if (!formValues.username || formValues.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
  
    // Email validation
    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Invalid email format";
    }
  
    // Password validation
    const password = formValues.password;
    if (!password) {
      newErrors.password = "Password is required";
    } else {
      // Minimum length check
      if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      }
      // Uppercase letter check
      else if (!/[A-Z]/.test(password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
      }
      // Lowercase letter check
      else if (!/[a-z]/.test(password)) {
        newErrors.password = "Password must contain at least one lowercase letter";
      }
      // Special character check
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        newErrors.password = "Password must contain at least one special character";
      }
      // Number check
      else if (!/\d/.test(password)) {
        newErrors.password = "Password must contain at least one number";
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userRoleMap = {
        user: "INDIVIDUAL",
        organization: "ORGANIZATION",
        admin: "ADMIN",
      };

      const endpoint =
        activeModule === "organization"
          ? `https://slacktosurplus.up.railway.app/signup`
          : `https://slacktosurplus.up.railway.app/signup`;

      const payload = {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        role: userRoleMap[activeModule],
      };

      console.log("Payload being sent:", payload);

      const response = await axios.post(endpoint, payload);
      console.log('response data',response.data)
      if (response.status === 200) {
        toast.success("Signup successful! Please login.");
        setFormValues({ username: "", email: "", password: "" });
        setErrors({});
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formValues.username || !formValues.password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      const endpoint =
        activeModule === "organization"
          ? `https://slacktosurplus.up.railway.app/login`
          : `https://slacktosurplus.up.railway.app/login`;

      const response = await axios.get(endpoint, {
        params: { username: formValues.username, password: formValues.password },
      });

      if (response.status === 200 && response.data.user) {
        if (rememberMe) {
          localStorage.setItem("rememberedUsername", formValues.username);
        } else {
          localStorage.removeItem("rememberedUsername");
        }

        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Login successful!");

        switch (activeModule) {
          case "user":
            navigate("/UserDash");
            break;
          case "organization":
            navigate("/ro/dashboard");
            break;
          case "admin":
            navigate("/admin");
            break;
        }
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F7EFEA]">
      <Toaster position="top-right" />

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Food Donation"
          className="w-full max-w-2xl rounded-2xl shadow-xl"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex mb-8">
              {modules.map((module) => (
                <motion.button
                  key={module.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveModule(module.id)}
                  className={`flex-1 pb-4 text-center font-medium transition-colors ${
                    activeModule === module.id
                      ? "text-[#4C6CE7] border-b-2 border-[#4C6CE7]"
                      : "text-[#4A4A4A] hover:text-[#E78F6C]"
                  }`}
                >
                  {module.label}
                </motion.button>
              ))}
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  {activeModule === "organization"
                    ? "Organization Name"
                    : "Username"}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-[#E7CCCC] rounded-lg focus:ring-2 focus:ring-[#4C6CE7] focus:border-transparent"
                  />
                  {errors.username && (
                    <div className="text-[#D32E28] text-sm mt-1">
                      {errors.username}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-[#E7CCCC] rounded-lg focus:ring-2 focus:ring-[#4C6CE7] focus:border-transparent"
                  />
                  {errors.email && (
                    <div className="text-[#D32E28] text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-2 border border-[#E7CCCC] rounded-lg focus:ring-2 focus:ring-[#4C6CE7] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {errors.password && (
                    <div className="text-[#D32E28] text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="button"
                  onClick={handleLogin}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-[#4C6CE7] text-white py-2 px-4 rounded-lg hover:bg-[#E78F6C] transition-colors font-medium"
                >
                  Login
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-[#F7EFEA] text-[#4A4A4A] py-2 px-4 rounded-lg hover:bg-[#F4D8D8] transition-colors font-medium"
                >
                  Sign Up
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
