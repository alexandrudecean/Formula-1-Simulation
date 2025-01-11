import React from "react";
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
          <Link to="/">Acasă</Link>
          <Link to="/simulate">Simulare</Link>
          <Link to="/info">Informații</Link>
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
