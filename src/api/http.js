import axios from "axios";

const http = axios.create({
  baseURL:
    `${import.meta.env.VITE_APP_BASE_URL}/api` || "http://127.0.0.1:8000/api",
});

// baseURL: "http://3.110.154.53:8001/api",

const publicEndpoints = ["/sendOTP", "/verifyOTP", "/auth/register"];

http.interceptors.request.use(
  (config) => {
    if (publicEndpoints.some((url) => config.url.includes(url))) {
      return config;
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.response?.data?.msg ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  }
);

export default http;
