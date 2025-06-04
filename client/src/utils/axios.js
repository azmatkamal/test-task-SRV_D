import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5555/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally log requests
API.interceptors.request.use(
  (config) => {
    console.log("🔄 Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Optionally log responses
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;
