import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('BikeToken'); // Or sessionStorage
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle token expiration globally here
    if (error.response?.status === 401) {
      console.warn('Unauthorized: Possibly invalid or expired token');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
