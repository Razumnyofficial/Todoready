import axios from "axios";
import  TokenStorage  from "../utils/TokenStorage";
import { refreshToken } from "./auth";

const api = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

api.interceptors.request.use((config) => {
  // const accessToken = localStorage.getItem("accessToken");
  const accessToken = TokenStorage.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("refreshToken");
        TokenStorage.removeTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
