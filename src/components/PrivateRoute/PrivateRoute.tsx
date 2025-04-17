import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
