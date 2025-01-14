const express = require("express");
const axios = require("axios");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const TeamFactory = require("../factories/TeamFactory");

// Citește echipele din fișierul JSON si le genereaza dinamic.
const teamsFilePath = path.join(__dirname, "../data/teams.json");
const rawTeamsData = JSON.parse(fs.readFileSync(teamsFilePath, "utf-8"));

// Folosește Factory Pattern pentru a crea echipele.
const teams = rawTeamsData.map((teamData) =>
  TeamFactory.createTeam(
    teamData.team,
    teamData.models.map((model) =>
      TeamFactory.createModel(model.name, model.power, model.weight)
    )
  )
);

// Endpoint pentru a trimite echipele către frontend.
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


module.exports = router;
