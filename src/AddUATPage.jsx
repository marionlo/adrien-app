import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import logo from "./assets/logo.png";

export default function AddUATPage() {
  const navigate = useNavigate();
  const [uatName, setUatName] = useState("");

  const handleAddUAT = () => {
    if (uatName.trim()) {
      sessionStorage.setItem("uatName", uatName);
      navigate("/main-app");
    } else {
      alert("Please enter a UAT name");
    }
  };

  return (
    <div className="App">
      <div className="header">
        <div><img src={logo} alt="Logo" className="logo" /></div>
        <div>Ulysse</div>
      </div>
      <div className="contentWrapper">
        <h1 className="contentTitle">Add UAT</h1>
        <input
          type="text"
          placeholder="Enter UAT name"
          value={uatName}
          onChange={(e) => setUatName(e.target.value)}
          className="uatInput"
        />
        <button onClick={handleAddUAT} className="submitButton">
          Add a UAT
        </button>
      </div>
    </div>
  );
}