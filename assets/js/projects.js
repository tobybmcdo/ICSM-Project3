/*
  Add each production to this list. Keep its photos together in:
  assets/images/projects/<project-slug>/
  Use cover.jpg for the gallery thumbnail, followed by 01.jpg, 02.jpg, etc.

  To add a production, copy this entry into window.PROJECTS and replace its
  sample values. Venue and year appear under the show title. Add one credits
  item per team member; each role/name pair appears below the carousel.
  Empty venue, year, or credits fields are hidden on the page.
  {
    slug: "sample-production",
    title: "Show title",
    venue: "Theatre / company",
    year: "Year",
    credits: [
      { role: "Director", name: "Name" },
      { role: "Lighting Designer", name: "Toby McDonald" }
    ],
    cover: "assets/images/projects/sample-production/cover.jpg",
    images: [
      "assets/images/projects/sample-production/cover.jpg",
      "assets/images/projects/sample-production/01.jpg",
      "assets/images/projects/sample-production/02.jpg"
    ]
  }
*/
window.PROJECTS = [
  {
    slug: "ateotw",
    title: "At the End of the World",
    venue: "Round House Theater",
    year: "2026",
    credits: [
      { role: "Written by", name: "Morgan Gould" },
      { role: "Directed by", name: "Scout Amakali" },
      { role: "Lighting Design", name: "Toby McDonald" },
      { role: "Scenic & Props Design", name: "Alexander Weiss" },
      { role: "Projections Design", name: "Ana Ewachiw" },
      { role: "Costume Design", name: "Stella Theisman" },
      { role: "Sound Design", name: "Kiran Almazor" },
      { role: "Photos", name: "Danisha Crosby" }
    ],
    cover: "assets/images/projects/ateotw/cover.jpg",
    images: [
      "assets/images/projects/ateotw/cover.jpg",
      ...Array.from({ length: 14 }, (_, index) =>
        `assets/images/projects/ateotw/${String(index + 1).padStart(2, "0")}.jpg`
      )
    ]
  },
  { slug: "project-01", title: "Project 01", venue: "", year: "", credits: [], cover: "", images: [] },
  { slug: "project-02", title: "Project 02", venue: "", year: "", credits: [], cover: "", images: [] },
  { slug: "project-03", title: "Project 03", venue: "", year: "", credits: [], cover: "", images: [] },
  { slug: "project-04", title: "Project 04", venue: "", year: "", credits: [], cover: "", images: [] },
  { slug: "project-05", title: "Project 05", venue: "", year: "", credits: [], cover: "", images: [] },
  { slug: "project-06", title: "Project 06", venue: "", year: "", credits: [], cover: "", images: [] },
  { slug: "project-07", title: "Project 07", venue: "", year: "", credits: [], cover: "", images: [] },
  { slug: "project-08", title: "Project 08", venue: "", year: "", credits: [], cover: "", images: [] }
];
