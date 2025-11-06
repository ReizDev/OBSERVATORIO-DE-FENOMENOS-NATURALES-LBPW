document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("report-form");
  const reportsContainer = document.getElementById("reports-container");

  const savedReports = JSON.parse(localStorage.getItem("reports.json")) || [];
  const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;
const now = Date.now();

// Filtrar reportes que aún no han expirado
const validReports = savedReports.filter(report => {
  const reportTime = new Date(report.date).getTime();
  return now - reportTime < FIVE_HOURS_MS;
});

// Guardar solo los válidos
localStorage.setItem("reports", JSON.stringify(validReports));

validReports.forEach(report => renderReport(report));


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const location = document.getElementById("location").value.trim();

    const username = localStorage.getItem("username") || "Anónimo";
    const userPic = localStorage.getItem("userPic") || "img/default-user.png";

    if (!title || !description || !location) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    const newReport = {
      title,
      description,
      location,
      date: new Date().toLocaleString(),
      username,
      userPic
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
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 0.5rem;">
        <img src="${report.userPic}" alt="Usuario" width="32" height="32" style="border-radius: 50%;" />
        <strong>${report.username}</strong>
      </div>
      <h3>${report.title}</h3>
      <p><strong>Ubicación:</strong> ${report.location}</p>
      <p><strong>Descripción:</strong> ${report.description}</p>
      <p class="date">📅 Enviado el ${report.date}</p>
    `;
    reportsContainer.prepend(reportCard); 
  }
});
