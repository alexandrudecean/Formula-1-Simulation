import React, { useState, useEffect } from "react";

const InputForm = ({ onSimulate }) => {
  const [teams, setTeams] = useState([]);
  const [models, setModels] = useState([]);
  const [availableTires, setAvailableTires] = useState(["soft", "medium", "hard"]); // Pneuri inițiale
  const [formData, setFormData] = useState({
    team: "",
    model: "",
    downforce: "mediu",
    circuit: "Silverstone",
    weather: "soare",
    tires: "soft",
  });

  // Fetch teams from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/teams")
      .then((response) => response.json())
      .then((data) => setTeams(data));
  }, []);

  // Update models when the team changes
  const handleTeamChange = (e) => {
    const selectedTeam = teams.find((t) => t.team === e.target.value);
    setModels(selectedTeam ? selectedTeam.models : []);
    setFormData({ ...formData, team: e.target.value, model: "" });
  };

  // Update tires based on weather conditions
  const handleWeatherChange = (e) => {
    const weather = e.target.value;
    const newTires = weather === "soare" ? ["soft", "medium", "hard"] : ["inters", "wet"];
    setAvailableTires(newTires);
    setFormData({ ...formData, weather, tires: newTires[0] }); // Setăm automat primul tip de pneu valabil
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSimulate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>Echipă:</label>
      <select
        className="form-select"
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

      <label>Model:</label>
      <select
        className="form-select"
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

      <label>Downforce:</label>
      <select className="form-select" name="downforce" onChange={handleChange}>
        <option value="scăzut">Scăzut</option>
        <option value="mediu">Mediu</option>
        <option value="ridicat">Ridicat</option>
      </select>

      <label>Circuit:</label>
      <select className="form-select" name="circuit" onChange={handleChange}>
        <option value="Silverstone">Silverstone</option>
        <option value="Monaco">Monaco</option>
        <option value="Spa-Francorchamps">Spa-Francorchamps</option>
        <option value="Monza">Monza</option>
        <option value="Suzuka">Suzuka</option>
        <option value="Circuit of the Americas">Circuit of the Americas</option>
        <option value="Yas Marina">Yas Marina</option>
        <option value="Interlagos">Interlagos</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Hungaroring">Hungaroring</option>
        <option value="Marina Bay">Marina Bay</option>
        <option value="Zandvoort">Zandvoort</option>
        <option value="Imola">Imola</option>
        <option value="Catalunya">Catalunya</option>
        <option value="Jeddah">Jeddah</option>
        <option value="Miami">Miami</option>
        <option value="Las Vegas">Las Vegas</option>
        <option value="Austria (Red Bull Ring)">Austria (Red Bull Ring)</option>
        <option value="Baku">Baku</option>
        <option value="Canada (Circuit Gilles Villeneuve)">Canada (Circuit Gilles Villeneuve)</option>
      </select>

      <label>Condiții Meteo:</label>
      <select className="form-select" name="weather" onChange={handleWeatherChange}>
        <option value="soare">Soare</option>
        <option value="ploaie">Ploaie</option>
      </select>

      <label>Pneuri:</label>
      <select className="form-select" name="tires" onChange={handleChange} value={formData.tires}>
        {availableTires.map((tire) => (
          <option key={tire} value={tire}>
            {tire.charAt(0).toUpperCase() + tire.slice(1)}
          </option>
        ))}
      </select>

      <button type="submit" className="button-primary simulate-button">
        Simulează Performanța
      </button>

    </form>
  );
};

export default InputForm;
