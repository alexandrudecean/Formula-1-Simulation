const express = require("express");
const router = express.Router();
const circuits = require("../data/circuits.json");
const teams = require("../data/teams.json");

router.post("/", (req, res) => {
  const { team, model, downforce, circuit, weather, tires } = req.body;

  // Selectare echipă si model
  const selectedTeam = teams.find((t) => t.team === team);
  if (!selectedTeam) {
    return res.status(400).json({ error: "Echipă invalidă" });
  }

  const selectedModel = selectedTeam.models.find((m) => m.name === model);
  if (!selectedModel) {
    return res.status(400).json({ error: "Model invalid" });
  }

  const { power, weight } = selectedModel;

  // Selectare circuit
  const selectedCircuit = circuits.find((c) => c.name === circuit);
  if (!selectedCircuit) {
    return res.status(400).json({ error: "Circuit invalid" });
  }

  const { length_km, turns, drs_zones } = selectedCircuit;

  const weatherPenalty = weather === "ploaie" ? 6.0 : 6.95; 
  const tireSpeedFactor =
    tires === "soft"
      ? 6.03
      : tires === "medium"
      ? 6.0
      : tires === "hard"
      ? 5.97
      : tires === "inters"
      ? 5.95
      :5.91;
  const downforceFactor = downforce === "scăzut" ? 6.03 : downforce === "ridicat" ? 5.97 : 6.0; 

  const drsSpeedBonus = drs_zones * 12.5; // viteza adaugata intre 10-15 km/h, medie 12.5 km/h

  // Calcul viteză maximă
  const maxSpeed =
    (power / weight) * tireSpeedFactor * downforceFactor * weatherPenalty + drsSpeedBonus;

  // Calcul viteză medie
  const averageSpeed = maxSpeed * (1 - 0.02 * turns); // Penalizare pentru viraje

  // Calcul timp pe tur
  const lapTime =
    (length_km / averageSpeed) * 3600 + 
    turns * (weight / 800) * (weather === "ploaie" ? 1.2 : 1.0) * (1 / tireSpeedFactor); 

  // Conversie timp în format minute:secunde.milisecunde
  const formatLapTime = (lapTime) => {
    const minutes = Math.floor(lapTime / 60);
    const seconds = Math.floor(lapTime % 60);
    const milliseconds = Math.round((lapTime % 1) * 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`;
  };

  const formattedLapTime = formatLapTime(lapTime);

  res.json({
    lapTime: formattedLapTime, 
    maxSpeed: maxSpeed.toFixed(2), 
  });
});

module.exports = router;