import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MainApp from "./MainApp";
import HomePage from "./HomePage";
import ProjectNamePage from "./ProjectNamePage";
import AddUATPage from "./AddUATPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/name-project" element={<ProjectNamePage />} />
        <Route path="/add-uat" element={<AddUATPage />} />
        <Route path="/main-app" element={<MainApp />} />
      </Routes>
    </Router>
  );
}