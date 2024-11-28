import React, { useState } from 'react';
import axios from 'axios';
import { Calculator, Loader2 } from 'lucide-react';
import ROBase from './ROBase';

const RODistribution = () => {
  const [requestId, setRequestId] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:1987/api/recipient/distribution-plan?requestId=${requestId}`
      );
      setPlan(response.data);
    } catch (error) {
      setError('Failed to fetch distribution plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ROBase>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 mb-8">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Distribution Planning</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Request ID
              </label>
              <input
                type="number"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Calculate Distribution Plan'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        {plan && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Distribution Plan</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Quantity</p>
                <p className="text-xl font-bold text-gray-900">{plan.totalQuantity}kg</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Estimated Servings</p>
                <p className="text-xl font-bold text-gray-900">{plan.estimatedServings}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Suggested Portion Size</p>
                <p className="text-xl font-bold text-gray-900">{plan.suggestedPortionSize}g/person</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Distribution Time</p>
                <p className="text-xl font-bold text-gray-900">{plan.distributionTime || 'N/A'}</p>
              </div>
            </div>

            {plan.notes && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">{plan.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </ROBase>
  );
};

export default RODistribution;