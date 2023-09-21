import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import fbConfig from "/fbConfig.js";
import fbConfig from "./firebase.js";
import { initializeApp } from "firebase/app";

const app = initializeApp(fbConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
