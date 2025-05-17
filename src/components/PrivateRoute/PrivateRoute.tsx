import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getUser, refreshToken } from "@/api/auth";
import TokenStorage from "@/utils/TokenStorage";
// import { getToken } from "../../utils/utils";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = TokenStorage.getAccessToken();
      const refreshTokenValue = TokenStorage.getRefreshToken();
      if (!token && !refreshTokenValue) {
        setIsAuthenticated(false);
        return;
      }
      if (token) {
        try {
          await getUser();
          setIsAuthenticated(true);
          return;
        } catch (error) {
          console.log(error)
          if (refreshTokenValue) {
            try {
              const newToken = await refreshToken();
              if (newToken) {
                setIsAuthenticated(true);
                return;
              }
            } catch (refreshError) {
              console.log(refreshError)
              setIsAuthenticated(false);
              return;
            }
          }
          setIsAuthenticated(false);
          return;
        }
      }
      if (refreshTokenValue) {
        try {
          const newToken = await refreshToken();
          if (newToken) {
            setIsAuthenticated(true);
            return;
          }
        } catch (error) {
          console.log(error)
          setIsAuthenticated(false);
          return;
        }
      }

      setIsAuthenticated(false);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/page" />;
};

export default PrivateRoute;
