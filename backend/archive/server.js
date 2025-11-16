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
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("🌐 El observatorio está activo y receptivo.");
});


//esta parte no es del todo funcional ,se puede cambiar o borrar de manera definida
app.get("/archivo", (req, res) => {
  const archivo = path.join(__dirname, "reportes.json");

  if (!fs.existsSync(archivo)) {
    return res.send("<h2>🪶 No hay reportes archivados aún.</h2>");
  }

  const contenido = fs.readFileSync(archivo, "utf-8");
  const reportes = JSON.parse(contenido);

  let html = `
    <html>
      <head>
        <title>Archivo de Presencia</title>
        <style>
          body { font-family: sans-serif; background: #f4f4f4; padding: 2rem; }
          h1 { text-align: center; color: #333; }
          .reporte { background: white; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; box-shadow: 0 0 5px rgba(0,0,0,0.1); }
          .usuario { display: flex; align-items: center; gap: 10px; margin-bottom: 0.5rem; }
          .usuario img { border-radius: 50%; width: 32px; height: 32px; }
        </style>
      </head>
      <body>
        <h1>🪶 Archivo de Presencia Digital</h1>
  `;

  reportes.forEach(r => {
    html += `
      <div class="reporte">
        <div class="usuario">
          <img src="${r.userPic || 'img/default-user.png'}" alt="Usuario" />
          <strong>${r.username || 'Anónimo'}</strong>
        </div>
        <h3>${r.title}</h3>
        <p><strong>Ubicación:</strong> ${r.location}</p>
        <p><strong>Descripción:</strong> ${r.description}</p>
        <p><em>📅 Enviado el ${r.date}</em></p>
      </div>
    `;
  });

  html += `</body></html>`;
  res.send(html);
});
