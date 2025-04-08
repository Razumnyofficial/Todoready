import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../api/auth";
import { getToken } from "../utils/utils";

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();

      if (!token) {
        const newToken = await refreshToken();

        if (!newToken) {
          console.log("Redirecting to login...");
          navigate("/login");
        } else {
          console.log("Token successfully refreshed");
        }
      }
    };

    checkAuth();
  }, [navigate]);
};

export default useAuthCheck;
