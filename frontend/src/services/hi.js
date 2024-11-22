import axios from 'axios';

const API_BASE_URL = 'http://localhost:1987';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDonations = async (userId, view) => {
  try {
    const endpoints = {
      requests: `/requests/user/${userId}`, // Fetch requests the user made
      myRequests: `/requests/offer/${userId}`, // Requests on donations user owns
      donations: '/foodOffers', // All available donations
      myDonations: `/foodOffers/mydonations?userId=${userId}`, // Donations made by the user
    };

    if (!endpoints[view]) {
      throw new Error('Invalid view type');
    }

    const response = await api.get(endpoints[view]);
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: [],
      error: error.response?.data?.message || 'Failed to fetch donations',
    };
  }
};

export const handleDonationAction = async (view, donation, userId) => {
  try {
    let endpoint = '';
    let data = {};
    let successMessage = '';

    switch (view) {
      case 'donations':
        endpoint = '/requests/create';
        data = { offerId: donation.foid, requesterId: userId };
        successMessage = 'Request sent successfully!';
        break;

      case 'myRequests':
        endpoint = `/requests/${donation.id}/confirm`;
        successMessage = 'Request confirmed successfully!';
        break;

      case 'requests':
        endpoint = `/requests/${donation.id}/cancel`;
        successMessage = 'Request cancelled successfully!';
        break;

      case 'myDonations':
        if (donation.status === 'PENDING') {
          endpoint = `/requests/${donation.id}/complete`;
          successMessage = 'Donation marked as completed!';
        } else {
          throw new Error('Invalid donation status for action');
        }
        break;

      default:
        throw new Error('Invalid action type');
    }

    await api.post(endpoint, data);
    return { success: true, message: successMessage };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to process request',
    };
  }
};
