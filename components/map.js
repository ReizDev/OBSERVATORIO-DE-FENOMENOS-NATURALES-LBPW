document.addEventListener("DOMContentLoaded", () => {
  window.map = L.map("map").setView([25.6866, -100.3161], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(window.map);
});
