import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonationCard from './DonationCard';

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
        console.log(response.data)
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
      console.log('Sending offerId:', donation.foid);
  
      // Assuming backend expects JSON body
      await axios.post(`${API_BASE_URL}/requests/create?offerId=${donation.foid}&requesterId=${JSON.parse(localStorage.getItem('user')).user.uid}`);

      alert('Request sent successfully!');
    } catch (err) {
      console.error('Error during request creation:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to send request');
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (donations.length === 0) return <div>No donations available</div>;

  return (
    <div style={styles.cardGrid}>
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

const styles = {
  cardGrid: { display: 'grid', gap: '20px' },
};

export default Donations;
