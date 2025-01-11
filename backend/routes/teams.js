const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const TeamFactory = require("../factories/TeamFactory");

// Citește echipele din fișierul JSON și generează-le dinamic.
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

module.exports = router;
