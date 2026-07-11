import React, { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { motion } from 'framer-motion'; // separate for cleaner imports
import { useData } from '../context/DataContext';
import { 
  SiHtml5, SiJavascript, SiTypescript, SiReact, SiNextdotjs, 
  SiTailwindcss, SiFramer, SiFigma, SiBlender, 
  SiGithub, SiGit, SiNpm, SiOpenai, SiFirebase, SiGoogle
} from 'react-icons/si';
import { FaLaptopCode, FaUniversalAccess, FaTachometerAlt } from 'react-icons/fa';
import { TbDevices, TbMovie, TbApi, TbComponents } from 'react-icons/tb';

// CSS3 custom SVG icon to prevent compile errors
const CSS3Icon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#1572B6]" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 11.6-.001.234-2.5-14.549.001.7 8.219h9.554l-.318 3.563-3.666.98-3.704-.98-.24-2.734h-2.5l.428 5.25 6.016 1.625 5.992-1.625.77-8.813H8.531z"/>
  </svg>
);

// VS Code custom SVG icon to prevent compile errors
const VSCodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#007ACC]" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.985 6.809l-3.324-4.838a1.272 1.272 0 00-.73-.559 1.246 1.246 0 00-.916.149L12.59 5.867 4.957.56a1.246 1.246 0 00-.916-.149 1.272 1.272 0 00-.73.559L.015 5.808a1.246 1.246 0 00-.012.923c.09.227.247.423.453.56l3.411 2.37-3.411 2.37a1.248 1.248 0 00-.453.56 1.246 1.246 0 00.012.923l3.296 5.239c.148.235.372.414.636.51a1.245 1.245 0 00.923-.049l7.633-5.308 6.425 4.306c.264.177.58.261.897.24a1.272 1.272 0 00.865-.48l3.705-5.24c.168-.237.247-.525.223-.812a1.272 1.272 0 00-.435-.8l-3.155-2.227 3.155-2.228c.2-.178.349-.413.43-.674a1.27 1.27 0 00-.23-.974zM18.89 12l-6.3-4.437v8.874L18.89 12zM2.857 7.796L10.3 12.6l-7.443 4.804V7.796z"/>
  </svg>
);

// Claude Icon Custom SVG to prevent compilation error if Anthropic is missing
const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#E69F66]" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.7 14.3h-3.4l-.8 2.2H7.2l3.8-9.4h2l3.8 9.4h-2.3l-.8-2.2zm-2.8-2.1h2.2l-1.1-3-1.1 3z"/>
  </svg>
);

// Antigravity custom premium animated SVG icon
const AntigravityIcon = () => (
  <div className="relative w-4 h-4 flex items-center justify-center">
    <div className="absolute w-full h-full rounded-full border border-red-500/40 animate-ping duration-[3000ms]" />
    <svg className="w-4 h-4 text-red-500 animate-[spin_4s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="8" strokeDasharray="6 6" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  </div>
);

// Map of names to their official icons
const skillIcons = {
  "HTML5": <SiHtml5 className="text-[#E34F26]" />,
  "CSS3": <CSS3Icon />,
  "JavaScript (ES6+)": <SiJavascript className="text-[#F7DF1E]" />,
  "TypeScript": <SiTypescript className="text-[#3178C6]" />,
  "React.js": <SiReact className="text-[#61DAFB] animate-[spin_8s_linear_infinite]" />,
  "Next.js": <SiNextdotjs className="text-white" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#38BDF8]" />,
  "Framer Motion": <SiFramer className="text-[#F024B6]" />,
  
  "Figma": <SiFigma className="text-[#F24E1E]" />,
  "Responsive Design": <TbDevices className="text-[#10B981]" />,
  "UI Animation": <TbMovie className="text-[#EC4899]" />,
  "Accessibility": <FaUniversalAccess className="text-[#3B82F6]" />,
  "Blender (3D)": <SiBlender className="text-[#F57C00]" />,
  
  "VS Code": <VSCodeIcon />,
  "Antigravity": <AntigravityIcon />,
  "GitHub": <SiGithub className="text-white" />,
  "Claude": <ClaudeIcon />,
  "OpenAI": <SiOpenai className="text-[#10A37F]" />,
  "Google AI Studio": <SiGoogle className="text-[#4285F4]" />,
  "Firebase Studio": <SiFirebase className="text-[#FFCA28]" />,
  
  "Git": <SiGit className="text-[#F05032]" />,
  "npm": <SiNpm className="text-[#CB3837]" />,
  "REST API Integration": <TbApi className="text-[#A78BFA]" />,
  "Performance Optimization": <FaTachometerAlt className="text-[#F59E0B]" />,
  "Responsive Web Design": <FaLaptopCode className="text-[#3B82F6]" />,
  "UI Component Libraries (shadcn/ui, React Bits)": <TbComponents className="text-[#EC4899]" />
};

const getSkillIcon = (name) => {
  return skillIcons[name] || <span className="w-4 h-4 rounded-full bg-red-500/50 block" />;
};

const SkillProgress = ({ name, level, icon }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          {/* Animated Icon scales from 0.8 -> 1 */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-lg flex items-center justify-center w-5 h-5 text-white/80 shrink-0"
          >
            {icon ? <span>{icon}</span> : getSkillIcon(name)}
          </motion.div>
          <span className="text-white/95 text-xs md:text-sm font-semibold tracking-wide">{name}</span>
        </div>
        <span className="text-red-400 text-xs font-bold font-mono">{level}%</span>
      </div>
      <div className="w-full h-2 bg-neutral-900/60 rounded-full overflow-hidden border border-white/5 relative">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full relative"
        >
          {/* Glow at leading edge */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#f97316,0_0_15px_#f97316]" />
        </motion.div>
      </div>
    </div>
  );
};

const SkillCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set((mouseX - width / 2) / width);
    y.set((mouseY - height / 2) / height);

    cardRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
    cardRef.current.style.setProperty('--mouse-y', `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Fade up slide in animation
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.15
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`group relative p-6 md:p-8 rounded-[20px] bg-neutral-950/40 backdrop-blur-xl border border-white/10 hover:border-red-500/40 hover:shadow-[0_20px_50px_rgba(255,42,42,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden`}
    >
      {/* Animated Top/Bottom border line */}
      <div className="absolute -inset-[1px] overflow-hidden rounded-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <motion.div
          className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
        <div>
          <h3 className="text-white text-lg font-black tracking-tight mb-6 pb-2 border-b border-white/10 uppercase flex items-center gap-2">
            {category.title}
          </h3>
          <div className="space-y-4">
            {category.skills.map((skill) => (
              <SkillProgress key={skill.name} name={skill.name} level={skill.level} icon={skill.icon} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TechnicalSkills = () => {
  const { data } = useData();
  const allSkills = [...(data?.skills || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const activeSkills = allSkills.filter(s => s.showSkill !== false);

  const CATEGORIES = ['Frontend Development', 'UI / UX & 3D Design', 'Development Tools', 'Additional Skills'];
  
  const dynamicCategories = CATEGORIES.map(catTitle => {
    return {
      title: catTitle,
      skills: activeSkills
        .filter(s => s.category === catTitle)
        .map(s => ({ name: s.name, level: s.percentage, icon: s.icon }))
    };
  }).filter(cat => cat.skills.length > 0);

  return (
    <section id="skills" className="bg-[#0a0a0a] pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      {/* Background Soft Animated Radial glows */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[7000ms]" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[9000ms]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            Technical Stack
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
            My Skillset
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            A curated collection of the frontend technologies, design tools, development environments, and AI-powered platforms I use to build fast, modern, and interactive web experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {dynamicCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechnicalSkills;
