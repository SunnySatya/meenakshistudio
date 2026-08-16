import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("royalphotography_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("royalphotography_token");
      localStorage.removeItem("royalphotography_user");
    }
    return Promise.reject(error);
  },
);

export default api;
