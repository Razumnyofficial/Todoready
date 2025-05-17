import axiosInstance from "./axiosInstance";
import TokenStorage from "../utils/TokenStorage";
import { RegisterData } from "@/types/authTypes";

export const postSignIn = async (login: string, password: string) => {
  const response = await axiosInstance.post("/auth/signin", {
    login,
    password,
  });
  return response.data;
};

export const postSignUp = async (regData: RegisterData) => {
  const response = await axiosInstance.post("/auth/signup", regData);
  return response.data;
};

export const getUser = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data;
};

export const refreshToken = async () => {
  const refreshToken = TokenStorage.getRefreshToken();
  if (!refreshToken) throw new Error("Нет refresh токена");

  const response = await axiosInstance.post("/auth/refresh", { refreshToken });
  const { accessToken, refreshToken: newRefreshToken } = response.data;
  TokenStorage.saveTokens(accessToken, newRefreshToken);
  return accessToken;
};

export const postLogOut = async () => {
  await axiosInstance.post("/user/logout");
  TokenStorage.removeTokens();
};
