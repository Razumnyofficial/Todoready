import axios from "axios";
import { saveToken } from "../utils/utils";

//Вход
export const postSignIn = async (login: string, password: string) => {
  try {
    const response = await axios.post(
      "https://easydev.club/api/v1/auth/signin",
      {
        login,
        password,
      }
    );
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error + "Регестрация не прошла");
    throw error;
  }
};

// Регестрация

export const postSignUp = async (
  email: string,
  login: string,
  password: string,
  phoneNumber: string,
  username: string
) => {
  try {
    const response = await axios.post(
      "https://easydev.club/api/v1/auth/signup",
      {
        email,
        login,
        password,
        phoneNumber,
        username,
      }
    );
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Выход из системы

export const postLogOut = async () => {
  try {
    await axios.post(
      "https://easydev.club/api/v1/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Выход из системы");
    console.log(localStorage.getItem("token"));

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.log(error + "Ошибка при выходе ");
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(
      "https://easydev.club/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Refresh token not found");
    const response = await axios.post(
      "https://easydev.club/api/v1/auth/refresh",
      {
        refreshToken,
      }
    );
    console.log(response);

    const { token, refreshToken: newRefreshToken } = response.data;
    saveToken(token, newRefreshToken);
    return token;
  } catch (error) {
    console.log(error + "Ошибка при обновлении токена");
  }
};
