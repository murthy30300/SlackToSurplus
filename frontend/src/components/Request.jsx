import React, { useState, useEffect } from 'react';
import DonationCard from './DonationCard';
import { fetchDonations, handleDonationAction } from '../services/hi.js';

function Request() {
  const [view, setView] = useState('donations');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedData = JSON.parse(localStorage.getItem("user") || '{"user":{"uid":""}}');

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await fetchDonations(storedData.user.uid, view);
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setItems(data);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (storedData.user.uid) {
      fetchData();
    }
  }, [view, storedData.user.uid]);

  const handleAction = async (donation) => {
    const { success, message } = await handleDonationAction(view, donation, storedData.user.uid);
    
    if (success) {
      fetchData();
    }
    
    alert(message);
  };

  const getActionLabel = (item) => {
    if (!item) return '';

    switch (view) {
      case 'donations':
        return 'Request for this food';
      case 'myDonations':
        switch (item.status) {
          case 'PENDING':
            return 'Accept Request';
          case 'CONFIRMED':
            return 'Mark as Completed';
          default:
            return item.status;
        }
      case 'requests':
        return item.status === 'PENDING' ? 'Cancel Request' : item.status;
      case 'myRequests':
        return item.status;
      default:
        return '';
    }
  };

  if (!storedData.user.uid) {
    return <div style={styles.error}>Please log in to view donations and requests.</div>;
  }

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <button 
          onClick={() => setView('donations')} 
          style={view === 'donations' ? {...styles.navButton, ...styles.activeButton} : styles.navButton}
        >
          Available Donations
        </button>
        <button 
          onClick={() => setView('myDonations')} 
          style={view === 'myDonations' ? {...styles.navButton, ...styles.activeButton} : styles.navButton}
        >
          My Donations
        </button>
        <button 
          onClick={() => setView('requests')} 
          style={view === 'requests' ? {...styles.navButton, ...styles.activeButton} : styles.navButton}
        >
          My Requests
        </button>
        <button 
          onClick={() => setView('myRequests')} 
          style={view === 'myRequests' ? {...styles.navButton, ...styles.activeButton} : styles.navButton}
        >
          Requests on My Donations
        </button>
      </nav>

      <div style={styles.content}>
        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : error ? (
          <div style={styles.error}>{error}</div>
        ) : items.length === 0 ? (
          <div style={styles.empty}>No items found.</div>
        ) : (
          <div style={styles.cardGrid}>
            {items.map((item) => (
              <DonationCard
                key={item.id || item.foid}
                donation={item}
                actionLabel={getActionLabel(item)}
                onAction={handleAction}
                showAction={view !== 'myRequests' || item.status === 'PENDING'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  navbar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    flexWrap: 'wrap',
  },
  navButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#333',
    transition: 'all 0.3s ease',
    flexGrow: 1,
    minWidth: '200px',
  },
  activeButton: {
    backgroundColor: '#0288d1',
    color: '#fff',
  },
  content: {
    marginTop: '20px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    color: '#d32f2f',
    backgroundColor: '#ffebee',
    borderRadius: '8px',
    marginTop: '20px',
  },
  empty: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    color: '#666',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  }
};

export default Request;