import React from "react";
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MainApp from "./MainApp";
import HomePage from "./HomePage";
import ProjectNamePage from "./ProjectNamePage";
import AddUATPage from "./AddUATPage";
import AddUATTransactionPage from "./AddUATTransactionPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/name-project" element={<ProjectNamePage />} />
        <Route path="/add-uat" element={<AddUATPage />} />
        <Route path="/add-uat-transaction" element={<AddUATTransactionPage />} />
        <Route path="/main-app" element={<MainApp />} />
      </Routes>
    </Router>
  );
}