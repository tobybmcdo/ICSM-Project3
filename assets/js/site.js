(function () {
  const config = window.SITE_CONFIG || {};
  const projects = window.PROJECTS || [];
  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });

  document.querySelectorAll(".menu-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
      document.querySelector(".primary-nav")?.classList.toggle("is-open", !expanded);
    });
  });

  document.querySelectorAll("[data-footer-links]").forEach((footer) => {
    const links = [];
    if (config.socialUrl) links.push(`<a href="${escapeAttribute(config.socialUrl)}" target="_blank" rel="noreferrer">${escapeHtml(config.socialLabel || "Social")}&nbsp; ↗</a>`);
    if (config.email) links.push(`<a href="mailto:${escapeAttribute(config.email)}">Email&nbsp; ↗</a>`);
    footer.innerHTML = links.length ? links.join("") : `<span class="footer-coming">Social + email links coming soon</span>`;
  });

  const grid = document.getElementById("project-grid");
  if (grid) {
    document.getElementById("project-count").textContent = String(projects.length).padStart(2, "0");
    document.getElementById("gallery-empty").hidden = projects.length > 0;
    grid.innerHTML = projects.map((project, index) => `
      <a class="project-card" href="project.html?id=${encodeURIComponent(project.slug)}">
        <div class="project-image"><img src="${escapeAttribute(project.cover)}" alt="${escapeAttribute(project.title)} production photograph" loading="lazy"><span class="image-number">${String(index + 1).padStart(2, "0")}</span><span class="card-arrow">↗</span></div>
        <div class="project-meta"><div><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.venue || "")}</p></div><span>${escapeHtml(project.year || "")}</span></div>
      </a>`).join("");
  }

  const detail = document.getElementById("project-detail");
  if (detail) {
    const id = new URLSearchParams(location.search).get("id");
    const project = projects.find((item) => item.slug === id);
    if (!project) {
      document.title = "Project not found — Toby McDonald Lighting Design";
      detail.innerHTML = `<a class="back-link" href="index.html#selected-work">← &nbsp;All projects</a><div class="not-found"><p class="eyebrow">Project not found</p><h1>This production hasn’t been added yet.</h1><a class="text-link" href="index.html#selected-work">Return to the project gallery&nbsp; ↗</a></div>`;
      return;
    }
    document.title = `${project.title} — Toby McDonald Lighting Design`;
    const images = (project.images || [project.cover]).filter(Boolean);
    detail.innerHTML = `<a class="back-link" href="index.html#selected-work">← &nbsp;All projects</a><section class="project-heading"><p class="eyebrow">${escapeHtml(project.role || "Lighting Design")} · ${escapeHtml(project.year || "")}</p><h1>${escapeHtml(project.title)}</h1><p class="project-venue">${escapeHtml(project.venue || "")}</p>${project.description ? `<p class="project-description">${escapeHtml(project.description)}</p>` : ""}</section><div class="project-gallery">${images.map((src, index) => `<figure><img src="${escapeAttribute(src)}" alt="${escapeAttribute(project.title)} production photograph ${index + 1}" ${index > 1 ? "loading=\"lazy\"" : ""}></figure>`).join("")}</div>`;
  }

  function escapeHtml(value) { return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char])); }
  function escapeAttribute(value) { return escapeHtml(value); }
})();
