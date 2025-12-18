import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // configurable por entorno
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Interceptor de response
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Manejo global de sesión expirada
//       console.error("Sesión expirada");
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
