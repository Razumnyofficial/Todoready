import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/utils";
import React, { useEffect, useState } from "react";
import { refreshToken } from "../../api/auth";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      const refreshTokenValue = localStorage.getItem("refreshToken");

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

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
