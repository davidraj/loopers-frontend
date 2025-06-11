import axios from 'axios';

// For React apps running in browser, always use localhost
const API_BASE_URL = 'http://localhost:3000';
const DEBUG = process.env.REACT_APP_DEBUG === 'true';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Only add interceptors if debug is enabled
if (DEBUG) {
  api.interceptors.request.use(
    (config) => {
      const fullUrl = `${config.baseURL}${config.url}`;
      console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${fullUrl}`);
      return config;
    },
    (error) => {
      console.error('❌ Request setup error:', error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log('✅ Response received:', {
        status: response.status,
        url: response.config.url
      });
      return response;
    },
    (error) => {
      console.error('❌ Response error:', {
        message: error.message,
        status: error.response?.status,
        url: error.config?.url
      });
      return Promise.reject(error);
    }
  );
}

export const tvShowsAPI = {
  getAllShows: (params = {}) => api.get('/api/v1/tv_shows', { params }),
  getShow: (id) => api.get(`/api/v1/tv_shows/${id}`),
  createShow: (data) => api.post('/api/v1/tv_shows', { tv_show: data }),
  updateShow: (id, data) => api.put(`/api/v1/tv_shows/${id}`, { tv_show: data }),
  deleteShow: (id) => api.delete(`/api/v1/tv_shows/${id}`),
  getAllDistributors: () => api.get('/api/v1/distributors'),
  getEpisodeStats: () => api.get('/api/v1/analytics/episode_stats'),
  healthCheck: () => api.get('/health'),
};

export default api;