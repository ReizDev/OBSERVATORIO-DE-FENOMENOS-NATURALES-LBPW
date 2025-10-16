const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

// Ruta para guardar reportes
app.post("/api/report", (req, res) => {
  const newReport = req.body;
  const filePath = path.join(__dirname, "data", "data/reports.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error al leer el archivo");

    const reports = JSON.parse(data);
    reports.push(newReport);

    fs.writeFile(filePath, JSON.stringify(reports, null, 2), (err) => {
      if (err) return res.status(500).send("Error al guardar el reporte");
      res.status(200).send("Reporte guardado correctamente");
    });
  });
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
