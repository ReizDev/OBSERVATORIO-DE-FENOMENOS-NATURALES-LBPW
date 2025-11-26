// 
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;
const archivo = path.join(__dirname, "reportes.json");

app.use(cors());
app.use(express.json());

//  Ruta raíz
app.get("/", (req, res) => {
  res.send("🌐 No deberías estar husmeando cosas ajenas.");
});

// Guardar reporte en JSON
app.post("/api/reportes", (req, res) => {
  const nuevoReporte = req.body;
  let reportes = [];

  if (fs.existsSync(archivo)) {
    reportes = JSON.parse(fs.readFileSync(archivo, "utf-8"));
  }

  reportes.push(nuevoReporte);
  fs.writeFileSync(archivo, JSON.stringify(reportes, null, 2));

  res.status(200).json({ mensaje: "✅ Reporte archivado con éxito. Tu presencia ha sido registrada en el Observatorio." });
});

// Estadísticas por tipo
app.get("/api/stats", (req, res) => {
  if (!fs.existsSync(archivo)) return res.json({ total: 0, porTipo: {} });

  const reportes = JSON.parse(fs.readFileSync(archivo, "utf-8"));
  const porTipo = reportes.reduce((acc, r) => {
    acc[r.tipo] = (acc[r.tipo] || 0) + 1;
    return acc;
  }, {});

  res.json({ total: reportes.length, porTipo });
});

// Últimos reportes
app.get("/api/ultimos-reportes", (req, res) => {
  if (!fs.existsSync(archivo)) return res.json([]);
  const reportes = JSON.parse(fs.readFileSync(archivo, "utf-8"));
  res.json(reportes.slice(-10).reverse());
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http//localhost:${PORT}`);
});
