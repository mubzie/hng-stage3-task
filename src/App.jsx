import { useState } from "react";
import Gallery from "./components/Home/Galery";
import Login from "./components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";
import { Protected } from "./components/ProtectedRoute";

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
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
