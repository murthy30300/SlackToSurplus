import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Truck, MapPin, Phone } from 'lucide-react';
import ROBase from './ROBase';

const ROLogistics = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    const fetchLogistics = async () => {
      if (!selectedDonation) return;

      try {
        const user = JSON.parse(localStorage.getItem('roUser'));
        const response = await axios.get('https://slacktosurplus.up.railway.app/api/recipient/logistics', {
          params: {
            donationId: selectedDonation,
            recipientId: user.id
          }
        });
        setProviders(response.data);
      } catch (error) {
        console.error('Error fetching logistics providers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogistics();
  }, [selectedDonation]);

  return (
    <ROBase>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Logistics Partners</h1>
          <select
            value={selectedDonation || ''}
            onChange={(e) => setSelectedDonation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Donation</option>
            {/* Add donation options dynamically */}
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <div key={provider.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {provider.location}
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  {provider.contactNumber}
                </div>
              </div>

              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Provider
              </button>
            </div>
          ))}
        </div>
      </div>
    </ROBase>
  );
};

export default ROLogistics;