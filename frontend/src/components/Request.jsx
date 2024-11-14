import React, { useState, useEffect } from 'react';
import DonationCard from './DonationCard';
import axios from 'axios';
function Request() {
  const [view, setView] = useState('requests');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedData = JSON.parse(localStorage.getItem("user"));
  const fetchData = async () => {
    setLoading(true);
    try {
      let data;

      switch (view) {
        case 'requests':
          // Get requests made by the current user
          const requesterId = localStorage.getItem(storedData.user.uid); // Assume user ID is stored in local storage
          const responseRequests = await axios.get(`http://localhost:1987/requests/user/${requesterId}`);
          data = responseRequests.data;
          break;

        case 'myRequests':
          // Get requests on the user's donations
          const offerId = localStorage.getItem(storedData.user.uid); // Replace with actual offer ID
          const responseMyRequests = await axios.get(`http://localhost:1987/requests/offer/${offerId}`);
          data = responseMyRequests.data;
          break;

        case 'donations':
          // Get all available donations
          const responseDonations = await axios.get("http://localhost:1987/foodOffers");
          data = responseDonations.data;
          break;

        case 'myDonations':
          // Get donations posted by the user
          //const userId = localStorage.getItem(storedData.user.uid);
          console.log('heloooooooooooooooooooooo')
          console.log(storedData.user.uid)
          const ud = storedData.user.uid
          const responseMyDonations = await axios.get(`http://localhost:1987/foodOffers/mydonations?userId=${ud}`);
          data = responseMyDonations.data;
          break;

        default:
          data = [];
      }
      setItems(data);
    } catch (error) {
      console.error(`Error fetching ${view}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view]);

  const renderTitle = () => {
    switch (view) {
      case 'requests':
        return 'My Pending Requests';
      case 'myRequests':
        return 'Requests on My Donations';
      case 'donations':
        return 'Available Donations';
      case 'myDonations':
        return 'My Donations';
      default:
        return '';
    }
  };

  const renderActionLabel = () => {
    switch (view) {
      case 'requests':
        return 'Cancel Request';
      case 'myRequests':
        return 'Accept Request';
      case 'donations':
        return 'Request Donation';
      case 'myDonations':
        return 'Edit Donation';
      default:
        return '';
    }
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <button onClick={() => setView('requests')} style={styles.navButton}>Requests</button>
        <button onClick={() => setView('myRequests')} style={styles.navButton}>My Requests</button>
        <button onClick={() => setView('donations')} style={styles.navButton}>Donations</button>
        <button onClick={() => setView('myDonations')} style={styles.navButton}>My Donations</button>
      </nav>
      
      <div style={styles.container}>
        <h1 style={styles.title}>{renderTitle()}</h1>
        
        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : (
          <div style={styles.cardContainer}>
            {items.map((item) => (
              <DonationCard
                key={item.foid}
                donation={item}
                actionLabel={renderActionLabel()}
                onAction={(donation) => console.log(`${renderActionLabel()} on:`, donation)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#333',
  },
  navButton: {
    color: '#fff',
    backgroundColor: '#555',
    padding: '10px 15px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
  },
  cardContainer: {
    display: 'grid',
    gap: '20px',
  },
};

export default Request;
