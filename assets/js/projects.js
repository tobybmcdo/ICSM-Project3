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
  {
    slug: "rj",
    title: "Romeo and Juliet",
    venue: "",
    year: "",
    credits: [
      { role: "Directed by", name: "Natalie Garcia-Ruiz" },
      { role: "Lighting Design", name: "Toby McDonald" },
      { role: "Scenic Design", name: "Sarah Breeden" },
      { role: "Scenic Design", name: "Rowen Collins" },
      { role: "Technical Director", name: "Sarah Breeden" }
    ],
    cover: "assets/images/projects/rj/cover.jpg",
    images: [
      "assets/images/projects/rj/01.jpg",
      "assets/images/projects/rj/02.jpg",
      "assets/images/projects/rj/03.jpg",
      "assets/images/projects/rj/04.jpg",
      "assets/images/projects/rj/05.jpg"
    ]
  },
  {
    slug: "psmith",
    title: "Leave it to Psmith",
    venue: "",
    year: "",
    credits: [],
    cover: "assets/images/projects/psmith/cover.jpg",
    images: [
      "assets/images/projects/psmith/01.jpg",
      "assets/images/projects/psmith/02.jpg",
      "assets/images/projects/psmith/03.jpg",
      "assets/images/projects/psmith/04.jpg",
      "assets/images/projects/psmith/05.jpg",
      "assets/images/projects/psmith/06.jpg",
      "assets/images/projects/psmith/07.jpg",

    ]
  },
  {
    slug: "oliver",
    title: "Oliver!",
    venue: "",
    year: "",
    credits: [],
    cover: "assets/images/projects/oliver/cover.jpg",
    images: [
      "assets/images/projects/oliver/01.jpg",
      "assets/images/projects/oliver/02.jpg",
      "assets/images/projects/oliver/03.jpg"
    ]
  },
  {
    slug: "cc",
    title: "Caesar and Cleopatra",
    venue: "",
    year: "",
    credits: [],
    cover: "assets/images/projects/cc/cover.jpg",
    images: ["assets/images/projects/cc/01.jpg"]
  },
  {
    slug: "s24",
    title: "Sankofa 2024",
    venue: "",
    year: "",
    credits: [],
    cover: "assets/images/projects/s24/cover.jpg",
    images: [
      "assets/images/projects/s24/01.jpg",
      "assets/images/projects/s24/02.jpg",
      "assets/images/projects/s24/03.jpg",
      "assets/images/projects/s24/04.jpg"
    ]
  },
];
