import React, { useState, useEffect } from "react";

const InputForm = ({ onSimulate }) => {
  const [teams, setTeams] = useState([]);
  const [models, setModels] = useState([]);
  const [availableTires, setAvailableTires] = useState(["soft", "medium", "hard"]);
  const [formData, setFormData] = useState({
    team: "",
    model: "",
    downforce: "",
    circuit: "",
    weather: "",
    tires: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/teams")
      .then((response) => response.json())
      .then((data) => setTeams(data));
  }, []);

  const handleTeamChange = (e) => {
    const selectedTeam = teams.find((t) => t.team === e.target.value);
    setModels(selectedTeam ? selectedTeam.models : []);
    setFormData({ ...formData, team: e.target.value, model: "" });
    setErrors({ ...errors, team: "" }); // Elimină eroarea la selectarea unei echipe
  };

  const handleWeatherChange = (e) => {
    const weather = e.target.value;
    const newTires = weather === "soare" ? ["soft", "medium", "hard"] : ["inters", "wet"];
    setAvailableTires(newTires);
    setFormData({ ...formData, weather, tires: newTires[0] });
    setErrors({ ...errors, weather: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Elimină eroarea la completarea câmpului
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.team) newErrors.team = "Selectați o echipă.";
    if (!formData.model) newErrors.model = "Selectați un model.";
    if (!formData.circuit) newErrors.circuit = "Selectați un circuit.";
    if (!formData.weather) newErrors.weather = "Selectați condițiile meteo.";
    if (!formData.tires) newErrors.tires = "Selectați pneurile.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True dacă nu există erori
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSimulate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>Echipă:</label>
      <select
        className={`form-select ${errors.team ? "is-invalid" : ""}`}
        name="team"
        onChange={handleTeamChange}
        required
      >
        <option value="">Selectează echipa</option>
        {teams.map((team) => (
          <option key={team.team} value={team.team}>
            {team.team}
          </option>
        ))}
      </select>
      {errors.team && <div className="invalid-feedback">{errors.team}</div>}

      <label>Model:</label>
      <select
        className={`form-select ${errors.model ? "is-invalid" : ""}`}
        name="model"
        onChange={handleChange}
        value={formData.model}
        required
      >
        <option value="">Selectează model</option>
        {models.map((model) => (
          <option key={model.name} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>
      {errors.model && <div className="invalid-feedback">{errors.model}</div>}

      <label>Downforce:</label>
      <select
        className="form-select"
        name="downforce"
        onChange={handleChange}
        required
      >
        <option value="">Selectează downforce</option>
        <option value="scazut">Scăzut</option>
        <option value="mediu">Mediu</option>
        <option value="ridicat">Ridicat</option>
      </select>

      <label>Circuit:</label>
      <select
        className={`form-select ${errors.circuit ? "is-invalid" : ""}`}
        name="circuit"
        onChange={handleChange}
      >
        <option value="">Selectează circuit</option>
        <option value="Silverstone">Silverstone</option>
        <option value="Monaco">Monaco</option>
        <option value="Spa-Francorchamps">Spa-Francorchamps</option>
        <option value="Monza">Monza</option>
        <option value="Suzuka">Suzuka</option>
        <option value="Circuit of the Americas">Circuit of the Americas</option>
        <option value="Interlagos">Interlagos</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Hungaroring">Hungaroring</option>
        <option value="Marina Bay">Marina Bay</option>
        <option value="Zandvoort">Zandvoort</option>
        <option value="Imola">Imola</option>
        <option value="Catalunya">Catalunya</option>
        <option value="Miami">Miami</option>
        <option value="Las Vegas">Las Vegas</option>
        <option value="Austria (Red Bull Ring)">Austria (Red Bull Ring)</option>
        <option value="Baku">Baku</option>
      </select>
      {errors.circuit && <div className="invalid-feedback">{errors.circuit}</div>}

      <label>Condiții Meteo:</label>
      <select
        className={`form-select ${errors.weather ? "is-invalid" : ""}`}
        name="weather"
        onChange={handleWeatherChange}
      >
        <option value="">Selectează condițiile meteo</option>
        <option value="soare">Soare</option>
        <option value="ploaie">Ploaie</option>
      </select>
      {errors.weather && <div className="invalid-feedback">{errors.weather}</div>}

      <label>Pneuri:</label>
      <select
        className={`form-select ${errors.tires ? "is-invalid" : ""}`}
        name="tires"
        onChange={handleChange}
        value={formData.tires}
      >
        <option value="">Selectează pneurile</option>
        {availableTires.map((tire) => (
          <option key={tire} value={tire}>
            {tire.charAt(0).toUpperCase() + tire.slice(1)}
          </option>
        ))}
      </select>
      {errors.tires && <div className="invalid-feedback">{errors.tires}</div>}

      <button type="submit" className="button-primary simulate-button">
        Simulează Performanța
      </button>
    </form>
  );
};

export default InputForm;
