import React from 'react';
import { ExternalLink } from "lucide-react";
import { useData } from '../context/DataContext';

const Github = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectCard = ({ project, aosDelay }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={aosDelay}
    className={`relative rounded-2xl p-[1px] group transition-all duration-500 ${
      project.isFlagship 
        ? 'bg-gradient-to-br from-red-500/50 via-white/10 to-red-500/30 hover:from-red-500 hover:via-red-400/30 hover:to-red-500/60' 
        : 'bg-white/10 hover:bg-white/20'
    }`}
  >
    <div className={`rounded-2xl p-6 md:p-8 h-full backdrop-blur-md transition-all duration-500 ${
      project.isFlagship 
        ? 'bg-[#0f0f0f]/95 group-hover:bg-[#0f0f0f]/90' 
        : 'bg-[#111111]/90 group-hover:bg-[#111111]/80'
    }`}>
      {/* Badge and Role */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {project.badge && (
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            {project.badge}
          </span>
        )}
        {project.role && (
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-white/70 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            {project.role}
          </span>
        )}
      </div>

      {/* Number + Title */}
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-5xl font-black text-white/10 font-serif italic">{project.number}</span>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{project.title}</h3>
      </div>

      {/* Description */}
      <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-2xl font-medium">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.techTags.map((tag) => (
          <span 
            key={tag}
            className="px-3 py-1 text-xs font-bold text-white/70 bg-white/5 rounded-full border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-300 transition-all duration-300 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {/* GitHub Repository */}
        {project.links.github && (
          <a 
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:-translate-y-[3px] hover:border-white/40 hover:bg-white/20 transition-all duration-300 group/github"
          >
            <Github className="w-4 h-4 transition-transform duration-300 group-hover/github:rotate-[5deg]" />
            GitHub Repository
          </a>
        )}

        {/* Visit Website Button */}
        {project.links.website && (
          <a 
            href={project.links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff2a2a] text-white text-sm font-semibold hover:bg-red-600 hover:shadow-[0_0_20px_rgba(255,42,42,0.4)] transition-all duration-300 group/btn"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Website
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects = () => {
  const { data } = useData();
  const allProjects = [...(data?.projects || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const visibleProjects = allProjects.filter(p => p.showProject !== false);
  const socialLinks = data?.settings?.socialLinks || {};

  return (
    <section id="projects" className="bg-[#0a0a0a] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 md:mb-20">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-8 shadow-sm bg-white/5 backdrop-blur-sm">
            Featured Projects
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
            Work that speaks <br className="hidden md:block" />for itself
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg font-medium leading-relaxed">
            A selection of projects that showcase my expertise in full-stack development and modern architecture.
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-6 md:gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={{ ...project, number: String(index + 1).padStart(2, '0') }} 
              aosDelay={String((index + 1) * 100)}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <div data-aos="fade-up" data-aos-delay="500" className="mt-16 flex justify-center">
          <a
            href={socialLinks.github || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-500 group"
          >
            <Github className="w-5 h-5" />
            Explore All My Repositories
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
