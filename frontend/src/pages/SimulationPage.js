import React, { useState } from "react";
import InputForm from "../components/InputForm";
import "./SimulationPage.css";

const SimulationPage = () => {
  // State-uri pentru rezultatele simulării și datele utilizatorului
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState(null);

  // Funcție pentru a simula performanța
  const handleSimulate = async (formData) => {
    setFormData(formData); // Salvează datele utilizatorului
    const response = await fetch("/api/simulation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setResults(data);
  };

  // Funcție pentru generarea PDF-ului
  const handleGeneratePDF = async () => {
    if (!formData || !results) {
      alert("Trebuie să completezi simularea înainte de a genera PDF-ul!");
      return;
    }

    const payload = {
      ...results, // Include rezultatele simulării
      ...formData, // Include datele selectate de utilizator
    };

    const response = await fetch("http://localhost:5000/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Descarcă fișierul
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
          pe diferite circuite, în funcție de parametrii specifici ai modelului ales si de datele selectate.
          Introduceți datele în formularul de mai jos și descoperiți timpul pe
          tur și viteza maximă simulată!
        </p>
      </section>

      <InputForm onSimulate={handleSimulate} />

      {results && (
        <div className="results-card">
          <h2>Rezultate Simulare</h2>
          <p>
            <strong>Timp pe Tur:</strong> {results.lapTime} secunde
          </p>
          <p>
            <strong>Viteză Maximă:</strong> {results.maxSpeed} km/h
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
