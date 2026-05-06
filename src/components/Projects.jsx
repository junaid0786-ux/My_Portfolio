import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Hackathon Winning UI",
    description: "An award-winning diagnostic testing system interface praised for its user experience.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-cyan-500/50",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Savora",
    description: "A premium, minimalist food delivery portal.",
    color: "from-orange-500/20 to-amber-500/20",
    border: "group-hover:border-amber-500/50",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Crazy Fits",
    description: "A sleek, modern digital storefront built for an offline fashion brand.",
    color: "from-purple-500/20 to-pink-500/20",
    border: "group-hover:border-pink-500/50",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  }
];

export default function Projects() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[300vh] bg-space-900">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-24 left-12 md:left-24 z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Featured <span className="text-neon-cyan font-light">Missions</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24 pt-24 w-[300vw]">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="w-[85vw] md:w-[60vw] h-[65vh] shrink-0 group relative perspective-1000"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              <a 
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={`block w-full h-full rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 ${project.border} transition-all duration-500 relative overflow-hidden group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
              >
                
                {/* Image Container */}
                <div className="absolute inset-0 w-full h-3/5 overflow-hidden border-b border-white/10">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content Container */}
                <div className="absolute bottom-0 w-full h-2/5 p-8 md:p-12 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/80 to-black/40">
                  <div className="relative z-20 flex justify-between items-end">
                    <div>
                      <div className="w-12 h-1 bg-white/20 mb-4 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-bold mb-3">{project.title}</h3>
                      <p className="text-base md:text-lg text-gray-400 font-light max-w-lg leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* View Project Button */}
                    <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <ExternalLink className="w-6 h-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

              </a>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
