import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the AuthContext

function ProtectedRoute() {
  const { currentUser } = useAuth(); // Access the currentUser from the context

  //   const auth = null; // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return currentUser ? <Outlet /> : <Navigate to="/login" />;

  //   return (
  //     <>
  //       {currentUser ? (
  //         <Outlet /> // Render the nested routes if the user is authenticated
  //       ) : (
  //         <Navigate to="/login" /> // Redirect to the login page if not authenticated
  //       )}
  //     </>
  //   );
}

export default ProtectedRoute;
