import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Calendar, Package, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import ROBase from './ROBase';
import toast from 'react-hot-toast';

const ROHistory = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const storedData = JSON.parse(localStorage.getItem("user") || '{"user":{"uid":""}}');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:1987/api/recipient/getorganizer?uid=${storedData.user.uid}`
        );
        const organizerId = response1.data;
        const response = await axios.get(
          `http://localhost:1987/api/recipient/request-history?organizationId=${organizerId}${
            filter !== 'ALL' ? `&status=${filter}` : ''
          }`
        );
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching request history:', error);
        toast.error('Failed to fetch request history');
        setError('Failed to fetch request history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [filter, storedData.user.uid]);

  const filterButtons = [
    { value: 'ALL', label: 'All Requests' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.foodOffer.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.foodOffer.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <ROBase>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="bg-gray-200 p-6 rounded-xl">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-300 rounded mb-4"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </ROBase>
    );
  }

  return (
    <ROBase>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Request History</h1>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>

            <div className="flex flex-wrap gap-2">
              {filterButtons.map((btn) => (
                <motion.button
                  key={btn.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(btn.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === btn.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>
          </div>

          {error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 text-red-800 p-4 rounded-xl text-center"
            >
              {error}
            </motion.div>
          ) : (
            <AnimatePresence>
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-blue-600 text-lg">
                          {request.foodOffer.foodType}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                        {request.foodOffer.description}
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-gray-700">
                          <Package className="w-4 h-4 mr-2 text-blue-500" />
                          <span>Quantity: {request.foodOffer.quantity}kg</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          <span>Request Date: 
                            {request.requestDate
                              ? new Date(Date.parse(request.requestDate)).toLocaleDateString()
                              : 'N/A'}
                          </span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                        className="w-full flex items-center justify-center text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        {expandedId === request.id ? (
                          <>
                            <span className="mr-2">Show Less</span>
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span className="mr-2">Show More</span>
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>

                      <AnimatePresence>
                        {expandedId === request.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-gray-300"
                          >
                            <div className="space-y-2 text-sm text-gray-700">
                              <p>
                                <strong>Location:</strong> {request.foodOffer.location}
                              </p>
                              <p>
                                <strong>Status Updated:</strong> 
                                {request.statusUpdateTime
                                  ? new Date(Date.parse(request.statusUpdateTime)).toLocaleString()
                                  : 'N/A'}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}

          {!error && filteredRequests.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-gray-100 rounded-xl"
            >
              <p className="text-gray-700">No requests found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
    </ROBase>
  );
};

export default ROHistory;
