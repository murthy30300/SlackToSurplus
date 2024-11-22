import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonationCard from './DonationCard';

function MyDonations() {
  const [myDonations, setMyDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedData = JSON.parse(localStorage.getItem('user') || '{"user":{"uid":""}}');
  const API_BASE_URL = 'http://localhost:1987';

  useEffect(() => {
    const fetchMyDonations = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/foodOffers/mydonations?userId=${storedData.user.uid}`);
        setMyDonations(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch my donations');
      } finally {
        setLoading(false);
      }
    };

    fetchMyDonations();
  }, [storedData.user.uid]);

  const handleComplete = async (donation) => {
    try {
      await axios.post(`${API_BASE_URL}/requests/${donation.id}/complete`);
      alert('Donation marked as completed!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to complete donation');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (myDonations.length === 0) return <div>No donations found</div>;

  return (
    <div style={styles.cardGrid}>
      {myDonations.map((donation) => (
        <DonationCard
          key={donation.id}
          donation={donation}
          actionLabel="Mark as Completed"
          onAction={handleComplete}
          showAction={donation.status === 'PENDING'}
        />
      ))}
    </div>
  );
}

const styles = {
  cardGrid: { display: 'grid', gap: '20px' },
};

export default MyDonations;
