document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("report-form");
  const reportsContainer = document.getElementById("reports-container");

  const savedReports = JSON.parse(localStorage.getItem("reports")) || [];
  savedReports.forEach(report => renderReport(report));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const location = document.getElementById("location").value.trim();

    if (!title || !description || !location) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    const newReport = {
      title,
      description,
      location,
      date: new Date().toLocaleString()
    };

    renderReport(newReport);

    savedReports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(savedReports));

    form.reset();

    alert("✅ Reporte enviado correctamente.");
  });

  function renderReport(report) {
    const reportCard = document.createElement("div");
    reportCard.classList.add("report-card");
    reportCard.innerHTML = `
      <h3>${report.title}</h3>
      <p><strong>Ubicación:</strong> ${report.location}</p>
      <p><strong>Descripción:</strong> ${report.description}</p>
      <p class="date">📅 Enviado el ${report.date}</p>
    `;
    reportsContainer.prepend(reportCard); 
  }
});