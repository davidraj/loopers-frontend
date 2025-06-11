import React from 'react';
import { useQuery } from 'react-query';
import { tvShowsAPI } from '../services/api';

const Home = () => {
  const { data: healthData } = useQuery('health', tvShowsAPI.healthCheck);

  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to TV Shows Manager
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your favorite TV shows and episodes
        </p>
        
        {healthData && (
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>API Connected</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;