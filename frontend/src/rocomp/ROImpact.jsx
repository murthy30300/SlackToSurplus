import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import ROBase from './ROBase';

const ROImpact = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedData = JSON.parse(localStorage.getItem('user') || '{"user":{"uid":""}}');
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const u = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(`http://localhost:1987/api/recipient/stats?organizationId=${storedData.user.uid}`);
        response.data;
        console.log('user id',storedData.user.uid)
        console.log('response data',response.data)
        setStats(response.data);
      } catch (error) {
       console.log(error)
        setError('Failed to fetch impact statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <ROBase>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </ROBase>
    );
  }

  if (error) {
    return (
      <ROBase>
        <div className="text-red-600 text-center">{error}</div>
      </ROBase>
    );
  }

  return (
    <ROBase>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Impact Tracker</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Total Food Received</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{stats?.totalReceived || 0}kg</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">People Fed</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">{stats?.peopleFed || 0}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Success Rate</h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">
              {stats?.successRate || 0}%
            </p>
          </div>
        </div>

        {/* Monthly Impact Chart would go here */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Impact</h3>
          {/* Add chart component here */}
        </div>
      </div>
    </ROBase>
  );
};

export default ROImpact;