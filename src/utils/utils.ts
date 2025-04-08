// сохраняем токен в локал

export const saveToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// получаем токены из локала
export const getToken = () => {
  return localStorage.getItem("accessToken");
};

// удаляем токены из локала
export const removeToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
