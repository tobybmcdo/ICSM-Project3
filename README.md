# Toby McDonald Lighting Design

A responsive, static portfolio site. It currently uses plain HTML, CSS, and JavaScript, so no build tools or separate content system are needed.

## Add a production

1. Create a lowercase, hyphenated folder under `assets/images/projects/`, for example `assets/images/projects/the-crucible/`.
2. Put the cover image in that folder as `cover.jpg`. Add gallery photos as `01.jpg`, `02.jpg`, and so on.
3. Open `assets/js/projects.js` and add an entry to `window.PROJECTS`. The example object at the top shows all available fields. Keep the `cover` and `images` paths consistent with your folder name.
4. Open `index.html` in a browser. The project appears in the gallery and its card opens a page with the show details and photos.

See `assets/images/projects/README.md` for the folder convention.

## Add your personal details

- Update social media and email links in `assets/js/site-config.js`. They will appear in the footer on every page.
- Add a biography and portrait on `about.html`; add your resume PDF in `assets/files/` and link it from that page when ready.
- The contact form on `contact.html` is intentionally disabled until a message delivery service is connected.
- Put the licensed Twentieth Century web font at `assets/fonts/twentieth-century.woff2`. Details are in `assets/fonts/README.md`.

The site uses Figtree for headings. A system sans-serif fallback is used for body copy until the Twentieth Century font file is added.
