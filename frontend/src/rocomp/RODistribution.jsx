import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Loader2, Copy, RefreshCw, ChevronRight, AlertCircle } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import ROBase from './ROBase';

const RODistribution = () => {
  const [requestId, setRequestId] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNotes, setShowNotes] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!value || value <= 0) {
      setError("Request ID must be a positive number.");
    } else {
      setError(null);
    }
    setRequestId(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requestId || requestId <= 0) {
      toast.error("Please enter a valid Request ID");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get(
        `https://slacktosurplus.up.railway.app/api/recipient/distribution-plan?requestId=${requestId}`
      );
      let { totalQuantity, estimatedServings, suggestedPortionSize, distributionTime } = response.data;
  
      // Calculate missing values if not provided
      if (!suggestedPortionSize && totalQuantity && estimatedServings) {
        suggestedPortionSize = (totalQuantity * 1000) / estimatedServings; // Convert kg to grams
      }
      if (!distributionTime) {
        distributionTime = `Approx. ${Math.ceil(totalQuantity / 2)} hours`; // Example: 2kg/hour
      }
  
      setPlan({
        ...response.data,
        suggestedPortionSize: suggestedPortionSize ? suggestedPortionSize.toFixed(2) : 'N/A',
        distributionTime,
      });
      toast.success("Distribution plan calculated successfully!");
    } catch (error) {
      setError('Failed to fetch distribution plan');
      toast.error("Failed to fetch distribution plan");
    } finally {
      setLoading(false);
    }
  };
  

  const copyToClipboard = () => {
    const text = `
      Distribution Plan Details:
      Total Quantity: ${plan.totalQuantity}kg
      Estimated Servings: ${plan.estimatedServings}
      Suggested Portion Size: ${plan.suggestedPortionSize}g/person
      Distribution Time: ${plan.distributionTime || 'N/A'}
      ${plan.notes ? `\nNotes: ${plan.notes}` : ''}
    `;
    navigator.clipboard.writeText(text);
    toast.success("Plan details copied to clipboard!");
  };

  const handleClear = () => {
    setRequestId('');
    setPlan(null);
    setError(null);
    setShowNotes(false);
    toast.success("Form cleared!");
  };

  return (
    <ROBase>
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/ro/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </a>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <li className="text-blue-600">Distribution Planning</li>
          </ol>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center space-x-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-extrabold text-gray-900">Distribution Planning</h1>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request ID
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={requestId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500 transition-all"
                    placeholder="Enter Request ID"
                    aria-label="Enter the request ID to fetch the distribution plan"
                  />
                  {error && (
                    <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                </div>
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Calculate Distribution Plan'
                  )}
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={handleClear}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.form>

          <AnimatePresence mode="wait">
            {plan && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-xl shadow-lg"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Distribution Plan</h2>
                  <motion.button
                    onClick={copyToClipboard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Total Quantity</p>
                    <p className="text-2xl font-bold text-gray-900">{plan.totalQuantity}kg</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Estimated Servings</p>
                    <p className="text-2xl font-bold text-gray-900">{plan.estimatedServings}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Suggested Portion Size</p>
                    <p className="text-2xl font-bold text-gray-900">{plan.suggestedPortionSize}g/person</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Distribution Time</p>
                    <p className="text-2xl font-bold text-gray-900">{plan.distributionTime || 'N/A'}</p>
                  </div>
                </div>

                {plan.notes && (
                  <motion.div className="mt-6">
                    <button
                      onClick={() => setShowNotes(!showNotes)}
                      className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-left"
                    >
                      {showNotes ? 'Hide Notes' : 'Show Notes'}
                    </button>
                    <AnimatePresence>
                      {showNotes && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">{plan.notes}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!plan && !loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 p-6 rounded-lg text-center"
            >
              <p className="text-gray-600">
                Enter a valid Request ID to view the distribution plan.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-xl"
          >
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="mt-2 text-gray-600">Calculating plan...</p>
          </motion.div>
        </div>
      )}
    </ROBase>
  );
};

export default RODistribution;