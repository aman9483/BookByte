// ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (loading) {
    // Handle the loading state here, for example, show a loading spinner.
    return null;
  }

  return isAuthenticated ? (
    isAdmin && user.role !== "admin" ? (
      navigate("/login", { replace: true })
    ) : (
      <Outlet />
    )
  ) : (
    navigate("/login", { replace: true })
  );
};

export default ProtectedRoute;
