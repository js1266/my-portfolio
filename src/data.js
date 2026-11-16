// All site content lives here (sourced from Jagadeesh's resume).
// Update this file and every section of the site updates with it.

export const profile = {
  name: "Jagadeesh Sahu",
  firstName: "Jagadeesh",
  lastName: "Sahu",
  role: "Frontend Developer",
  tagline:
    "I build responsive, accessible, and high-performance web experiences with React.js, JavaScript, and modern front-end engineering practices.",
  email: "jsahu1266@gmail.com",
  phone: "+91 79782 83226",
  location: "Odisha, India",
  resumeUrl: "/resume.pdf",
  resumeFileName: "Jagadeesh_Sahu_Resume.pdf",
  // photo: "public/jagadeesh.png", // e.g. "/me.png" (transparent PNG). Leave empty to show initials.
  yearsExperience: "4.5+",
  socials: {
    github: "https://github.com/js1266",
    linkedin: "https://linkedin.com/in/jagadeesh-sahu",
    twitter: "",
    instagram: "",
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  tag: "About me",
  title: "Frontend Developer Building Responsive, Accessible, and High-Performance Web Experiences",
  text: "Frontend Developer with 4.5+ years of experience building responsive, scalable, and performance-focused web applications. I turn design concepts into polished interfaces, improve Core Web Vitals, and build reusable UI systems that are maintainable, accessible, and aligned with business goals.",
  stats: [
    { value: 4.5, decimals: 1, suffix: "+", label: "Years of Experience" },
    { value: 90, decimals: 0, suffix: "+", label: "Lighthouse Performance" },
    { value: 5, decimals: 0, suffix: "", label: "Featured Projects" },
  ],
  highlights: [
    {
      title: "Performance & Core Web Vitals",
      text: "Improved Lighthouse scores from 60+ to 90+ by optimizing LCP, CLS, and INP for a faster user experience.",
    },
    {
      title: "Pixel-Perfect Interfaces",
      text: "Built responsive, design-driven interfaces using CSS Grid, Flexbox, semantic HTML, and a strong focus on accessibility.",
    },
  ],
};

export const projectFilters = ["All", "E-Commerce", "Landing Pages", "UI & Email"];

export const projects = [
  {
    title: "Healthcare E-Commerce Platform",
    category: "E-Commerce",
    description:
      "Built a responsive storefront experience with reusable product, cart, wishlist, and checkout components for a scalable and user-friendly shopping flow.",
    tags: ["Component Architecture", "Lighthouse", "SEO"],
  },
  {
    title: "Payment Gateway Website",
    category: "Landing Pages",
    description:
      "Developed responsive marketing pages from Figma with smooth GSAP animations, optimized page speed, and accessible interaction patterns.",
    tags: ["Figma", "GSAP", "Accessibility"],
  },
  {
    title: "Tech Website",
    category: "Landing Pages",
    description:
      "Created semantic, mobile-first landing pages with scroll animations, image optimization, code splitting, and WCAG-focused UI practices.",
    tags: ["GSAP", "Code Splitting", "WCAG"],
  },
  {
    title: "Invoice UI & HTML Email Templates",
    category: "UI & Email",
    description:
      "Designed responsive HTML email templates and invoice interfaces for business communications with consistent branding and clean presentation.",
    tags: ["HTML Email", "Responsive", "Branding"],
  },
  {
    title: "Botble CMS E-Commerce Website",
    category: "E-Commerce",
    description:
      "Customized a Botble CMS storefront with product catalog, cart, and checkout flows while improving loading speed, lazy loading, and markup quality.",
    tags: ["Botble CMS", "Lazy Loading", "SEO"],
  },
];

export const expertise = [
  {
    title: "Frontend Engineering",
    badge: "React.js",
    text: "Build scalable, reusable UI components with React.js, Redux, Hooks, JavaScript (ES6+), Bootstrap, and Tailwind CSS.",
  },
  {
    title: "Performance & SEO",
    badge: "60+ → 90+",
    text: "Improve Lighthouse and Core Web Vitals through image optimization, code splitting, and semantic markup for better search visibility.",
  },
  {
    title: "Animation & Interaction",
    badge: "GSAP",
    text: "Create polished scroll and hover animations, CSS transitions, and micro-interactions that improve engagement without sacrificing performance.",
  },
];

export const skillGroups = [
  {
    name: "Frontend",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "Redux",
      "Hooks",
      "RESTful APIs",
      "Bootstrap",
      "Tailwind CSS",
      "Responsive Design",
      "CSS Grid",
      "Flexbox",
      "SEO",
    ],
  },
  { name: "Animation", items: ["GSAP", "CSS Animations", "Transitions"] },
  { name: "Libraries", items: ["Axios", "jQuery", "Slick Slider", "Swiper.js"] },
  { name: "Backend & Database", items: ["Node.js", "Express.js", "MongoDB", "MySQL", "Python"] },
  { name: "Version Control", items: ["Git", "GitHub", "Bitbucket", "SVN"] },
  {
    name: "Tools",
    items: ["VS Code", "Chrome DevTools", "Figma", "Postman", "Lighthouse", "npm", "Vite"],
  },
];

export const techMarquee = [
  "React.js",
  "JavaScript",
  "Tailwind CSS",
  "GSAP",
  "Redux",
  "Bootstrap",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Figma",
  "Vite",
];

export const experience = [
  {
    period: "Jan 2025 — Present",
    role: "Frontend Developer",
    company: "Zenithbyte Innovations Pvt. Ltd.",
    points: [
      "Improved Lighthouse performance from 60+ to 90+ through frontend optimization and Core Web Vitals tuning for faster page delivery.",
      "Developed scalable, reusable UI components using HTML5, CSS3, JavaScript, Bootstrap, and React.js.",
      "Converted design files into responsive, pixel-accurate web applications using CSS Grid, Flexbox, and semantic markup.",
      "Built interactive animations and micro-interactions with GSAP to improve product engagement and visual quality.",
      "Integrated REST APIs using Axios to manage dynamic content and application state efficiently.",
      "Resolved cross-browser issues across Chrome, Firefox, Safari, and Edge to ensure consistent behavior.",
      "Collaborated with designers and backend engineers in an Agile environment to deliver product-ready interfaces.",
    ],
  },
  {
    period: "Jan 2022 — Dec 2024",
    role: "Frontend Developer",
    company: "Swipewire Technologies Pvt. Ltd.",
    points: [
      "Built responsive websites using HTML, CSS, JavaScript, and Bootstrap across desktop, tablet, and mobile devices.",
      "Designed reusable UI components that improved development speed and consistency across projects.",
      "Optimized website performance and SEO to improve page speed, accessibility, and search visibility.",
      "Created interactive UI animations using GSAP to enhance visual engagement and user experience.",
    ],
  },
  {
    period: "2014 — 2018",
    role: "Bachelor of Technology",
    company: "Vignan Institute of Technology and Management",
    points: [],
  },
];

export const certifications = [
  "React.js Development",
  "Responsive Web Design",
  "JavaScript (ES6+) Programming",
];
