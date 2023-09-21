import { useState, Fragment } from "react";
import Gallery from "./components/Home/Galery";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Gallery />} />
          </Route>
          {/* <Route path="/login" element={<Login />} />  */}
          <Route path="/login" element={<Login />} />
          {/* <ProtectedRoute> */}
          {/* <Route path="/gallery" element={<Gallery />} /> */}
          {/* </ProtectedRoute> */}
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
