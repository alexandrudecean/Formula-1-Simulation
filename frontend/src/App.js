import React from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SimulationPage from "./pages/SimulationPage";
import InfoPage from "./pages/InfoPage";
<Route path="/" element={<HomePage />} />


const App = () => {
  return (
    <Router>
      <header className="navbar">
        <div className="navbar-logo">
          <img src="/images/F1-logo.png" alt="Formula 1 Logo" />
        </div>
        <nav className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Acasă
          </NavLink>
          <NavLink
            to="/simulate"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Simulare
          </NavLink>
          <NavLink
            to="/info"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Informații
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/simulate" element={<SimulationPage />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </main>
      <footer>© 2025 Formula 1 Simulation. Toate drepturile rezervate.</footer>
    </Router>
  );
};

export default App;
