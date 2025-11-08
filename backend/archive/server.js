//servidor de prueba para guardado de informacion
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const archivo = path.join(__dirname, "reportes.json");

app.post("/api/reportes", (req, res) => {
  const nuevoReporte = req.body;

  let reportes = [];
  if (fs.existsSync(archivo)) {
    const contenido = fs.readFileSync(archivo, "utf-8");
    reportes = JSON.parse(contenido);
  }

  reportes.push(nuevoReporte);
  fs.writeFileSync(archivo, JSON.stringify(reportes, null, 2));

  res.status(200).json({ mensaje: "Reporte guardado en archivo JSON." });
});

app.listen(PORT, () => {
  console.log(`🛰️ Servidor escuchando en http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("El observatorio está activo y receptivo.");
});


//esta parte no es del todo funcional ,se puede cambiar o borrar de manera definida

//prueba


//prueba 2
app.post("/api/usuarios", (req, res) => {
  const archivo = path.join(__dirname, "usuarios.json");
  const nuevoUsuario = req.body;

  let usuarios = [];
  if (fs.existsSync(archivo)) {
    const contenido = fs.readFileSync(archivo, "utf-8");
    usuarios = JSON.parse(contenido);
  }

  usuarios.push(nuevoUsuario);
  fs.writeFileSync(archivo, JSON.stringify(usuarios, null, 2));

  res.status(201).send("🪶 Usuario registrado en el archivo de legado.");
});

