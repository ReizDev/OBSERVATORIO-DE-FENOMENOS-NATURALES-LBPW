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

  alert("Reporte guardado y añadido al mapa.");
  this.reset();
});


document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
