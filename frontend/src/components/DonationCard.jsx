import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, AlertTriangle, Tag, Heart } from 'lucide-react';

function DonationCard({ donation, onAction, actionLabel, showAction }) {
  const isExpiringSoon = () => {
    const expiryDate = new Date(donation.expiryDate);
    const now = new Date();
    const hoursUntilExpiry = (expiryDate - now) / (1000 * 60 * 60);
    return hoursUntilExpiry <= 48;
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#F7EFEA] rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
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
                <Tag className="w-4 h-4 mr-2 text-[#4C6CE7]" />
                <span className="font-medium text-[#4A4A4A] w-32">Quantity:</span>
                <span className="text-[#4C6CE7]">{donation.quantity} servings</span>
              </div>
            )}
            
            {donation.expiryDate && (
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-[#4C6CE7]" />
                <span className="font-medium text-[#4A4A4A] w-32">Expiry Date:</span>
                <span className="text-[#4C6CE7]">
                  {new Date(donation.expiryDate).toLocaleDateString()}
                </span>
              </div>
            )}
            
            {donation.location && (
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-[#4C6CE7]" />
                <span className="font-medium text-[#4A4A4A] w-32">Location:</span>
                <span className="text-[#4C6CE7]">{donation.location}</span>
              </div>
            )}
          </div>

          {isExpiringSoon() && (
            <div className="flex items-center p-3 bg-[#F4D8D8] rounded-lg">
              <AlertTriangle className="w-4 h-4 mr-2 text-[#D32E28]" />
              <span className="text-sm text-[#D32E28] font-medium">Expires Soon!</span>
            </div>
          )}

          {actionLabel && (
            <motion.button 
              onClick={() => onAction(donation)}
              disabled={!showAction}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 transform
                ${showAction
                  ? 'bg-[#4C6CE7] text-white hover:bg-[#E78F6C]'
                  : 'bg-[#F7EFEA] text-[#4A4A4A] cursor-not-allowed opacity-50'}`}
            >
              {actionLabel}
            </motion.button>
          )}

          <div className="flex items-center justify-end pt-4 border-t border-[#E7CCCC]">
            <button className="flex items-center text-[#4A4A4A] hover:text-[#D32E28] transition-colors">
              <Heart className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Save</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DonationCard;