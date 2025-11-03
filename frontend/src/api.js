// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:1987';

// export const api = {
//   signup: async (userData) => {
//     const response = await axios.post(`${API_BASE_URL}/signup`, userData);
//     return response.data;
//   },

//   login: async (username, password) => {
//     const response = await axios.get(`${API_BASE_URL}/login`, {
//       params: { username, password }
//     });
//     return response.data;
//   },

//   createPost: async (caption, image, userId) => {
//     const formData = new FormData();
//     formData.append('caption', caption);
//     formData.append('image', image);
//     formData.append('userId', userId.toString());
    
//     const response = await axios.post(`${API_BASE_URL}/posts`, formData);
//     return response.data;
//   },

//   getAllPosts: async (profileId) => {
//     const response = await axios.get(`${API_BASE_URL}/posts`, {
//       params: { profileId }
//     });
//     return response.data;
//   },

//   likePost: async (postId, profileId) => {
//     await axios.post(`${API_BASE_URL}/posts/${postId}/like`, null, {
//       params: { profileId }
//     });
//   },

//   unlikePost: async (postId, profileId) => {
//     await axios.delete(`${API_BASE_URL}/posts/${postId}/like/${profileId}`);
//   },

//   getLikeCount: async (postId) => {
//     const response = await axios.get(`${API_BASE_URL}/posts/${postId}/likes/count`);
//     return response.data;
//   },

//   isLikedByProfile: async (postId, profileId) => {
//     const response = await axios.get(`${API_BASE_URL}/posts/${postId}/likes/status`, {
//       params: { profileId }
//     });
//     return response.data;
//   }
// };
import axios from 'axios';
import CONFIG from "./config"
// Set the base URL for your API (change this if your backend runs on a different URL)
const API_URL = `${CONFIG.API_BASE_URL}`; // Change this to your backend's URL

// Create an axios instance with default configurations
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Optionally include Authorization headers if needed (e.g., JWT tokens)
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// Get all available donations
export const getAllDonations = async () => {
  try {
    const response = await api.get('/donations');
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error; // Rethrow the error to be handled in the calling component
  }
};

// Get donations posted by the current user
export const getMyDonations = async () => {
  try {
    const response = await api.get('/donations/my');
    return response.data;
  } catch (error) {
    console.error('Error fetching my donations:', error);
    throw error;
  }
};

// Get requests made by the current user
export const getMyRequests = async () => {
  try {
    const response = await api.get('/requests/my');
    return response.data;
  } catch (error) {
    console.error('Error fetching my requests:', error);
    throw error;
  }
};

// Get requests on donations posted by the current user
export const getRequestsOnMyDonations = async () => {
  try {
    const response = await api.get('/requests/on-my-donations');
    return response.data;
  } catch (error) {
    console.error('Error fetching requests on my donations:', error);
    throw error;
  }
};

// Create a donation request
export const createDonationRequest = async (donationId) => {
  try {
    const response = await api.post('/requests', { donationId });
    return response.data;
  } catch (error) {
    console.error('Error creating donation request:', error);
    throw error;
  }
};

// Accept a donation request
export const acceptDonationRequest = async (requestId) => {
  try {
    const response = await api.patch(`/requests/accept/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error accepting donation request:', error);
    throw error;
  }
};

// Reject a donation request
export const rejectDonationRequest = async (requestId) => {
  try {
    const response = await api.patch(`/requests/reject/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting donation request:', error);
    throw error;
  }
};

// Edit a donation
export const editDonation = async (donationId, donationData) => {
  try {
    const response = await api.put(`/donations/${donationId}`, donationData);
    return response.data;
  } catch (error) {
    console.error('Error editing donation:', error);
    throw error;
  }
};

// Cancel a donation request
export const cancelDonationRequest = async (requestId) => {
  try {
    const response = await api.delete(`/requests/cancel/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling donation request:', error);
    throw error;
  }
};

export default api;
