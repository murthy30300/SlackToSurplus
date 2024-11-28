import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import ROBase from './ROBase';

const RODashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReceived: 0,
    peopleFed: 0,
    pendingRequests: 0
  });

  // Store data outside of useEffect to prevent re-renders
  const storedData = JSON.parse(localStorage.getItem('user') || '{"user":{"uid":""}}');

  useEffect(() => {
    // Log only once when the component mounts
    console.log(storedData);

    const fetchData = async () => {
      try {
        const [donationsRes, statsRes] = await Promise.all([
          axios.get('http://localhost:1987/foodOffers'),
          axios.get(`http://localhost:1987/api/recipient/stats?organizationId=${storedData.user.uid}`)
        ]);
        setDonations(donationsRes.data);
        setStats(statsRes.data);
        console.log('1.......', donationsRes.data);
        console.log('2...........', statsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  // Handle the request to post the donation
  const handleRequest = async (donation) => {
    try {
      const requestData = {
        foodOffer: { foid: donation.foid },  // Sending only the FoodOffer ID
        requester: { uid: storedData.user.uid },  // User ID from localStorage
        status: 'PENDING',  // Default status
        requestDate: new Date().toISOString(),  // Current date in ISO format
      };
  
      // Sending a POST request to the backend
      const response = await axios.post(
        `http://localhost:1987/api/recipient/food-request`, // Adjust the URL
        requestData
      );
      response.data
      
      alert('Request sent successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send request');
    }
  };
  
  if (loading) {
    return (
      <ROBase>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </ROBase>
    );
  }

  return (
    <ROBase>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Total Food Received</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{stats.totalReceived}kg</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">People Fed</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">{stats.peopleFed}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Pending Requests</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-600">{stats.pendingRequests}</p>
          </div>
        </div>

        {/* Available Donations */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Available Donations</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {donations.map((donation) => (
              <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{donation.foodType}</h3>
                <p className="text-sm text-gray-500 mt-1">{donation.description}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Quantity: {donation.quantity}kg</p>
                  <p className="text-sm text-gray-600">Location: {donation.location}</p>
                </div>
                {console.log('+++++++++++++++nanba donations thambi ++++++++++++++',donation)}
                <button
                  onClick={() => handleRequest(donation)} // Call handleRequest instead of navigate
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Request Donation
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ROBase>
  );
};

export default RODashboard;
