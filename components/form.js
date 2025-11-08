document.getElementById("report-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;

  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
  const data = await response.json();

  if (data.length === 0) {
    alert("Ubicación no encontrada.");
    return;
  }

  const lat = parseFloat(data[0].lat);
  const lon = parseFloat(data[0].lon);

  // Añadir marcador
  L.marker([lat, lon])
    .addTo(window.map)
    .bindPopup(`📍 ${title}<br>${location}<br>${description}`)
    .openPopup();

  // Enviar al backend
  await fetch("/api/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, location, lat, lon }),
  });
    await fetch("/reports.js", {
    method: "POST",
    headers: { "Content-Type": "js/reports.js" },
    body: JSON.stringify({ title, description, location, lat, lon }),
  });


  alert("Reporte guardado y añadido al mapa.");
  this.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("username", "reiz");
  localStorage.setItem("userPic", "img/reiz-avatar.png");

  const name = localStorage.getItem("username");
  console.log("Bienvenido, " + name);
});



function guardarLocalmente(reporte) {
  const previos = JSON.parse(localStorage.getItem("reportes-local")) || [];
  previos.push(reporte);
  localStorage.setItem("reportes-local", JSON.stringify(previos));
}

function enviarAlServidor(reporte) {
  fetch("http://localhost:3000/api/reportes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reporte)
  })
  .then(res => res.text())
  .then(msg => {
    console.log("🪶 Confirmación del servidor:", msg);
  })
  .catch(err => {
    console.warn("⚠️ Servidor no disponible. Guardando localmente.");
    guardarLocalmente(reporte);
  });
}
