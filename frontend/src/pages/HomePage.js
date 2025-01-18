import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1 className="homepage-title">Formula 1 Simulation</h1>
        <p className="homepage-description">
          Formula 1 este cel mai rapid sport pe patru roți, unde echipele și piloții își testează limitele pe cele mai dificile circuite din lume. Este combinația dintre inovație și performanță omului.
        </p>

        <div className="simulation-section">
          <p className="simulation-text">
            Descoperă performanța monoposturilor de Formula 1 pe diferite circuite și condiții.
            Experimentează viteza și puterea simulând timpuri pe tur și viteze maxime atinse.
          </p>
          <button
            className="button-primary"
            onClick={() => navigate("/simulate")}
          >Mergi la Simulare
          </button>
        </div>

        <div className="info-section">
          <button
            className="button-secondary"
            onClick={() => navigate("/info")}
          >
            Află mai multe despre Formula 1
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
