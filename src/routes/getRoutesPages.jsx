/* eslint-disable no-unused-vars */
import React from "react";
import Gallery from "../components/Home/Galery";
import Login from "../components/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import { Protected } from "./ProtectedRoute";

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

export default router;
