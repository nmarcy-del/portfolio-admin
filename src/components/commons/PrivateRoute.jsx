import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const expirationTime = useSelector((state) => state.auth.expirationTime);
  const dispatch = useDispatch();

  // Check if user is authentificated or if session is expired
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else if (Date.now() > expirationTime) {
    dispatch({ type: "SESSION_EXPIRED" });
    sessionStorage.removeItem("jwt-token");
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
