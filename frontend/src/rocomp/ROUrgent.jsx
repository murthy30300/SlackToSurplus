import React, { useState } from 'react';
import axios from 'axios';
import { AlertCircle, Calendar, Package, Type, FileText, Tag, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import ROBase from './ROBase';

const ROUrgent = () => {
  const [urgentNeed, setUrgentNeed] = useState({
    title: '',
    description: '',
    quantityNeeded: '',
    neededBy: '',
    eventType: 'GENERAL'
  });
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const storedData = JSON.parse(localStorage.getItem('user') || '{"user":{"uid":""}}');

  const validateForm = () => {
    if (new Date(urgentNeed.neededBy) < new Date()) {
      toast.error("The 'Needed By' date cannot be in the past");
      return false;
    }
    if (urgentNeed.quantityNeeded <= 0) {
      toast.error("Quantity must be greater than 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowConfirmModal(true);
  };

  const submitUrgentNeed = async () => {
    setShowConfirmModal(false);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:1987/api/recipient/urgent-need', {
        ...urgentNeed,
        organization: { uid: storedData.user.uid }
      });
      toast.success('Urgent need posted successfully!');
      setUrgentNeed({
        title: '',
        description: '',
        quantityNeeded: '',
        neededBy: '',
        eventType: 'GENERAL',
        uid: storedData.user.uid
      });
    } catch (error) {
      toast.error('Failed to post urgent need');
      console.error(error);
    } finally {
      setLoading(false);
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
      <Toaster position="top-right" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/RODashboard" className="text-gray-700 hover:text-red-600">Dashboard</a>
            </li>
            <span className="mx-2 text-gray-500">/</span>
            <li className="text-red-600">Post Urgent Need</li>
          </ol>
        </nav>

        <div className="flex items-center space-x-3 mb-8">
          <AlertCircle className="w-8 h-8 text-red-600 animate-pulse" />
          <h1 className="text-3xl font-extrabold text-gray-900">Post Urgent Need</h1>
        </div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Type className="w-4 h-4 mr-2" />
                Title
              </label>
              <input
                type="text"
                name="title"
                value={urgentNeed.title}
                onChange={handleChange}
                required
                placeholder="Enter a title for your urgent need"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                aria-label="Title of the urgent need"
              />
              <p className="mt-1 text-sm text-gray-500">Keep the title concise and descriptive</p>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Description
              </label>
              <textarea
                name="description"
                value={urgentNeed.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your urgent need in detail"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                aria-label="Description of the urgent need"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Package className="w-4 h-4 mr-2" />
                Quantity Needed (kg)
              </label>
              <input
                type="number"
                name="quantityNeeded"
                value={urgentNeed.quantityNeeded}
                onChange={handleChange}
                required
                min="1"
                placeholder="Enter quantity in kilograms"
                className={`w-full px-4 py-2 border ${
                  urgentNeed.quantityNeeded <= 0 ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                aria-label="Quantity needed in kilograms"
              />
              {urgentNeed.quantityNeeded <= 0 && (
                <p className="mt-1 text-sm text-red-500">Quantity must be greater than 0</p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Needed By
              </label>
              <input
                type="datetime-local"
                name="neededBy"
                value={urgentNeed.neededBy}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                aria-label="Date and time needed by"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 mr-2" />
                Event Type
              </label>
              <select
                name="eventType"
                value={urgentNeed.eventType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                aria-label="Type of event"
              >
                <option value="GENERAL">General</option>
                <option value="DISASTER_RELIEF">Disaster Relief</option>
                <option value="COMMUNITY_EVENT">Community Event</option>
                <option value="EMERGENCY">Emergency</option>
              </select>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              } text-white transition-all duration-200`}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                'Post Urgent Need'
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Preview Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-6 bg-gray-50 rounded-xl shadow-inner"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Title:</strong> {urgentNeed.title || 'Not specified'}</p>
            <p><strong>Description:</strong> {urgentNeed.description || 'Not specified'}</p>
            <p><strong>Quantity:</strong> {urgentNeed.quantityNeeded ? `${urgentNeed.quantityNeeded} kg` : 'Not specified'}</p>
            <p><strong>Needed By:</strong> {urgentNeed.neededBy ? new Date(urgentNeed.neededBy).toLocaleString() : 'Not specified'}</p>
            <p><strong>Event Type:</strong> {urgentNeed.eventType}</p>
          </div>
        </motion.div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Submission</h2>
                <p className="text-gray-700 mb-6">
                  Are you sure you want to post this urgent need? This will notify potential donors immediately.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitUrgentNeed}
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ROBase>
  );
};

export default ROUrgent;