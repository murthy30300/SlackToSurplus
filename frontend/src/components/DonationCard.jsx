import React from 'react';

function DonationCard({ donation, onAction, actionLabel }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{donation.foodType}</h3>
        <span style={styles.status}>{donation.status}</span>
      </div>
      
      <p>{donation.description}</p>
      <p>Quantity: {donation.quantity} servings</p>
      <p>Expiry Date: {new Date(donation.expiryDate).toLocaleDateString()}</p>
      <p>Location: {donation.location}</p>
      <p>Packaging: {donation.packagingType}</p>

      {donation.dietaryNotes && (
        <p>Dietary Notes: {donation.dietaryNotes}</p>
      )}

      {actionLabel && (
        <button onClick={() => onAction(donation)} style={styles.button}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  status: {
    backgroundColor: '#e0f7fa',
    padding: '5px 10px',
    borderRadius: '4px',
    color: '#00796b',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#0288d1',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default DonationCard;
