import React from 'react';
import { useQuery } from 'react-query';
import { tvShowsAPI } from '../services/api';

const TVShows = () => {
  console.log('🎬 TVShows component rendering...');
  
  const { data: showsData, isLoading, error } = useQuery(
    'tv-shows', 
    async () => {
      console.log('🚀 Starting API call to fetch TV shows...');
      const response = await tvShowsAPI.getAllShows();
      console.log('📡 Raw API response:', response);
      console.log('📊 Response data:', response.data);
      return response;
    },
    {
      onSuccess: (data) => {
        console.log('✅ Query successful! Data:', data);
      },
      onError: (error) => {
        console.error('❌ Query failed:', error);
        console.error('Error details:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
    }
  );

  console.log('🔍 Current state:', { showsData, isLoading, error });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <span className="ml-3">Loading TV Shows...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>❌ Error loading TV shows:</strong>
          <p className="mt-2">{error.message}</p>
          {error.response && (
            <div className="mt-2 text-sm">
              <p>Status: {error.response.status}</p>
              <p>URL: {error.config?.url}</p>
            </div>
          )}
          <p className="text-sm mt-2">
            Make sure the Rails API is running on http://localhost:3000
          </p>
        </div>
      </div>
    );
  }

  // Try different ways to extract the shows data
  console.log('🔍 Trying to extract shows from response...');
  
  let shows = [];
  if (showsData?.data?.tv_shows) {
    shows = showsData.data.tv_shows;
    console.log('✅ Found shows in data.tv_shows:', shows);
  } else if (showsData?.data?.data) {
    shows = showsData.data.data;
    console.log('✅ Found shows in data.data:', shows);
  } else if (showsData?.data) {
    shows = Array.isArray(showsData.data) ? showsData.data : [];
    console.log('✅ Found shows in data (array):', shows);
  } else if (Array.isArray(showsData)) {
    shows = showsData;
    console.log('✅ Found shows as direct array:', shows);
  }

  console.log('📺 Final shows array:', shows);
  console.log('📊 Shows count:', shows.length);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">TV Shows</h1>
        <div className="text-sm text-gray-500">
          Found {shows.length} shows
        </div>
      </div>

      {/* Debug info */}
      <div className="bg-gray-100 p-4 rounded text-sm">
        <h3 className="font-bold mb-2">🐛 Debug Info:</h3>
        <p><strong>API Response Structure:</strong></p>
        <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto">
          {JSON.stringify(showsData?.data, null, 2)}
        </pre>
      </div>
      
      {shows.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p><strong>No TV shows found.</strong></p>
            <p className="text-sm mt-2">
              The API responded but returned no shows. Check your Rails database.
            </p>
            <div className="mt-4 text-xs">
              <p>Try running in Rails console:</p>
              <code className="bg-white px-2 py-1 rounded">TvShow.create!(title: "Test Show", genre: "Drama")</code>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shows.map((show, index) => (
            <div key={show.id || index} className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {show.title || 'Untitled'}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {show.genre || 'No genre'}
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{show.total_seasons || 0} seasons</span>
                <span>⭐ {show.imdb_rating || 'N/A'}</span>
              </div>
              {show.description && (
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {show.description}
                </p>
              )}
              
              {/* Debug: Show raw data for first item */}
              {index === 0 && (
                <details className="mt-2">
                  <summary className="text-xs text-gray-400 cursor-pointer">Raw data</summary>
                  <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                    {JSON.stringify(show, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TVShows;