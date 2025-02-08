import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import logo from "./assets/logo.png";

export default function HomePage() {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate("/name-project");
  };

  const handleCreateUat = () => {
    navigate("/add-uat-transaction");
  }

  const fakeProjects = [
    { id: 1, name: "Prométhée" },
    { id: 2, name: "Thanos" },
    { id: 3, name: "Transaction", onClick: handleCreateUat },
  ];

  return (
    <div className="App">
      <div className="header">
        <div>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div>Ulysse</div>
      </div>
      <div className="contentWrapper">
        <h1 className="contentTitle">Welcome to Ulysse</h1>
        <button onClick={handleCreateProject} className="submitButton">
          Create Your Project
        </button>
        <div className="projectList">
          <h2>List of Projects</h2>
          <ul>
            {fakeProjects.map((project) => (
              <li 
                key={project.id} 
                className="projectItem" 
                onClick={project.name === "Transaction" ? handleCreateUat : undefined}
              >
                {project.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}