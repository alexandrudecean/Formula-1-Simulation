const express = require("express");
const axios = require("axios");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const TeamFactory = require("../factories/TeamFactory");

// Citește echipele din fișierul JSON și le generează dinamic
const teamsFilePath = path.join(__dirname, "../data/teams.json");
const rawTeamsData = JSON.parse(fs.readFileSync(teamsFilePath, "utf-8"));

// Folosește Factory Pattern pentru a crea echipele
const teams = rawTeamsData.map((teamData) =>
  TeamFactory.createTeam(
    teamData.team,
    teamData.models.map((model) =>
      TeamFactory.createModel(model.name, model.power, model.weight)
    )
  )
);

// Endpoint pentru a trimite echipele către frontend
router.get("/", (req, res) => {
  res.json(teams);
});

// Endpoint pentru piloți din ultimii 3 ani
router.get("/drivers", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const driverData = [];

    for (let year = currentYear - 2; year <= currentYear; year++) {
      const response = await axios.get(`https://api.openf1.org/v1/drivers?season=${year}`);
      driverData.push(...response.data);
    }

    res.json(driverData);
  } catch (error) {
    console.error("Eroare la preluarea datelor despre piloți:", error);
    res.status(500).json({ error: "Eroare la preluarea datelor despre piloți" });
  }
});

// Endpoint pentru a obține timp pe tur din API-ul Ergast
router.get("/lap-time", async (req, res) => {
  const { team, model, circuit } = req.query;

  try {
    const circuitsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/circuits.json"), "utf-8")
    );
    const teamsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/teams.json"), "utf-8")
    );

    const selectedCircuit = circuitsData.find((c) => c.name === circuit);
    const selectedTeam = teamsData.find((t) => t.team === team);
    const selectedModel = selectedTeam?.models.find((m) => m.name === model);

    if (!selectedCircuit || !selectedModel) {
      return res.status(404).json({
        error: "Circuitul sau modelul specificat nu a fost găsit în datele noastre.",
      });
    }

    const { season } = selectedModel;

    // Obține programul complet pentru sezonul selectat
    const scheduleResponse = await axios.get(
      `https://ergast.com/api/f1/${season}.json`
    );
    const races = scheduleResponse.data.MRData.RaceTable.Races;

    // Găsește cursa corespunzătoare circuitului selectat
    const race = races.find((r) =>
      r.raceName.toLowerCase().includes(selectedCircuit.apiName.toLowerCase())
    );

    if (!race) {
      return res.status(404).json({
        error: "Cursa nu a fost găsită pentru acest circuit și sezon.",
      });
    }

    const round = race.round;

    // Obține datele de calificare pentru runda respectivă
    const qualifyingResponse = await axios.get(
      `https://ergast.com/api/f1/${season}/${round}/constructors/${selectedTeam.apiId}/qualifying.json`
    );

    const qualifyingData =
      qualifyingResponse.data.MRData.RaceTable.Races[0]?.QualifyingResults;

    const bestLapTime = qualifyingData
      ? qualifyingData.find((result) => result.Q3)?.Q3
      : null;

    res.json({ bestLapTime: bestLapTime || "Timp indisponibil" });
  } catch (error) {
    console.error("Eroare la preluarea timpului real pe tur:", error);
    res.status(500).json({ error: "Eroare la preluarea timpului real pe tur." });
  }
});

module.exports = router;
