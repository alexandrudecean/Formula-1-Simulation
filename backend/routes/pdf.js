const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const circuits = require("../data/circuits.json");
const teams = require("../data/teams.json");

router.post("/", (req, res) => {
  const { lapTime, maxSpeed, circuit, team, model, downforce, weather, tires } = req.body;

  // Caută circuitul selectat
  const selectedCircuit = circuits.find((c) => c.name === circuit);
  const { length_km, turns, drs_zones } = selectedCircuit;

  // Caută echipa și modelul selectat
  const selectedTeam = teams.find((t) => t.team === team);
  const selectedModel = selectedTeam.models.find((m) => m.name === model);
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

  // Secțiune: Detalii utilizator
  doc.fontSize(16).text("Detalii Selectie Utilizator", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Echipa: ${team}`);
  doc.text(`Model: ${model}`);
  doc.text(`Downforce: ${downforce}`);
  doc.text(`Conditii Meteo: ${weather}`);
  doc.text(`Pneuri: ${tires}`);
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Linie separatoare
  doc.moveDown();

  // Secțiune: Detalii Circuit
  doc.fontSize(16).text("Detalii Circuit", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Nume Circuit: ${circuit}`);
  doc.text(`Lungime: ${length_km} km`);
  doc.text(`Numar de viraje: ${turns}`);
  doc.text(`Zone DRS: ${drs_zones}`);
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Linie separatoare
  doc.moveDown();

  // Secțiune: Detalii Model
  doc.fontSize(16).text("Detalii Model Selectat", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Putere Motor: ${power} CP`);
  doc.text(`Greutate: ${weight} kg`);
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Linie separatoare
  doc.moveDown();

  // Secțiune: Rezultate Simulare
  doc.fontSize(16).text("Rezultate Simulare", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Timp pe Tur: ${lapTime} secunde`);
  doc.text(`Viteza Maxima: ${maxSpeed} km/h`);
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Linie separatoare
  doc.moveDown();

  // Încheie documentul
  doc.end();
});



module.exports = router;
