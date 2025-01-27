import React, { useState } from "react";
import InputForm from "../components/InputForm";
import "./SimulationPage.css";

const SimulationPage = () => {
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleSimulate = async (formData) => {
    setFormData(formData);

    // Preluare date simulate
    const response = await fetch("/api/simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const simulationData = await response.json();

    // Preluare timp real pe tur din API extern
    const lapTimeResponse = await fetch(
      `/api/teams/lap-time?team=${formData.team}&model=${formData.model}&circuit=${formData.circuit}`
    );
    const lapTimeData = await lapTimeResponse.json();

    setResults({
      ...simulationData,
      bestLapTime: lapTimeData.bestLapTime || null,
    });
  };

  const handleGeneratePDF = async () => {
    if (!formData || !results) {
      alert("Trebuie să completezi simularea înainte de a genera PDF-ul!");
      return;
    }

    const payload = {
      ...results,
      ...formData,
    };

    const response = await fetch("http://localhost:5000/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Formula1_Report.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="f1-container">
      <section className="description">
        <h2>Bun venit la Simularea Performanței Formula 1</h2>
        <p>
          Această aplicație vă permite să evaluați performanța unui monopost
          pe diferite circuite, în funcție de parametrii specifici ai modelului ales și de datele selectate.
          Introduceți datele în formularul de mai jos și descoperiți timpul pe
          tur și viteza maximă simulată!
        </p>
      </section>

      <InputForm onSimulate={handleSimulate} />

      {results && (
        <div className="results-card">
          <h2>Rezultate Simulare</h2>
          <p>
            <strong>Timp pe Tur (Simulat):</strong> {results.lapTime} secunde
          </p>
          <p>
            <strong>Viteză Maximă (Simulată):</strong> {results.maxSpeed} km/h
          </p>
          <p>
            <strong>Timp pe Tur (Real):</strong>{" "}
            {results.bestLapTime
              ? `${results.bestLapTime} secunde`
              : "Timpul real pe tur nu este disponibil"}
          </p>
          <button className="button-primary" onClick={handleGeneratePDF}>
            Descarcă Raportul PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default SimulationPage;
