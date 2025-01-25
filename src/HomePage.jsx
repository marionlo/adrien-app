import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import logo from './assets/logo.png';

export default function HomePage() {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate("/name-project");
  };

  return (
    <div className="App">
    <div className="header"><div> <img src={logo} alt="Logo" className="logo" /></div><div>Ulysse</div></div>
    <div className="contentWrapper">
        <h1 className="contentTitle">Welcome to Ulysse</h1>
        <button onClick={handleCreateProject} className="submitButton">
            Create Your Project
        </button>
    </div>
    </div>
  );
}