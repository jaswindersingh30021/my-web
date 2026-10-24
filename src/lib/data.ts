export const profile = {
  name: "Jaswinder Singh",
  shortName: "Jaswinder",
  role: "Frontend Developer",
  email: "jaswindersingh4232@gmail.com",
  location: "India — Open to remote work",
  portrait: "/jaswinder-outdoor.jpg",
  portrait3d: "/jaswinder-outdoor.jpg",
  intro:
    "I build fast, animated, and polished web interfaces — from CRM dashboards to property sites — with React, Next.js, GSAP, and modern CSS.",
  availability: "Available for freelance & full-time",
} as const;

export const techMarquee = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "GSAP",
  "Tailwind CSS",
  "Bootstrap",
  "shadcn/ui",
  "Payload CMS",
  "Django",
  "TypeScript",
] as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const projects = [
  {
    slug: "beelscrm",
    title: "BeelsCRM",
    category: "CRM · React · Dashboard UI",
    tags: ["React", "Dashboard", "CRM"],
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
    aspect: "aspect-[4/5] md:aspect-[3/4]",
    offset: "md:mt-24",
  },
  {
    slug: "yurayi",
    title: "Yurayi",
    category: "Web App · Next.js · Frontend",
    tags: ["Next.js", "Web App", "UI"],
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    aspect: "aspect-[16/10]",
    offset: "",
  },
  {
    slug: "mittal-properties",
    title: "Mittal Properties",
    category: "Real Estate · Landing · Lead gen",
    tags: ["Landing", "Real Estate", "SEO"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80",
    aspect: "aspect-[5/6]",
    offset: "md:-mt-16",
  },
  {
    slug: "kansal-properties",
    title: "Kansal Properties",
    category: "Property site · Responsive · SEO",
    tags: ["Responsive", "Property", "Lead gen"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    aspect: "aspect-[16/11]",
    offset: "md:mt-12",
  },
  {
    slug: "codigo-mantra",
    title: "Codigo Mantra",
    category: "Agency website · Motion · Brand",
    tags: ["GSAP", "Agency", "Brand"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    aspect: "aspect-[16/10]",
    offset: "md:mt-8",
  },
] as const;

export const skills = [
  {
    title: "HTML, CSS & JavaScript",
    description:
      "Semantic markup, responsive layouts, and interactive UI with clean, maintainable vanilla JS.",
    index: "01",
    tags: ["HTML5", "CSS3", "ES6+"],
  },
  {
    title: "React & Next.js",
    description:
      "Component-driven apps, App Router, performance tuning, and production-ready frontend architecture.",
    index: "02",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Tailwind, Bootstrap & shadcn/ui",
    description:
      "Rapid styling with utility-first CSS, proven UI kits, and accessible component systems.",
    index: "03",
    tags: ["Tailwind", "Bootstrap", "shadcn"],
  },
  {
    title: "GSAP & Motion",
    description:
      "Scroll-triggered storytelling, micro-interactions, and smooth experiences that feel premium.",
    index: "04",
    tags: ["GSAP", "ScrollTrigger", "Lenis"],
  },
  {
    title: "Payload CMS & Django basics",
    description:
      "Headless content integration and light backend work to connect interfaces to real data.",
    index: "05",
    tags: ["Payload", "Django", "APIs"],
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Understand",
    body: "Clarify goals, users, and constraints — what the product needs to do and feel like.",
  },
  {
    step: "02",
    title: "Structure",
    body: "Plan components, routes, and responsive layouts before writing production code.",
  },
  {
    step: "03",
    title: "Build",
    body: "Implement in React or Next.js with accessible HTML, sharp CSS, and reusable patterns.",
  },
  {
    step: "04",
    title: "Animate",
    body: "Add GSAP motion and polish — only where it improves clarity and delight.",
  },
  {
    step: "05",
    title: "Ship",
    body: "Test across devices, optimize performance, and hand off something you’re proud to show.",
  },
] as const;

export const stats = [
  { value: 5, suffix: "+", label: "Projects delivered" },
  { value: 10, suffix: "+", label: "Tools in my stack" },
  { value: 3, suffix: "+", label: "Years in frontend" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: `mailto:${profile.email}` },
] as const;

export const portfolioEmail = profile.email;
