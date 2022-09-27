import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import AppStart from "../components/app-start/app-start.component";

function ProtectedRoute({ children }) {
  const { user, loadingUser } = useUserAuth();
  if (loadingUser) {
    return <AppStart />;
  }
  if (!user && !loadingUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
