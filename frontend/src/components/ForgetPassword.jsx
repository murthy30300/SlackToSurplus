import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Email validation
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) ? '' : 'Invalid email format';
  };

  // Reset password validation
  const validateResetPassword = () => {
    let errors = {};
    if (!token) errors.token = 'Token is required';
    if (!newPassword) errors.newPassword = 'New password is required';
    if (newPassword && newPassword.length < 6) errors.newPassword = 'Password must be at least 6 characters';
    return errors;
  };

  // Handle submit for email step
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    try {
      await axios.post('http://localhost:1987/api/auth/forget-password', { email });
      toast.success('Reset token has been sent to your email');
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset token');
    }
  };

  // Handle submit for reset password step
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const validationErrors = validateResetPassword();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost:1987/api/auth/reset-password', { email, token, newPassword });
      toast.success('Password reset successful');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7EFEA] p-4">
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
      >
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-[#4A4A4A] hover:text-[#4C6CE7] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-[#4A4A4A] ml-4">
            {step === 1 ? 'Forgot Password' : 'Reset Password'}
          </h2>
        </div>

        {/* Email Step */}
        {step === 1 ? (
          <form onSubmit={handleSubmitEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#E7CCCC] rounded-lg focus:ring-2 focus:ring-[#4C6CE7] focus:border-transparent"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <div className="text-[#D32E28] text-sm mt-1">{errors.email}</div>
                )}
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-[#4C6CE7] text-white py-2 px-4 rounded-lg hover:bg-[#E78F6C] transition-colors font-medium"
            >
              Send Reset Token
            </motion.button>
          </form>
        ) : (
          // Reset Password Step
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Reset Token
              </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-2 border border-[#E7CCCC] rounded-lg focus:ring-2 focus:ring-[#4C6CE7] focus:border-transparent"
                placeholder="Enter token from email"
              />
              {errors.token && (
                <div className="text-[#D32E28] text-sm mt-1">{errors.token}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] w-5 h-5" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#E7CCCC] rounded-lg focus:ring-2 focus:ring-[#4C6CE7] focus:border-transparent"
                  placeholder="Enter new password"
                />
                {errors.newPassword && (
                  <div className="text-[#D32E28] text-sm mt-1">{errors.newPassword}</div>
                )}
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-[#4C6CE7] text-white py-2 px-4 rounded-lg hover:bg-[#E78F6C] transition-colors font-medium"
            >
              Reset Password
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
