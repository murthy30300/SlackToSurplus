import React, { useState } from 'react';
import axios from 'axios';
import { AlertCircle } from 'lucide-react';
import ROBase from './ROBase';

const ROUrgent = () => {
  const [urgentNeed, setUrgentNeed] = useState({
    title: '',
    description: '',
    quantityNeeded: '',
    neededBy: '',
    eventType: 'GENERAL'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('roUser'));
      const response = await axios.post('http://localhost:1987/api/recipient/urgent-need', {
        ...urgentNeed,
        organizationId: user.id
      });
      alert('Urgent need posted successfully!');
      setUrgentNeed({
        title: '',
        description: '',
        quantityNeeded: '',
        neededBy: '',
        eventType: 'GENERAL'
      });
    } catch (error) {
      alert('Failed to post urgent need');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUrgentNeed(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <ROBase>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 mb-8">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900">Post Urgent Need</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={urgentNeed.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={urgentNeed.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity Needed (kg)
              </label>
              <input
                type="number"
                name="quantityNeeded"
                value={urgentNeed.quantityNeeded}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Needed By
              </label>
              <input
                type="datetime-local"
                name="neededBy"
                value={urgentNeed.neededBy}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type
              </label>
              <select
                name="eventType"
                value={urgentNeed.eventType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="GENERAL">General</option>
                <option value="DISASTER_RELIEF">Disaster Relief</option>
                <option value="COMMUNITY_EVENT">Community Event</option>
                <option value="EMERGENCY">Emergency</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Post Urgent Need
            </button>
          </div>
        </form>
      </div>
    </ROBase>
  );
};

export default ROUrgent;