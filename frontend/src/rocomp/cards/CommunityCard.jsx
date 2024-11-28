import React from 'react';
import { Award, Heart } from 'lucide-react';

const CommunityCard = ({ partner }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={partner.imageUrl}
        alt={partner.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
          <Award className="w-5 h-5 text-yellow-500" />
        </div>
        <p className="text-gray-600 mb-4">{partner.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Heart className="w-4 h-4 mr-2 text-red-500" />
          {partner.impact}
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;