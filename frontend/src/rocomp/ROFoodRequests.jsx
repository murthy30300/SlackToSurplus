import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, MapPin } from 'lucide-react';
import ROBase from './ROBase';
import RequestCard from './cards/RequestCard';
import FilterPanel from './cards/FilterPanel';

const ROFoodRequests = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    foodType: ''
  });
  const storedData = JSON.parse(localStorage.getItem('user') || '{"user":{"uid":""}}');

  useEffect(() => {
    console.log('Applied Filters:', filters);
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://slacktosurplus.up.railway.app/api/recipient/donations', {
          params: filters
        });
        console.log('Fetched Donations:', response.data);
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [filters]);

  const handleRequest = async (donationId) => {
    try {
      await axios.post('https://slacktosurplus.up.railway.app/api/recipient/food-request', {
        foodOfferId: donationId,
        recipientId: storedData.user.id,
        status: 'PENDING'
      });
      alert('Request sent successfully!');
    } catch (error) {
      alert('Failed to send request');
    }
  };

  return (
    <ROBase>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Available Food Donations</h1>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => document.getElementById('filterPanel').classList.toggle('hidden')}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filter Donations
          </button>
        </div>

        <div id="filterPanel" className="hidden mb-8">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {donations.map((donation) => (
              <RequestCard
                key={donation.id}
                donation={donation}
                onRequest={handleRequest}
              />
            ))}
          </div>
        )}
      </div>
    </ROBase>
  );
};

export default ROFoodRequests;
