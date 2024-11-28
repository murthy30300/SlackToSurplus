import React from 'react';

function DonationCard({ donation, onAction, actionLabel }) {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-[#4CE7A8] text-[#4A4A4A]';
      case 'PENDING':
        return 'bg-[#E78F6C] text-white';
      case 'CONFIRMED':
        return 'bg-[#4C6CE7] text-white';
      case 'COMPLETED':
        return 'bg-[#A5B77F] text-white';
      case 'CANCELLED':
        return 'bg-[#D32E28] text-white';
      default:
        return 'bg-[#F7EFEA] text-[#4A4A4A]';
    }
  };

  const isActionable = (status) => ['AVAILABLE', 'PENDING'].includes(status);

  return (
    <div className="bg-[#F7EFEA] rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#4A4A4A]">
            {donation.foodType || 'Unnamed Donation'}
          </h3>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(donation.status)}`}>
            {donation.status || 'Unknown'}
          </span>
        </div>

        <div className="space-y-6">
          {donation.description && (
            <p className="text-[#4A4A4A] leading-relaxed">{donation.description}</p>
          )}
          
          <div className="space-y-4 bg-white rounded-lg p-4">
            {donation.quantity && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-[#4A4A4A] w-32">Quantity:</span>
                <span className="text-[#4C6CE7]">{donation.quantity} servings</span>
              </div>
            )}
            
            {donation.expiryDate && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-[#4A4A4A] w-32">Expiry Date:</span>
                <span className="text-[#4C6CE7]">{formatDate(donation.expiryDate)}</span>
              </div>
            )}
            
            {donation.location && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-[#4A4A4A] w-32">Location:</span>
                <span className="text-[#4C6CE7]">{donation.location}</span>
              </div>
            )}
          </div>

          {actionLabel && (
            <button 
              onClick={() => onAction(donation)}
              disabled={!isActionable(donation.status)}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 transform
                ${isActionable(donation.status)
                  ? 'bg-[#4C6CE7] text-white hover:bg-[#E78F6C] hover:scale-105'
                  : 'bg-[#F7EFEA] text-[#4A4A4A] cursor-not-allowed opacity-50'}`}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DonationCard;