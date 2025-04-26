import api from "./api";
import TokenStorage from "../utils/TokenStorage";
import { RegisterData } from "@/types/authTypes";


export const postSignIn = async (login: string, password: string) => {
  const response = await api.post("/auth/signin", { login, password });
  return response.data;
};

export const postSignUp = async (regData: RegisterData) => {
  const response = await api.post("/auth/signup", regData);
  return response.data;
};

export const getUser = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const refreshToken = async () => {
  // const refreshToken = localStorage.getItem("refreshToken");
  const refreshToken = TokenStorage.getRefreshToken();
  if (!refreshToken) throw new Error("Нет refresh токена");

  const response = await api.post("/auth/refresh", { refreshToken });
  const { accessToken, refreshToken: newRefreshToken } = response.data;
  // saveToken(accessToken, newRefreshToken);
  TokenStorage.saveTokens(accessToken, newRefreshToken);
  return accessToken;
};

export const postLogOut = async () => {
  await api.post("/user/logout");
  // localStorage.removeItem("accessToken");
  // localStorage.removeItem("refreshToken");
  TokenStorage.removeTokens();
};
