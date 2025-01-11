const express = require("express");
const router = express.Router();
const circuits = require("../data/circuits.json");
const teams = require("../data/teams.json");

router.post("/", (req, res) => {
  const { team, model, downforce, circuit, weather, tires } = req.body;

  // Selectare echipă și model
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

  // Factori ajustabili
  const weatherPenalty = weather === "ploaie" ? 0.95 : 1.0; // Viteză mai mică pe ploaie
  const tireSpeedFactor =
    tires === "soft"
      ? 1.03
      : tires === "medium"
      ? 1.0
      : tires === "hard"
      ? 0.97
      : tires === "inters"
      ? 0.95
      :0.91;
  const downforceFactor = downforce === "scăzut" ? 1.03 : downforce === "ridicat" ? 0.97 : 1.0; // Ajustare moderată pentru downforce

  // Efect DRS
  const drsSpeedBonus = drs_zones * 12.5; // Bonus fix între 10-15 km/h, medie 12.5 km/h

  // Calcul viteză maximă
  const speedScalingFactor = 230; // Factor de scalare bazat pe valori reale (viteza în km/h)
  const maxSpeed =
    (power / weight) * speedScalingFactor * tireSpeedFactor * downforceFactor * weatherPenalty + drsSpeedBonus;

  // Calcul viteză medie
  const averageSpeed = maxSpeed * (1 - 0.01 * turns); // Penalizare pentru viraje

  // Calcul timp pe tur
  const lapTime =
    (length_km / averageSpeed) * 3600 + // Timp bazat pe viteză medie
    turns * (weight / 800) * (weather === "ploaie" ? 1.2 : 1.0) * (1 / tireSpeedFactor); // Penalizări pentru viraje și vreme

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
    lapTime: formattedLapTime, // Timp pe tur formatat
    maxSpeed: maxSpeed.toFixed(2), // Viteza maximă
  });
});

module.exports = router;