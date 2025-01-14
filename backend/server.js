const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", methods: "GET,POST" }));


const simulationRoutes = require("./routes/simulation");
app.use("/api/simulation", simulationRoutes);

const teamsRoutes = require("./routes/teams");
app.use("/api/teams", teamsRoutes);

const pdfRoutes = require("./routes/pdf");
app.use("/api/generate-pdf", pdfRoutes);

const driversRoutes = require("./routes/drivers");
app.use("/api/drivers", driversRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Serverul rulează pe portul ${PORT}`));
