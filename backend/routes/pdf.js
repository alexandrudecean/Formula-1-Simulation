const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const circuits = require("../data/circuits.json");
const teams = require("../data/teams.json");

router.post("/", (req, res) => {
  const requiredFields = ["lapTime", "maxSpeed", "circuit", "team", "model", "downforce", "weather", "tires"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Lipsesc câmpurile necesare: ${missingFields.join(", ")}`,
    });
  }

  const { lapTime, maxSpeed, bestLapTime, circuit, team, model, downforce, weather, tires } = req.body;

  // Caută circuitul selectat
  const selectedCircuit = circuits.find((c) => c.name === circuit);
  if (!selectedCircuit) {
    return res.status(400).json({ error: "Circuit invalid." });
  }
  const { length_km, turns, drs_zones } = selectedCircuit;

  // Caută echipa și modelul selectat
  const selectedTeam = teams.find((t) => t.team === team);
  if (!selectedTeam) {
    return res.status(400).json({ error: "Echipă invalidă." });
  }

  const selectedModel = selectedTeam.models.find((m) => m.name === model);
  if (!selectedModel) {
    return res.status(400).json({ error: "Model invalid." });
  }
  const { power, weight } = selectedModel;

  // Creează documentul PDF
  const doc = new PDFDocument({ margin: 50 });

  // Setează anteturile de răspuns pentru descărcare
  res.setHeader("Content-Disposition", "attachment; filename=Formula1_Report.pdf");
  res.setHeader("Content-Type", "application/pdf");

  // Trimite fluxul PDF direct către răspuns
  doc.pipe(res);

  // Adaugă conținutul PDF-ului
  doc.fontSize(24).text("Formula 1 Simulation Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(16).text("Detalii Selectie Utilizator", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Echipa: ${team}`);
  doc.text(`Model: ${model}`);
  doc.text(`Downforce: ${downforce}`);
  doc.text(`Conditii Meteo: ${weather}`);
  doc.text(`Pneuri: ${tires}`);
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();

  doc.fontSize(16).text("Detalii Circuit", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Nume Circuit: ${circuit}`);
  doc.text(`Lungime: ${length_km} km`);
  doc.text(`Numar de viraje: ${turns}`);
  doc.text(`Zone DRS: ${drs_zones}`);
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();

  doc.fontSize(16).text("Detalii Model Selectat", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Putere Motor: ${power} CP`);
  doc.text(`Greutate: ${weight} kg`);
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();

  doc.fontSize(16).text("Rezultate Simulare", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Timp pe Tur (Simulat): ${lapTime} secunde`);
  doc.text(`Viteza Maxima (Simulata): ${maxSpeed} km/h`);
  doc.text(`Timp pe Tur (Real): ${bestLapTime || "N/A"} secunde`);
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();

  // Finalizează documentul PDF
  doc.end();
});

module.exports = router;
