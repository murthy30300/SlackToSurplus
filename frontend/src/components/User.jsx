import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Base from './Base';
import { Edit2, Upload } from 'lucide-react';

const User = () => {
  const storedData = JSON.parse(localStorage.getItem('user'));
  const [profileData, setProfileData] = useState({
    name: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    badge: 'NEW_USER',
    profilePic: null,
    bannerPic: null,
    profilePicUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bannerPicUrl: 'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [profilePreview, setProfilePreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  useEffect(() => {
    if (storedData?.user?.username) {
      loadUserProfile();
      loadUserPosts(storedData.user.uid);
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await axios.get(`https://slacktosurplus.up.railway.app/profile/search?username=${storedData.user.username}`);
      const profile = response.data;
      console.log(response.data)
      setProfileData(prev => ({
        ...prev,
        name: profile.name || '',
        dateOfBirth: profile.dateOfBirth || '',
        phone: profile.phone || '',
        address: profile.address || '',
        badge: profile.badge || 'NEW_USER',
        profilePicUrl: profile.profilePicUrl || prev.profilePicUrl,
        bannerPicUrl: profile.bannerPicUrl || prev.bannerPicUrl
      }));
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const loadUserPosts = async (userId) => {
    try {
      const response = await axios.get(`https://slacktosurplus.up.railway.app/posts/user/${userId}`);
      setPosts(response.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({
        ...prev,
        [type]: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profilePic') {
          setProfilePreview(reader.result);
        } else {
          setBannerPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('uid', storedData.user.uid);
    formData.append('name', profileData.name);
    formData.append('dateOfBirth', profileData.dateOfBirth);
    formData.append('phone', profileData.phone);
    formData.append('address', profileData.address);
    formData.append('badge', profileData.badge);
    formData.append('username',storedData.user.username)
    if (profileData.profilePic) {
      formData.append('profilePic', profileData.profilePic);
    }
    if (profileData.bannerPic) {
      formData.append('bannerPic', profileData.bannerPic);
    }

    try {
      await axios.post('https://slacktosurplus.up.railway.app/profile/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Reload profile data after successful update
      await loadUserProfile();
      
      setIsEditModalOpen(false);
      setProfilePreview(null);
      setBannerPreview(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Base>
      <div className="max-w-7xl mx-auto">
        {/* Banner */}
        <div className="relative h-80 w-full overflow-hidden rounded-xl">
          <img
            src={bannerPreview || profileData.bannerPicUrl}
            alt="Profile Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="relative -mt-16 px-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={profilePreview || profileData.profilePicUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{storedData?.user?.username}</h1>
                <p className="text-gray-500">{profileData.address}</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <p className="text-gray-600">{post.caption}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.likeCount} likes
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                  <div className="flex items-center space-x-4">
                    <img
                      src={profilePreview || profileData.profilePicUrl}
                      alt="Profile Preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      <span className="text-sm">Upload New</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'profilePic')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
                  <div className="flex items-center space-x-4">
                    <img
                      src={bannerPreview || profileData.bannerPicUrl}
                      alt="Banner Preview"
                      className="w-32 h-16 rounded object-cover"
                    />
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      <span className="text-sm">Upload New</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'bannerPic')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Base>
  );
};

export default User;