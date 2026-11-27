export const portfolioData = {
  profile: {
    name: "Adip Habibullah",
    tagline: "Here for the people side of growing up.",
    role: "Full Stack & Product Engineer",
    bio: "Passionate about building intuitive web applications, delightful user experiences, machine learning models, and products people love.",
    companies: [
      { name: "Politeknik Negeri Padang", logo: "/asset/icon/pnp.webp", role: "Mahasiswa" },
      { name: "SMAN 1 Padang Gelugur", logo: "/asset/icon/sman1pagel.png", role: "Siswa / Alumni" }
    ],
    skills: ["Web", "Product", "ML", "Tech"]
  },
  projects: [
    {
      id: "routina-landing-page",
      title: "Routina Landing Page",
      category: "Web",
      season: "Nov 2026",
      role: "Role — Web Design & Frontend",
      description:
        "Bilingual (EN/ID) static landing page for Routina, an offline-first daily planner for Android. Features interactive product previews, signed APK release distribution with SHA-256 verification, and full SEO optimization.",
      image: "/images/projects/routina-web/01-hero-showcase.png",
      images: [
        "/images/projects/routina-web/01-hero-showcase.png",
        "/images/projects/routina-web/02-angled-grid.png",
        "/images/projects/routina-web/03-full-page-scroll.png",
        "/images/projects/routina-web/04-design-system.png"
      ],
      imageCount: 4,
      tags: ["Astro", "FigCraft", "UI/UX", "SEO", "Vercel"],
      link: "https://routina.web.id"
    },
    {
      id: "routina-mobile-app",
      title: "Routina — Offline Daily Planner",
      category: "Mobile",
      season: "Nov 2026",
      role: "Role — Mobile Dev & UI/UX",
      description:
        "Offline-first Android daily planner built with Flutter and SQLite. Combines a smart calendar, to-do lists with subtasks, routine duration timer, smart scheduling, productivity statistics, and encrypted local backups.",
      image: "/images/projects/routina-app/01-app-angled-showcase.png",
      images: [
        "/images/projects/routina-app/01-app-angled-showcase.png",
        "/images/projects/routina-app/02-app-three-screens.png",
        "/images/projects/routina-app/03-app-routines-timer.png",
        "/images/projects/routina-app/04-app-scheduling-stats.png",
        "/images/projects/routina-app/05-app-design-system.png"
      ],
      imageCount: 5,
      tags: ["Flutter", "SQLite", "Android", "FigCraft", "UI/UX"],
      link: "https://routina.web.id/id/"
    }
  ],
  blogs: []
};
