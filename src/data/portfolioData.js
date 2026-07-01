// ============================================================
// portfolioData.js — Centralized configuration for V. Deena's Portfolio
// All external links, personal info, and content in one place.
// Update this file to change any content across the entire site.
// ============================================================

import internshipPdf from '../assets/Deena V-Internship.pdf';
import starPdf from '../assets/Prompt Engineering Research and Integration Internship Star Performer.pdf';
import nptelPdf from '../assets/nptel deena.pdf';

export const personalInfo = {
  name: "V. Deena",
  firstName: "Deena",
  brandName: "V. Deena",
  title: "Frontend Developer",
  location: "India",
  phone: "+91 6382097752",
  emails: {
    primary: "deenaofficial1507@gmail.com",
    secondary: "deenaofficial1507@gmail.com",
  },
  summary:
    "Artificial Intelligence & Machine Learning student and Frontend Developer passionate about building AI-powered applications, workflow automation systems and modern web experiences that solve real-world problems.",
  resumeUrl: "/Md_Yusuf_Resume_2026.pdf",
};

export const socialLinks = {
  github: "https://github.com/deena303",
  linkedin: "https://www.linkedin.com/in/deena-v-b95a63327",
  whatsapp: "https://wa.me/916382097752",
};

export const heroContent = {
  greeting: "Hi, I'm V. Deena",
  titleHighlight: "Frontend Developer",
  subtitle:
    "I enjoy turning ideas into real applications by combining modern web technologies, AI and thoughtful user experiences. I focus on building scalable products that solve practical problems for students, businesses and organizations.",
  ctaPrimary: { text: "View My Work", href: "#projects" },
  ctaSecondary: {
    text: "Contact Me",
    href: "mailto:deenaofficial1507@gmail.com?subject=Hiring Inquiry – Portfolio&body=Hello V. Deena,%0D%0A%0D%0AI came across your portfolio and would like to discuss an opportunity with you.%0D%0A%0D%0ALooking forward to hearing from you.%0D%0ABest Regards,",
  },
  ctaResume: { text: "Download Resume", href: "/Md_Yusuf_Resume_2026.pdf" },
};

export const aboutContent = {
  heading: "Hello!",
  bio: `Hi, my name is <span class="text-black text-xl font-black mx-1 tracking-wide uppercase">V. Deena</span>, an Artificial Intelligence & Machine Learning student and Frontend Developer. I am passionate about building AI-powered applications, workflow automation platforms and enterprise software. I focus on crafting modern, scalable web experiences that make a real impact for students, businesses and organizations.`,
  techStack: ["React", "TypeScript", "Tailwind CSS"],
};

export const skillsContent = {
  badge: "My Process",
  heading: "Here's how I turn ideas into real-world applications",
  description:
    "I follow a structured, creative, and highly technical approach to turn ideas into robust frontend applications and AI-powered products.",
  cards: [
    {
      number: "01",
      title: "Research",
      text: "I start by understanding goals, user requirements, and technical constraints to lay a rock-solid foundation for the project.",
    },
    {
      number: "02",
      title: "Design",
      text: "Crafting clean architecture, intuitive interfaces, and pixel-perfect wireframes that guarantee an engaging and accessible user experience.",
    },
    {
      number: "03",
      title: "Develop",
      text: "Building scalable frontends and AI-powered backends using modern tech stacks including React, TypeScript, Node.js and cloud AI APIs.",
    },
    {
      number: "04",
      title: "Deploy",
      text: "Rigorous testing, performance optimization, and seamless deployment to cloud infrastructure, followed by ongoing support.",
    },
  ],
  endText: "Ready to ship!",
};

// Technical Skills Data
export const technicalSkills = {
  categories: [
    {
      title: "Frontend Development ⭐",
      skills: [
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 92 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "React.js", level: 92 },
        { name: "Next.js", level: 86 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 85 }
      ],
      isPrimary: true
    },
    {
      title: "UI / UX & 3D Design",
      skills: [
        { name: "Figma", level: 82 },
        { name: "Responsive Design", level: 95 },
        { name: "UI Animation", level: 90 },
        { name: "Accessibility", level: 82 },
        { name: "Blender (3D)", level: 78 }
      ]
    },
    {
      title: "Development Tools",
      skills: [
        { name: "VS Code", level: 98 },
        { name: "Antigravity", level: 95 },
        { name: "GitHub", level: 92 },
        { name: "Claude", level: 95 },
        { name: "OpenAI", level: 95 },
        { name: "Google AI Studio", level: 93 },
        { name: "Firebase Studio", level: 90 }
      ]
    },
    {
      title: "Additional Skills",
      skills: [
        { name: "Git", level: 90 },
        { name: "npm", level: 92 },
        { name: "REST API Integration", level: 85 },
        { name: "Performance Optimization", level: 88 },
        { name: "Responsive Web Design", level: 95 },
        { name: "UI Component Libraries (shadcn/ui, React Bits)", level: 90 }
      ]
    }
  ]
};

// Services / What I Do
export const contentCreation = {
  badge: "What I Do",
  heading: "Services I Offer",
  description:
    "From AI-powered systems to enterprise web platforms, I design and build products that create real business value.",
  categories: [
    {
      title: "AI Automation Systems",
      description:
        "Building intelligent workflow automation platforms that analyze requests, automate routine tasks and integrate seamlessly with enterprise tools.",
      stats: "AI-First",
      icon: "🤖",
    },
    {
      title: "Professional Website Development",
      description:
        "Crafting fast, responsive and visually stunning websites using React, Next.js, TypeScript and Tailwind CSS with modern design aesthetics.",
      stats: "Modern Web",
      icon: "🌐",
    },
    {
      title: "ERP Platform Development",
      description:
        "Designing and developing centralized ERP platforms that digitize operations, manage workflows and streamline processes for educational institutions and businesses.",
      stats: "Enterprise",
      icon: "🏢",
    },
    {
      title: "Frontend Web Applications",
      description:
        "Building scalable, component-driven frontend applications with clean architecture, smooth animations and exceptional user experience.",
      stats: "React / TS",
      icon: "⚡",
    },
  ],
};

// Leadership / Additional Activities
export const leadershipList = [
  {
    title: "Client Projects",
    description: "Successfully delivered multiple production-ready websites for educational institutions and business clients using modern frontend technologies.",
    role: "Frontend Developer",
    badge: "Client Projects",
  },
  {
    title: "Hackathon Development",
    description: "Developed official registration platforms and technical event websites including Sathakathon 2.0, ProjectX, and TechWar 2K26.",
    role: "Frontend Developer",
    badge: "Hackathon Development",
  },
  {
    title: "AI Exploration",
    description: "Built AI-powered applications including Enterprise SOP Agent, AI Resume Builder, Flow AI, and BillShock Arena while exploring modern LLM technologies.",
    role: "AI Developer",
    badge: "AI Exploration",
  },
  {
    title: "Continuous Learning",
    description: "Continuously improving frontend engineering, UI/UX, animation systems, Blender, AI development, and modern web technologies.",
    role: "Continuous Learner",
    badge: "Continuous Learning",
  },
];

// Internships / Experience Data
export const internshipsList = [
  {
    organization: "ZAALIMA",
    role: "Full Stack Developer Intern",
    duration: "2025 – 2026",
    badge: "INTERNSHIP",
    description: "Completed a professional Full Stack Development internship where I built responsive web applications, collaborated on client projects, integrated modern frontend technologies, and worked with backend APIs while following industry development practices.",
    skills: [
      "Frontend Development",
      "React Development",
      "REST API Integration",
      "Responsive UI Design",
      "Team Collaboration",
    ],
    tech: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "GitHub"],
  },
  {
    organization: "Excelerate",
    role: "Prompt Engineering Research & Integration Intern",
    duration: "2026",
    badge: "INTERNSHIP",
    description: "Worked on prompt engineering research, AI workflow optimization, LLM evaluation, prompt testing, and AI integration strategies for enterprise productivity solutions.",
    skills: [
      "Prompt Engineering",
      "AI Research",
      "LLM Evaluation",
      "Workflow Automation",
      "AI Integration",
    ],
    tech: ["OpenAI", "Claude", "Google AI Studio", "Prompt Engineering", "LLMs", "AI Automation"],
  },
  {
    organization: "Independent Client Projects",
    role: "Frontend Developer",
    duration: "Present",
    badge: "FREELANCE",
    description: "Designed and developed modern responsive websites for educational institutions, startups, hackathons, and business clients with a strong focus on performance, UI/UX, and scalable frontend architecture.\n\nProjects: VM Labz, Kamalakshi Pandurangan College of Pharmacy, Sathakathon 2.0, ProjectX, TechWar 2K26.",
    skills: [
      "Performance",
      "UI/UX",
      "Scalable Frontend Architecture",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub"],
  },
];

// Soft Skills
export const softSkillsList = [
  {
    name: "Problem Solving",
    icon: "🧩",
    desc: "Breaking down complex engineering tasks into clean, logical, and modular pieces.",
  },
  {
    name: "Communication",
    icon: "💬",
    desc: "Clear, concise, and structured interactions in both business and technical contexts.",
  },
  {
    name: "Team Collaboration",
    icon: "🤝",
    desc: "Collaborating across disciplines, building production-ready software in sync with teams.",
  },
  {
    name: "Adaptability",
    icon: "🌟",
    desc: "Quick to pick up new frameworks, AI tools and emerging web technologies.",
  },
  {
    name: "Creativity",
    icon: "🎨",
    desc: "Blending modern design aesthetics with software engineering to build premium experiences.",
  },
  {
    name: "Attention to Detail",
    icon: "🔍",
    desc: "Ensuring pixel-perfect UI, clean code and high-quality user experiences.",
  },
  {
    name: "Time Management",
    icon: "⏰",
    desc: "Balancing AI/ML studies, project development and internship responsibilities effectively.",
  },
  {
    name: "Leadership",
    icon: "👑",
    desc: "Driving projects to completion by coordinating tasks and inspiring teams.",
  },
];

export const projects = [
  {
    id: "vm-labz",
    number: "01",
    badge: "Client Project",
    role: "Frontend Developer",
    title: "VM Labz",
    description: "Designed and developed the frontend for VM Labz, a professional platform offering academic project solutions for UG and PG students, research paper writing services, publication guidance, patent assistance, and consulting solutions. Built a modern, responsive, and user-friendly experience focused on helping students and researchers access services efficiently.",
    techTags: ["React", "JavaScript", "Tailwind CSS", "Responsive Design"],
    links: {
      website: "https://vmlabz.in/"
    },
    isFlagship: true,
  },
  {
    id: "kpcms",
    number: "02",
    badge: "Client Project",
    role: "Frontend Developer",
    title: "Kamalakshi Pandurangan College of Pharmacy",
    description: "Built a complete event management platform featuring participant registration, automatic email delivery with login credentials, participant portal, QR-code based attendance tracking, reward claiming, food management with QR verification, and administrator dashboards. Designed for a seamless and secure event experience.",
    techTags: ["React", "JavaScript", "Tailwind CSS", "Firebase", "Email Integration", "QR Code System"],
    links: {
      website: "https://kpcms.netlify.app/"
    },
    isFlagship: true,
  },
  {
    id: "erp-platform",
    number: "03",
    badge: "Enterprise Software",
    role: "Frontend Developer",
    title: "ERP Platform",
    description: "A modern college ERP platform with modules for admissions, student management, attendance, academics, examinations, fee management, notifications, and administrative dashboards. Designed with a scalable and responsive user interface.",
    techTags: [], // Assuming tags might be empty or I can infer them if needed, but none were provided explicitly except in previous data. I will leave it empty as user didn't specify technologies for this.
    links: {
      website: "https://msajce.netlify.app/"
    },
    isFlagship: false,
  },
  {
    id: "flow-ai",
    number: "04",
    badge: "AI Platform",
    role: "Frontend Developer",
    title: "Flow AI",
    description: "An AI-powered workflow automation platform that helps users organize tasks, automate repetitive work, and improve productivity using intelligent AI assistants and modern web technologies.",
    techTags: [],
    links: {
      github: "https://github.com/mdwasim2006/flow-ai"
    },
    isFlagship: false,
  },
  {
    id: "enterprise-sop-agent",
    number: "05",
    badge: "Enterprise AI",
    role: "Frontend Developer",
    title: "Enterprise SOP Agent",
    description: "An enterprise AI assistant that allows employees to search company SOP documents using semantic search, AI-powered question answering, document embeddings, and intelligent knowledge retrieval.",
    techTags: [],
    links: {
      github: "https://github.com/deena303/SOP-agent"
    },
    isFlagship: false,
  },
  {
    id: "ai-resume-builder",
    number: "06",
    badge: "AI Application",
    role: "Frontend Developer",
    title: "AI Resume Builder",
    description: "An intelligent resume builder that creates ATS-friendly resumes with AI assistance, professional templates, resume optimization, and instant export functionality.",
    techTags: [],
    links: {
      github: "https://github.com/deena303/ats-pro-resume-generator"
    },
    isFlagship: false,
  },
  {
    id: "sathakathon-2.0",
    number: "07",
    badge: "Hackathon Platform",
    role: "Frontend Developer",
    title: "Sathakathon 2.0",
    description: "Developed the frontend for the official registration platform of a 25-hour hackathon. Features include participant registration, team management, event schedule, responsive landing pages, and an engaging user experience for students.",
    techTags: [],
    links: {
      website: "https://sathakathon26.netlify.app/"
    },
    isFlagship: false,
  },
  {
    id: "projectx",
    number: "08",
    badge: "Hackathon Platform",
    role: "Frontend Developer",
    title: "ProjectX",
    description: "Designed and developed the frontend for a 12-hour hackathon registration platform with online registration, event information, responsive design, payment workflow, and team management.",
    techTags: [],
    links: {
      website: "https://projectx.msajce-edu.in/"
    },
    isFlagship: false,
  },
  {
    id: "techwar-2k26",
    number: "09",
    badge: "Technical Event",
    role: "Frontend Developer",
    title: "TechWar 2K26",
    description: "Created the frontend for TechWar 2K26, a modern technical event website showcasing competitions, workshops, schedules, registrations, prizes, coordinators, sponsors, and event information with a responsive interface.",
    techTags: [],
    links: {
      website: "https://techwar2k2610.netlify.app/"
    },
    isFlagship: false,
  },
  {
    id: "billshock-arena",
    number: "10",
    badge: "Personal Project",
    role: "Frontend Developer",
    title: "BillShock Arena",
    description: "A gamified energy consumption platform that encourages users to reduce electricity usage through AI insights, real-time analytics, leaderboards, rewards, and sustainability challenges.",
    techTags: [],
    links: {
      github: "https://github.com/deena303/Billstock-arena"
    },
    isFlagship: false,
  },
];

export const certificates = {
  featured: [
    {
      name: "Full Stack Development Internship",
      issuer: "ZAALIMA",
      status: "Completed",
      icon: "💼",
      pdf: internshipPdf,
    },
    {
      name: "Prompt Engineering Research & Integration Internship",
      issuer: "Excelerate",
      status: "Star Performer",
      icon: "🤖",
      pdf: starPdf,
    },
    {
      name: "German-I",
      issuer: "NPTEL",
      status: "Completed",
      icon: "🇩🇪",
      pdf: nptelPdf,
    },
  ],
  viewAllUrl: "https://github.com/deena303",
};

export const education = {
  degree: "B.Tech — Artificial Intelligence & Machine Learning",
  institution: "Engineering College",
  cgpa: "—",
  graduation: "2027",
  twelfth: "12th Science",
  tenth: "10th CBSE",
};

export const footerContent = {
  taglines: [
    "Frontend Development & AI",
    "React · TypeScript · Tailwind CSS",
    "Building Modern Web Experiences",
  ],
  credential: "AI & ML Student · Frontend Developer",
  copyright: `Designed & Developed by V. Deena`,
};

// EmailJS Configuration
// Will read directly from environment variables in Vite (starting with VITE_)
export const emailjsConfig = {
  serviceId:
    import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId:
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey:
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
