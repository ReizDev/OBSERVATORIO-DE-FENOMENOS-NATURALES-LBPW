document.getElementById("report-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;

  // Geolocalizar usando Nominatim
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
  const data = await response.json();

  if (data.length === 0) {
    alert("Ubicación no encontrada. Intenta ser más específico.");
    return;
  }

  const lat = parseFloat(data[0].lat);
  const lon = parseFloat(data[0].lon);

  // Crear marcador en el mapa
  L.marker([lat, lon])
    .addTo(window.map)
    .bindPopup(`📍 ${title}<br>${location}<br>${description}`)
    .openPopup();

  alert("Reporte añadido al mapa.");
  this.reset();
});
