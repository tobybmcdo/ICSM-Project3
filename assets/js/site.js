(function () {
  const config = window.SITE_CONFIG || {};
  const projects = window.PROJECTS || [];

  const header = document.querySelector(".site-header");
  if (header) {
    let compact = false;
    const updateHeader = () => {
      if (!compact && window.scrollY > 96) compact = true;
      else if (compact && window.scrollY < 24) compact = false;
      header.classList.toggle("is-compact", compact);
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  document.querySelectorAll("[data-footer-links]").forEach((footer) => {
    const links = [];
    if (config.socialUrl) {
      links.push(`<a class="icon-link" href="${escapeAttribute(config.socialUrl)}" target="_blank" rel="noreferrer" aria-label="${escapeAttribute(config.socialLabel || "Social media")}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="icon-dot" cx="17.5" cy="6.7" r=".7"/></svg></a>`);
    }
    if (config.email) {
      links.push(`<a class="icon-link" href="mailto:${escapeAttribute(config.email)}" aria-label="Email"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="1"/><path d="m4 7 8 6 8-6"/></svg></a>`);
    }
    footer.innerHTML = links.join("");
  });

  const grid = document.getElementById("project-grid");
  if (grid) {
    grid.innerHTML = projects.map((project) => `
      <a class="project-card" href="project.html?id=${encodeURIComponent(project.slug)}" aria-label="${escapeAttribute(project.title)}">
        <div class="project-image${project.cover ? "" : " project-placeholder"}">${project.cover ? `<img src="${escapeAttribute(project.cover)}" alt="${escapeAttribute(project.title)}" loading="lazy">` : ""}</div>
        <div class="project-meta"><h2>${escapeHtml(project.title)}</h2></div>
      </a>`).join("");
  }

  const detail = document.getElementById("project-detail");
  if (detail) {
    const id = new URLSearchParams(location.search).get("id");
    const project = projects.find((item) => item.slug === id);
    const content = detail.querySelector(".project-loading");
    if (!project || !content) return;
    document.title = `${project.title} — Toby McDonald Lighting Design`;
    const images = (project.images || [project.cover]).filter(Boolean);
    content.innerHTML = `<section class="project-heading"><h1>${escapeHtml(project.title)}</h1></section><div class="project-gallery">${images.map((src) => `<figure><img src="${escapeAttribute(src)}" alt="${escapeAttribute(project.title)}" loading="lazy"></figure>`).join("")}</div>`;
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }
  function escapeAttribute(value) { return escapeHtml(value); }
})();
