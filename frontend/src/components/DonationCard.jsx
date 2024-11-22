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
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-teal-100 text-teal-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isActionable = (status) => ['AVAILABLE', 'PENDING'].includes(status);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {donation.foodType || 'Unnamed Donation'}
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(donation.status)}`}>
            {donation.status || 'Unknown'}
          </span>
        </div>

        <div className="space-y-4">
          {donation.description && (
            <p className="text-gray-600">{donation.description}</p>
          )}
          
          <div className="space-y-2">
            {donation.quantity && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-gray-700 w-32">Quantity:</span>
                <span className="text-gray-600">{donation.quantity} servings</span>
              </div>
            )}
            
            {donation.expiryDate && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-gray-700 w-32">Expiry Date:</span>
                <span className="text-gray-600">{formatDate(donation.expiryDate)}</span>
              </div>
            )}
            
            {donation.location && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-gray-700 w-32">Location:</span>
                <span className="text-gray-600">{donation.location}</span>
              </div>
            )}
            
            {donation.packagingType && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-gray-700 w-32">Packaging:</span>
                <span className="text-gray-600">{donation.packagingType}</span>
              </div>
            )}
            
            {donation.dietaryNotes && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-gray-700 w-32">Dietary Notes:</span>
                <span className="text-gray-600">{donation.dietaryNotes}</span>
              </div>
            )}
          </div>
        </div>

        {actionLabel && (
          <button 
            onClick={() => onAction(donation)}
            disabled={!isActionable(donation.status)}
            className={`mt-6 w-full px-4 py-2 rounded-lg font-medium transition-colors
              ${isActionable(donation.status)
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default DonationCard;