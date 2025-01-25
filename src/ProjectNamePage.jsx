import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import logo from './assets/logo.png';

export default function ProjectNamePage() {
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (projectName) {
      sessionStorage.setItem("projectName", projectName); // Save the project name
      navigate("/add-uat");
    } else {
      alert("Please enter a project name.");
    }
  };

  return (
    <div className="App">
    <div className="header"><div> <img src={logo} alt="Logo" className="logo" /></div><div>Ulysse</div></div>
    <div className="contentWrapper">
        <h1 className="contentTitle">Name Your Project</h1>
        <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            className="input"
        />
        <button onClick={handleNext} className="submitButton">
            Next
        </button>
    </div>
    </div>
  );
}