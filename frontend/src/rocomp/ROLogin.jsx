import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import CONFIG from '.././config'
const ROLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '', password: '', role: 'ORGANIZATION' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${CONFIG.API_BASE_URL}login`, {
        params: {
          username: user.username,
          password: user.password,
        },
      });

      if (response.status === 200 && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/ro/dashboard');
      } else {
        setMessage('Login failed. Please check your credentials. 12');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response error:', error.response);
        setMessage('Login failed. Invalid username or password. 23');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error:', error.request);
        setMessage('Network error. Please try again later. 24');
      } else {
        // Something happened in setting up the request
        console.error('25 General error:', error.message);
        setMessage('Login failed. Please check your credentials. 22');
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${CONFIG.API_BASE_URL}/signup`, user);
      if (response.status === 201) {
        setMessage('Signup successful');
        setUser({ username: '', email: '', password: '', role: 'ORGANIZATION' });
        setIsLogin(true);
      }
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="flex-1 flex items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1470&q=80"
          alt="Food Donation"
          className="w-full max-w-2xl rounded-2xl shadow-xl"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex mb-8 border-b border-gray-200">
              <button onClick={() => setIsLogin(false)}  className={`flex-1 pb-4 text-center font-medium ${
                  !isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                }`}
              >
                Organization Sign up
              </button>
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 pb-4 text-center font-medium ${
                  isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                }`}
              >
                Organization Login
              </button>
            </div>

            <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {isLogin ? 'Login' : 'Sign up'}
              </button>
            </form>

            {message && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROLogin;
