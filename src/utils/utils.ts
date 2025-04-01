// сохраняем токен в локал

export const saveToken = (token: string, refreshToken: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
}

// получаем токены из локала
export const getToken =() =>{
    return localStorage.getItem("token");
}

// удаляем токены из локала
export const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
}