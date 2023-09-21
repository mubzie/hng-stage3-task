import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the AuthContext

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth(); // Access the currentUser from the context

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
