(function () {
  const config = window.SITE_CONFIG || {};
  const projects = window.PROJECTS || [];

  const header = document.querySelector(".site-header");
  const isProjectPage = Boolean(document.getElementById("project-detail"));
  if (header) {
    if (isProjectPage) {
      header.classList.add("is-compact");
    } else {
      let compact = false;
      const updateHeader = () => {
        if (!compact && window.scrollY > 96) compact = true;
        else if (compact && window.scrollY < 24) compact = false;
        header.classList.toggle("is-compact", compact);
      };
      window.addEventListener("scroll", updateHeader, { passive: true });
      updateHeader();
    }
  }

  document.querySelectorAll("[data-footer-links]").forEach((footer) => {
    const links = [];
    if (config.socialUrl) {
      links.push(`<a class="icon-link" href="${escapeAttribute(config.socialUrl)}" target="_blank" rel="noreferrer" aria-label="${escapeAttribute(config.socialLabel || "Social media")}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="icon-dot" cx="17.5" cy="6.7" r=".7"/></svg></a>`);
    }
    if (config.email) {
      links.push(`<a class="footer-email" href="mailto:${escapeAttribute(config.email)}">${escapeAttribute(config.email)}</a>`);
    }
    footer.innerHTML = links.join("");
  });

  const contactForm = document.querySelector(".contact-form");
  if (contactForm && config.email) {
    const formNote = contactForm.querySelector("#form-note");
    const submitButton = contactForm.querySelector(".submit-button");
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const values = Object.fromEntries(formData.entries());
      values._subject = `Website contact from ${String(values.name || "").trim()}`;
      values._template = "table";

      submitButton.disabled = true;
      submitButton.setAttribute("aria-label", "Sending message");
      formNote.textContent = "Sending your message...";

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(config.email)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values)
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Message could not be sent.");

        contactForm.reset();
        formNote.textContent = "Your message has been sent. Thank you for getting in touch.";
      } catch (error) {
        formNote.textContent = `Your message could not be sent. Please try again later or email ${config.email}.`;
      } finally {
        submitButton.disabled = false;
        submitButton.setAttribute("aria-label", "Send message");
      }
    });
  }

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
    const images = [project.cover, ...(project.images || [])].filter((src, index, list) => src && list.indexOf(src) === index);
    if (!images.length) return;
    const venueYear = [project.venue, project.year].filter(Boolean).map(escapeHtml).join(" · ");
    const credits = (project.credits || []).filter((credit) => credit && (credit.role || credit.name));

    content.innerHTML = `
      <section class="project-heading">
        <h1>${escapeHtml(project.title)}</h1>
        ${venueYear ? `<p class="project-venue-year">${venueYear}</p>` : ""}
      </section>
      <section class="project-carousel" role="region" aria-roledescription="carousel" aria-label="${escapeAttribute(project.title)} photos">
        <div class="carousel-stage">
          <button class="carousel-image-button" type="button" aria-label="Open image 1 larger">
            <img class="carousel-image" src="${escapeAttribute(images[0])}" alt="${escapeAttribute(project.title)}, image 1 of ${images.length}" fetchpriority="high">
          </button>
          <button class="carousel-arrow carousel-previous" type="button" aria-label="Previous image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 4-8 8 8 8"/></svg></button>
          <button class="carousel-arrow carousel-next" type="button" aria-label="Next image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8"/></svg></button>
        </div>
        <div class="carousel-footer">
          <div class="carousel-thumbnails" role="group" aria-label="Choose an image"></div>
          <p class="carousel-count" aria-live="off">1 / ${images.length}</p>
        </div>
        <div class="carousel-lightbox" hidden>
          <div class="lightbox-panel" role="dialog" aria-modal="true" aria-label="${escapeAttribute(project.title)} image viewer" tabindex="-1">
            <div class="lightbox-toolbar"><button class="lightbox-close" type="button" aria-label="Close enlarged image">×</button></div>
            <div class="lightbox-stage">
              <button class="carousel-arrow lightbox-arrow lightbox-previous" type="button" aria-label="Previous image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 4-8 8 8 8"/></svg></button>
              <div class="lightbox-image-frame"><img class="lightbox-image" src="${escapeAttribute(images[0])}" alt="${escapeAttribute(project.title)}, image 1 of ${images.length}"></div>
              <button class="carousel-arrow lightbox-arrow lightbox-next" type="button" aria-label="Next image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8"/></svg></button>
            </div>
            <p class="lightbox-count">1 / ${images.length}</p>
          </div>
        </div>
      </section>
      ${credits.length ? `
        <section class="project-credits" aria-label="Production credits">
          <h2>Credits</h2>
          <dl>${credits.map((credit) => `
            <div class="project-credit">
              ${credit.role ? `<dt>${escapeHtml(credit.role)}</dt>` : ""}
              ${credit.name ? `<dd>${escapeHtml(credit.name)}</dd>` : ""}
            </div>`).join("")}
          </dl>
        </section>` : ""}`;

    const carousel = content.querySelector(".project-carousel");
    const mainImage = carousel.querySelector(".carousel-image");
    const imageTrigger = carousel.querySelector(".carousel-image-button");
    const thumbnails = carousel.querySelector(".carousel-thumbnails");
    const imageCount = carousel.querySelector(".carousel-count");
    const lightbox = carousel.querySelector(".carousel-lightbox");
    const lightboxPanel = carousel.querySelector(".lightbox-panel");
    const lightboxImage = carousel.querySelector(".lightbox-image");
    const lightboxCount = carousel.querySelector(".lightbox-count");
    let activeIndex = 0;
    let advanceTimer;
    let pointerActive = false;
    let touchActive = false;
    let lightboxOpen = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderThumbnails = (keepFocus = false) => {
      const visibleCount = Math.min(9, images.length);
      thumbnails.style.gridTemplateColumns = `repeat(${visibleCount}, minmax(0, 1fr))`;
      thumbnails.style.width = `min(100%, ${Math.min(810, visibleCount * 90)}px)`;
      const startOffset = -Math.floor(visibleCount / 2);
      const visibleIndices = Array.from({ length: visibleCount }, (_, offset) =>
        (activeIndex + startOffset + offset + images.length) % images.length
      );
      thumbnails.innerHTML = visibleIndices.map((index) => `
        <button class="carousel-thumbnail${index === activeIndex ? " is-current" : ""}" type="button" data-index="${index}" aria-label="Show image ${index + 1} of ${images.length}" aria-pressed="${index === activeIndex}">
          <img src="${escapeAttribute(images[index])}" alt="" loading="lazy">
        </button>`).join("");
      if (keepFocus) thumbnails.querySelector(`[data-index="${activeIndex}"]`)?.focus({ preventScroll: true });
    };

    const animateSlide = (element, direction, distance, duration) => {
      if (reducedMotion || typeof element.animate !== "function") return;
      element.animate([
        { opacity: 0.45, transform: `translateX(${direction * distance}px)` },
        { opacity: 1, transform: "translateX(0)" }
      ], { duration, easing: "cubic-bezier(.22,.61,.36,1)" });
    };

    const showImage = (index, keepThumbnailFocus = false, direction = 1) => {
      activeIndex = (index + images.length) % images.length;
      mainImage.src = images[activeIndex];
      mainImage.alt = `${project.title}, image ${activeIndex + 1} of ${images.length}`;
      imageTrigger.setAttribute("aria-label", `Open image ${activeIndex + 1} larger`);
      imageCount.textContent = `${activeIndex + 1} / ${images.length}`;
      renderThumbnails(keepThumbnailFocus);
      animateSlide(mainImage, direction, 20, 700);
      animateSlide(thumbnails, direction, 10, 500);
      if (lightboxOpen) {
        lightboxImage.src = images[activeIndex];
        lightboxImage.alt = mainImage.alt;
        lightboxCount.textContent = `${activeIndex + 1} / ${images.length}`;
        animateSlide(lightboxImage, direction, 14, 700);
      }
    };

    const stopAutoAdvance = () => window.clearTimeout(advanceTimer);
    const keyboardIsActive = () => Boolean(carousel.querySelector(":focus-visible"));
    const scheduleAutoAdvance = () => {
      stopAutoAdvance();
      if (images.length < 2 || reducedMotion || pointerActive || touchActive || lightboxOpen || keyboardIsActive()) return;
      advanceTimer = window.setTimeout(() => {
        showImage(activeIndex + 1);
        scheduleAutoAdvance();
      }, 15000);
    };

    const closeLightbox = () => {
      if (!lightboxOpen) return;
      lightboxOpen = false;
      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");
      imageTrigger.focus({ preventScroll: true });
      scheduleAutoAdvance();
    };

    imageTrigger.addEventListener("click", () => {
      lightboxOpen = true;
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      lightboxPanel.querySelector(".lightbox-close").focus({ preventScroll: true });
      stopAutoAdvance();
    });
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-previous").addEventListener("click", () => showImage(activeIndex - 1, false, -1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => showImage(activeIndex + 1, false, 1));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightboxPanel.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showImage(activeIndex - 1, false, -1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showImage(activeIndex + 1, false, 1);
      } else if (event.key === "Tab") {
        const controls = Array.from(lightboxPanel.querySelectorAll("button:not([disabled])"));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    carousel.querySelector(".carousel-previous").addEventListener("click", () => {
      showImage(activeIndex - 1, false, -1);
      scheduleAutoAdvance();
    });
    carousel.querySelector(".carousel-next").addEventListener("click", () => {
      showImage(activeIndex + 1, false, 1);
      scheduleAutoAdvance();
    });
    thumbnails.addEventListener("click", (event) => {
      const button = event.target.closest("[data-index]");
      if (!button) return;
      const targetIndex = Number(button.dataset.index);
      const forwardDistance = (targetIndex - activeIndex + images.length) % images.length;
      showImage(targetIndex, true, forwardDistance <= images.length / 2 ? 1 : -1);
      scheduleAutoAdvance();
    });
    carousel.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;
      pointerActive = true;
      stopAutoAdvance();
    });
    carousel.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "mouse") return;
      pointerActive = false;
      scheduleAutoAdvance();
    });
    carousel.addEventListener("touchstart", () => {
      touchActive = true;
      stopAutoAdvance();
    }, { passive: true });
    carousel.addEventListener("touchend", () => {
      touchActive = false;
      scheduleAutoAdvance();
    }, { passive: true });
    carousel.addEventListener("touchcancel", () => {
      touchActive = false;
      scheduleAutoAdvance();
    }, { passive: true });
    carousel.addEventListener("focusin", stopAutoAdvance);
    carousel.addEventListener("focusout", () => window.setTimeout(scheduleAutoAdvance, 0));
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAutoAdvance();
      else scheduleAutoAdvance();
    });

    renderThumbnails();
    scheduleAutoAdvance();
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }
  function escapeAttribute(value) { return escapeHtml(value); }
})();
