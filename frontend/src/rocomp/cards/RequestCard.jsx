import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';

const RequestCard = ({ donation, onRequest }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{donation.foodType}</h3>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Available
          </span>
        </div>

        <p className="text-gray-600 mb-4">{donation.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {donation.location}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Expires: {new Date(donation.expiryDate).toLocaleDateString()}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            Quantity: {donation.quantity} servings
          </div>
        </div>

        {donation.dietaryNotes && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">{donation.dietaryNotes}</p>
          </div>
        )}

        <button
          onClick={() => onRequest(donation.id)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Request Donation
        </button>
      </div>
    </div>
  );
};

export default RequestCard;