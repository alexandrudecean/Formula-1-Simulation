const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const response = await axios.get("https://ergast.com/api/f1/current/drivers.json");
      const drivers = response.data.MRData.DriverTable.Drivers;
      res.json(drivers);
    } catch (error) {
      res.status(500).json({ error: "Eroare la obținerea datelor despre piloți activi." });
    }
  });
  

module.exports = router;
