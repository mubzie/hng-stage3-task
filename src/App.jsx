import React from "react";
import Gallery from "./components/Home/Galery";
import Login from "./components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Protected } from "./components/ProtectedRoute";

import { AuthProvider } from "./contexts/AuthContext";

import "./App.module.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Gallery />
        </Protected>
      ),
    },
    {
      path: "/gallery",
      element: (
        <Protected>
          <Gallery />
        </Protected>
      ),
    },
    {
      path: "/logIn",
      element: <Login />,
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
