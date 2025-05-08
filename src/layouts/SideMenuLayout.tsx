import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "@/api/auth";
import TokenStorage from "@/utils/TokenStorage";
// import useAuthCheck from "@/hooks/useAuthCheck";
import SideMenu from "@/components/SideMenu";

function SideMenuLayout() {

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // const token = getToken();
        const token = TokenStorage.getAccessToken();
        // const refreshTokenValue = localStorage.getItem("refreshToken");
        const refreshTokenValue = TokenStorage.getRefreshToken();

        if (!token && refreshTokenValue) {
          try {
            const newToken = await refreshToken();
            if (newToken) {
              console.log("токен обновился");
              return;
            }
          } catch (error) {
            console.error("Ошибка рефреша", error);
          }
        }

        if (!token && !refreshTokenValue) {
          console.log("Нет токенов");
          navigate("/");
        }
      } catch (error) {
        console.error("Ошибка Авторизации", error);
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);
  ;

  return (
    <>
      <SideMenu />
      <Outlet />
    </>
  );
}

export default SideMenuLayout;
