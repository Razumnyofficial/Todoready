// сохраняем токен в локал

export const saveToken = (token: string, refreshToken: string) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("refreshToken", refreshToken);
};

// получаем токены из локала
export const getToken = () => {
  return sessionStorage.getItem("token");
};

// удаляем токены из локала
export const removeToken = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refreshToken");
};
