import axios from 'axios';

const API_BASE_URL = 'http://localhost:1987';

export const api = {
  signup: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  },

  login: async (username, password) => {
    const response = await axios.get(`${API_BASE_URL}/login`, {
      params: { username, password }
    });
    return response.data;
  },

  createPost: async (caption, image, userId) => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);
    formData.append('userId', userId.toString());
    
    const response = await axios.post(`${API_BASE_URL}/posts`, formData);
    return response.data;
  },

  getAllPosts: async (profileId) => {
    const response = await axios.get(`${API_BASE_URL}/posts`, {
      params: { profileId }
    });
    return response.data;
  },

  likePost: async (postId, profileId) => {
    await axios.post(`${API_BASE_URL}/posts/${postId}/like`, null, {
      params: { profileId }
    });
  },

  unlikePost: async (postId, profileId) => {
    await axios.delete(`${API_BASE_URL}/posts/${postId}/like/${profileId}`);
  },

  getLikeCount: async (postId) => {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/likes/count`);
    return response.data;
  },

  isLikedByProfile: async (postId, profileId) => {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/likes/status`, {
      params: { profileId }
    });
    return response.data;
  }
};