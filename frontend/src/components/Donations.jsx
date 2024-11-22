import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonationCard from './DonationCard';
import { Loader2 } from 'lucide-react';

function Donations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'http://localhost:1987';

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/foodOffers`);
        setDonations(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch donations');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handleRequest = async (donation) => {
    try {
      await axios.post(
        `${API_BASE_URL}/requests/create?offerId=${donation.foid}&requesterId=${JSON.parse(localStorage.getItem('user')).user.uid}`
      );
      alert('Request sent successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send request');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (donations.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No donations available</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {donations.map((donation) => (
        <DonationCard
          key={donation.foid}
          donation={donation}
          actionLabel="Request for this food"
          onAction={handleRequest}
          showAction={true}
        />
      ))}
    </div>
  );
}

export default Donations;