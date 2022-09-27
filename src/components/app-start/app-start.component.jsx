import React from "react";
import "./app-start.styles.css";
import LinearProgress from "@mui/material/LinearProgress";
import logo from "../../assets/images/logo.png";

// Loader Animation
function AppStart() {
  return (
    <div className="app-start">
      <img src={logo} alt="Logo" />
      <LinearProgress className="progress" />
    </div>
  );
}

export default AppStart;
