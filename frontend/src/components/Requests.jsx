import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonationCard from './DonationCard';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (requests.length === 0) return <div>No requests found</div>;

  return (
    <div style={styles.cardGrid}>
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

const styles = {
  cardGrid: { display: 'grid', gap: '20px' },
};

export default Requests;
