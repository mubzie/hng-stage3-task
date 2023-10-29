/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router-dom";
// import { Context } from "./AuthContext";
import { useAuth } from "../contexts/AuthContext";

export function Protected({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
}
