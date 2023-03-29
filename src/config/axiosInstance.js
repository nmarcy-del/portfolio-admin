import axios from "axios";
import config from "./config";

const axiosInstance = axios.create({
  baseURL: config.backendBaseUrl,
});

axiosInstance.interceptors.request.use((requestConfig) => {
  const token = sessionStorage.getItem("jwt-token");
  if (token) {
    requestConfig.headers["Authorization"] = `Bearer ${token}`;
  }
  return requestConfig;
});

export default axiosInstance;
