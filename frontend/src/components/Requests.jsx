import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonationCard from './DonationCard';
import { Loader2 } from 'lucide-react';

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedData = JSON.parse(localStorage.getItem('user') || '{"user":{"uid":""}}');
  const API_BASE_URL = 'http://localhost:1987';

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/requests/user/${storedData.user.uid}`);
        setRequests(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [storedData.user.uid]);

  const handleCancel = async (request) => {
    try {
      await axios.post(`${API_BASE_URL}/requests/${request.id}/cancel`);
      alert('Request cancelled successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel request');
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

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No requests found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((request) => (
        <DonationCard
          key={request.id}
          donation={request}
          actionLabel="Cancel Request"
          onAction={handleCancel}
          showAction={request.status === 'PENDING'}
        />
      ))}
    </div>
  );
}

export default Requests;