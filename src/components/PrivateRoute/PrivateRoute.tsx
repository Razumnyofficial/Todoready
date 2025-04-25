import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { refreshToken } from "../../api/auth";
import  TokenStorage  from "../../utils/TokenStorage";
// import { getToken } from "../../utils/utils";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // const token = getToken();
      const token = TokenStorage.getAccessToken();
      // const refreshTokenValue = localStorage.getItem("refreshToken");
      const refreshTokenValue = TokenStorage.getRefreshToken();

      if (token) {
        setIsAuthenticated(true);
        return;
      }

      if (refreshTokenValue) {
        try {
          const newToken = await refreshToken();
          if (newToken) {
            setIsAuthenticated(true);
            return;
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
      setIsAuthenticated(false);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
