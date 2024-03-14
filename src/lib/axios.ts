import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://0.0.0.0:8037/api",
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default axiosInstance;
