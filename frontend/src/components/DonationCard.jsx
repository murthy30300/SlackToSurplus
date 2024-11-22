
import React from 'react';

function DonationCard({ donation, onAction, actionLabel }) {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{donation.foodType || 'Unnamed Donation'}</h3>
        <span style={getStatusStyle(donation.status)}>{donation.status || 'Unknown'}</span>
      </div>

      <div style={styles.content}>
        {donation.description && <p style={styles.description}>{donation.description}</p>}
        <div style={styles.details}>
          {donation.quantity && (
            <p style={styles.detail}>
              <span style={styles.label}>Quantity:</span> {donation.quantity} servings
            </p>
          )}
          {donation.expiryDate && (
            <p style={styles.detail}>
              <span style={styles.label}>Expiry Date:</span> {formatDate(donation.expiryDate)}
            </p>
          )}
          {donation.location && (
            <p style={styles.detail}>
              <span style={styles.label}>Location:</span> {donation.location}
            </p>
          )}
          {donation.packagingType && (
            <p style={styles.detail}>
              <span style={styles.label}>Packaging:</span> {donation.packagingType}
            </p>
          )}
          {donation.dietaryNotes && (
            <p style={styles.detail}>
              <span style={styles.label}>Dietary Notes:</span> {donation.dietaryNotes}
            </p>
          )}
        </div>
      </div>

      {actionLabel && (
        <button 
          onClick={() => onAction(donation)} 
          style={getActionButtonStyle(donation.status)}
          disabled={!isActionable(donation.status)}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

const getStatusStyle = (status) => ({
  ...styles.status,
  backgroundColor: getStatusColor(status)
});

const getStatusColor = (status) => {
  switch (status) {
    case 'AVAILABLE':
      return '#e8f5e9';
    case 'PENDING':
      return '#fff3e0';
    case 'CONFIRMED':
      return '#e3f2fd';
    case 'COMPLETED':
      return '#e0f2f1';
    case 'CANCELLED':
      return '#ffebee';
    default:
      return '#f5f5f5';
  }
};

const isActionable = (status) => ['AVAILABLE', 'PENDING'].includes(status);

const getActionButtonStyle = (status) => ({
  ...styles.button,
  opacity: isActionable(status) ? 1 : 0.5,
  cursor: isActionable(status) ? 'pointer' : 'not-allowed',
});

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
    color: '#2c3e50',
  },
  content: {
    marginBottom: '15px',
  },
  description: {
    marginBottom: '10px',
    color: '#34495e',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  detail: {
    margin: 0,
    color: '#34495e',
  },
  label: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  status: {
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '15px',
    backgroundColor: '#0288d1',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    fontWeight: '500',
  }
};

export default DonationCard;
