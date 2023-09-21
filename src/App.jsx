import { useState, Fragment } from "react";
import Gallery from "./components/Home/Galery";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";

import "./App.module.css";

// function App() {
//   return (
//     <>
//       <Login />
//       {/* <Gallery /> */}
//     </>
//   );
// }

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Gallery />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
