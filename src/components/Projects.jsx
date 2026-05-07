import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.5-3.8 4.9 4.9 0 0 0 .15-3.7s-1.2-.38-3.9 1.4a13.38 13.38 0 0 0-7 0C6.2 2.38 5 2.76 5 2.76a4.9 4.9 0 0 0 .15 3.7A5.2 5.2 0 0 0 3 10.24c0 5.22 3 6.42 6 6.76A4.8 4.8 0 0 0 8 20.24V22" />
  </svg>
);

const projects = [
  {
    title: "Hackathon Winning UI",
    description: "An award-winning diagnostic testing system interface praised for its user experience. Designed to handle complex medical data while maintaining intuitive navigation and accessibility for healthcare professionals.",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Figma"],
    role: "Lead Frontend Developer",
    year: "2023",
    color: "from-blue-500/80 to-cyan-500/80",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    title: "Savora",
    description: "A premium, minimalist food delivery portal. Focuses on high-quality imagery and a seamless checkout experience to elevate the standard of online food ordering and restaurant discovery.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    role: "Full Stack Developer",
    year: "2024",
    color: "from-orange-500/80 to-amber-500/80",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    github: "#"
  },
  {
    title: "Crazy Fits",
    description: "A sleek, modern digital storefront built for an offline fashion brand. Integrates advanced filtering, dynamic inventory management, and a highly optimized mobile shopping experience for Gen Z consumers.",
    techStack: ["Next.js", "Tailwind CSS", "Stripe", "Sanity"],
    role: "Frontend Engineer",
    year: "2024",
    color: "from-purple-500/80 to-pink-500/80",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    github: "#"
  }
];

const ProjectCard = ({ project, index, projectsLength }) => {
  const cardRef = useRef(null);
  
  // Memoize the offset array to prevent useScroll from re-evaluating on every render
  const scrollOffset = useMemo(() => ["start start", "end start"], []);

  // Track scroll exactly when this specific card's wrapper starts moving up from the top of the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: scrollOffset
  });

  // Target scale for when the NEXT card fully covers this one, memoized
  const targetScale = useMemo(() => 1 - ( (projectsLength - index - 1) * 0.05 ), [projectsLength, index]);
  
  // Memoize the transform arrays so framer-motion doesn't re-create subscriptions
  const transformInput = useMemo(() => [0, 1], []);
  const transformOutput = useMemo(() => [1, targetScale], [targetScale]);

  // Map the progress to scale
  // We removed opacity fading so cards remain fully opaque
  const scale = useTransform(scrollYProgress, transformInput, transformOutput);

  return (
    <>
      {/* Invisible layout tracker that defines the exact scroll window for this card's animation! */}
      <div className="relative w-full h-0 pointer-events-none">
        <div ref={cardRef} className="absolute top-0 w-full h-[100dvh]" />
      </div>

      <div 
        className="h-[100dvh] flex items-center justify-center sticky top-0" 
        style={{ zIndex: index }}
      >
        <motion.div 
        style={{ 
          scale, 
          top: `calc(${index * 25}px)`
        }}
        className="relative w-[95vw] md:w-[85vw] lg:w-[75vw] max-w-6xl h-[80vh] md:h-[70vh] flex flex-col-reverse md:flex-row bg-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.7)] origin-top will-change-transform"
      >
        {/* Left Content */}
        <div className="flex-1 p-6 md:p-12 flex flex-col justify-between relative z-10 bg-gradient-to-br from-white/[0.03] to-transparent">
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.color}`} />
           
          <div>
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <span className="text-xs md:text-sm font-mono text-gray-400">{project.year}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-wider text-gray-300 border border-white/10 rounded-full px-3 py-1 bg-white/5">{project.role}</span>
            </div>
             
            <h3 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 text-white tracking-tight">{project.title}</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8 line-clamp-3 md:line-clamp-4">
              {project.description}
            </p>
             
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {project.techStack.map(tech => (
                <span key={tech} className="text-[10px] md:text-xs font-medium text-gray-300 bg-white/5 border border-white/10 px-2.5 md:px-3 py-1 md:py-1.5 rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>
           
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-auto">
            <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-black bg-white px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-gray-200 transition-colors group text-xs md:text-sm font-semibold">
              <span>View Mission</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-white bg-white/5 border border-white/10 px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-white/10 transition-colors group text-xs md:text-sm font-medium">
              <GithubIcon className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
              <span>Source</span>
            </a>
          </div>
        </div>
        
        {/* Right Image */}
        <div className="w-full md:w-1/2 h-[35%] md:h-full relative overflow-hidden bg-gray-900 group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <motion.img 
             src={project.image}
             alt={project.title}
             className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
          />
        </div>
      </motion.div>
      </div>
    </>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-space-900 relative">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
          Featured <span className="text-neon-cyan font-light">Missions</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-xl text-lg font-light">
          A selection of my best work, blending cutting-edge design with robust engineering to create memorable digital experiences.
        </p>
      </div>
      
      <div className="relative pb-32">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            index={index} 
            project={project} 
            projectsLength={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
