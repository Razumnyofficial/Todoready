import axios from "axios";
import { refreshToken } from "./auth";
import TokenStorage from "@/utils/TokenStorage";

const axiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = TokenStorage.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/signin"
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        TokenStorage.removeTokens();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
