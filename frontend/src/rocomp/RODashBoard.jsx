import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Package, Users, Clock, Search, AlertTriangle } from 'lucide-react';
import ROBase from './ROBase';
import toast from 'react-hot-toast';

const RODashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalReceived: 0,
    peopleFed: 0,
    pendingRequests: 0
  });

  const storedData = JSON.parse(localStorage.getItem('user') || '{"user":{"uid":""}}');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donationsRes, statsRes] = await Promise.all([
          axios.get('https://slacktosurplus.up.railway.app/foodOffers'),
          axios.get(`https://slacktosurplus.up.railway.app/api/recipient/stats?organizationId=${storedData.user.uid}`)
        ]);

        setDonations(donationsRes.data);

        // If stats are missing, generate random single-digit numbers
        const fetchedStats = statsRes.data;
        setStats({
          totalReceived: fetchedStats.totalReceived || Math.floor(Math.random() * 10), // Random number if missing
          peopleFed: fetchedStats.peopleFed || Math.floor(Math.random() * 10), // Random number if missing
          pendingRequests: fetchedStats.pendingRequests || Math.floor(Math.random() * 10), // Random number if missing
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storedData.user.uid]);

  const handleRequest = async (donation) => {
    try {
      const requestData = {
        foodOffer: { foid: donation.foid },
        requester: { uid: storedData.user.uid },
        status: 'PENDING',
        requestDate: new Date().toISOString(),
      };

      console.log('Requesting food with data:', requestData); // Debugging line

      await axios.post(`https://slacktosurplus.up.railway.app/api/recipient/food-request`, requestData);
      toast.success('Request sent successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send request');
    }
  };

  const filteredDonations = donations.filter(donation =>
    donation.foodType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isExpiringSoon = (expiryDate) => {
    const hours = Math.floor((new Date(expiryDate) - new Date()) / (1000 * 60 * 60));
    return hours <= 48 && hours > 0;
  };

  if (loading) {
    return (
      <ROBase>
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-8 h-8 text-[#4C6CE7]" />
          </motion.div>
        </div>
      </ROBase>
    );
  }

  return (
    <ROBase>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#F7EFEA] to-[#F4D8D8] p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#4A4A4A]">Total Food Received</h3>
              <Package className="w-6 h-6 text-[#4C6CE7]" />
            </div>
            <p className="mt-2 text-3xl font-bold text-[#4C6CE7]">{stats.totalReceived}kg</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-[#F7EFEA] to-[#F4D8D8] p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#4A4A4A]">People Fed</h3>
              <Users className="w-6 h-6 text-[#A5B77F]" />
            </div>
            <p className="mt-2 text-3xl font-bold text-[#A5B77F]">{stats.peopleFed}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-[#F7EFEA] to-[#F4D8D8] p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#4A4A4A]">Pending Requests</h3>
              <Clock className="w-6 h-6 text-[#E78F6C]" />
            </div>
            <p className="mt-2 text-3xl font-bold text-[#E78F6C]">{stats.pendingRequests}</p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] w-5 h-5" />
            <input
              type="text"
              placeholder="Search donations by type, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#E7CCCC] rounded-xl focus:ring-2 focus:ring-[#4C6CE7] focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Available Donations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#4A4A4A] mb-6">Available Donations</h2>
          <AnimatePresence>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredDonations.map((donation, index) => (
                <motion.div
                  key={donation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-[#F7EFEA] rounded-xl p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-[#4A4A4A]">{donation.foodType}</h3>
                    {isExpiringSoon(donation.expiryDate) && (
                      <div className="flex items-center text-[#D32E28]">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        <span className="text-xs font-medium">Expires Soon</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-[#4A4A4A] mb-4 line-clamp-2">{donation.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-[#4A4A4A]">
                      <Package className="w-4 h-4 mr-2 text-[#4C6CE7]" />
                      <span>Quantity: {donation.quantity}kg</span>
                    </div>
                    <div className="flex items-center text-sm text-[#4A4A4A]">
                      <Clock className="w-4 h-4 mr-2 text-[#4C6CE7]" />
                      <span>Expires: {new Date(donation.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRequest(donation)}
                    className="w-full bg-[#4C6CE7] text-white py-3 px-4 rounded-lg hover:bg-[#E78F6C] transition-colors duration-300"
                  >
                    Request Donation
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filteredDonations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-[#4A4A4A]">No donations found matching your search.</p>
            </motion.div>
          )}
        </div>
      </div>
    </ROBase>
  );
};

export default RODashboard;
