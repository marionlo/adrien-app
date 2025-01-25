import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import logo from './assets/logo.png';

export default function AddUATPage() {
  const navigate = useNavigate();

  const handleAddUAT = () => {
    navigate("/main-app");
  };

  return (
    <div className="App">
    <div className="header"><div> <img src={logo} alt="Logo" className="logo" /></div><div>Ulysse</div></div>
    <div className="contentWrapper">
      <h1 className="contentTitle">Add UAT</h1>
      <button onClick={handleAddUAT} className="submitButton">
        Add a UAT
      </button>
    </div>
    </div>
  );
}