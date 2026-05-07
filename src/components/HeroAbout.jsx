import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Download, GitMerge } from 'lucide-react';
import profileImg from '../assets/profile.png';

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.5-3.8 4.9 4.9 0 0 0 .15-3.7s-1.2-.38-3.9 1.4a13.38 13.38 0 0 0-7 0C6.2 2.38 5 2.76 5 2.76a4.9 4.9 0 0 0 .15 3.7A5.2 5.2 0 0 0 3 10.24c0 5.22 3 6.42 6 6.76A4.8 4.8 0 0 0 8 20.24V22" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

function StarryBackground({ mousePosition }) {
  const groupRef = useRef();
  const starsRef = useRef();

  useFrame((state, delta) => {
    if (starsRef.current) {
      // Infinite continuous rotation (slowed down)
      starsRef.current.rotation.x -= delta * 0.01;
      starsRef.current.rotation.y -= delta * 0.01;
    }

    if (groupRef.current && mousePosition.current) {
      // Reduced-speed mouse parallax effect reading from ref
      groupRef.current.position.x = mousePosition.current.x * 2.5;
      groupRef.current.position.y = -mousePosition.current.y * 2.5;
      groupRef.current.rotation.x = -mousePosition.current.y * 0.1;
      groupRef.current.rotation.y = mousePosition.current.x * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={starsRef}>
        <Stars radius={100} depth={50} count={2500} factor={4} saturation={1} fade speed={0.5} />
      </group>
    </group>
  );
}



export default function HeroAbout() {
  const mousePosition = useRef({ x: 0, y: 0 });

  const mockContributions = useMemo(() => {
    return [...Array(14)].map(() => 
      Math.random() > 0.5 ? (Math.random() > 0.5 ? 'bg-neon-cyan' : 'bg-neon-cyan/50') : 'bg-white/10'
    );
  }, []);

  const handleMouseMove = (e) => {
    mousePosition.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    };
  };

  const scrollToSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="journey"
      className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-12 overflow-hidden bg-space-900"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          <StarryBackground mousePosition={mousePosition} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full min-h-[80vh]">

        {/* Left Side: Visual Profile */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="col-span-1 lg:col-span-5 relative"
          style={{ perspective: 1000 }}
        >
          <div className="relative group w-full max-w-sm mx-auto lg:mx-0">
            {/* Dynamic Glowing Aura */}
            <div className="absolute -inset-1 bg-white/20 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition duration-700"></div>

            {/* Profile Container */}
            <div className="relative rounded-[2rem] bg-space-900/80 backdrop-blur-2xl border border-white/10 p-2 overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:border-white/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 pointer-events-none rounded-[2rem]"></div>

              {/* Image Mask */}
              <div className="relative rounded-[1.8rem] overflow-hidden aspect-[4/5] bg-black/50">
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] z-20 pointer-events-none"></div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff] z-20 animate-ping"></div>
                <div className="absolute bottom-4 left-4 w-12 h-1 bg-gradient-to-r from-white to-transparent z-20 opacity-50"></div>

                <img
                  src={profileImg}
                  alt="Junaid Khan"
                  className="w-full h-full object-cover object-top filter contrast-[1.05] saturate-[1.1] group-hover:scale-110 transition-transform duration-1000"
                />

                {/* Overlay Gradient for deep space feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 md:-right-10 bottom-12 z-30 bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,243,255,0.15)]"
            >
              <p className="text-white font-medium tracking-wider text-sm flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f3ff] animate-pulse"></span>
                OPEN TO WORK
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: The Narrative */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="col-span-1 lg:col-span-7 flex flex-col justify-center text-center lg:text-left mt-8 lg:mt-0"
        >
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-neon-purple/20 blur-[100px] rounded-full pointer-events-none"></div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-neon-cyan text-sm md:text-base font-mono tracking-[0.2em] mb-4 flex items-center justify-center lg:justify-start gap-4 uppercase"
            >
              <span className="hidden md:block w-12 h-[1px] bg-neon-cyan"></span>
              Hello Universe, I am
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl sm:text-6xl md:text-8xl font-black mb-4 tracking-tighter text-white drop-shadow-md"
            >
              Junaid Khan
            </motion.h1>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-3xl font-normal mb-6 text-white drop-shadow-sm"
            >
              Building <span className="font-bold text-white">Digital Realities</span> from concepts to code.
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="prose prose-invert max-w-2xl mx-auto lg:mx-0 mb-8 text-gray-100 text-base md:text-lg leading-relaxed font-medium drop-shadow-sm"
            >
              <p className="mb-4">
                I am a passionate Full-Stack Engineer and UI/UX Designer who transforms complex problems into elegant, high-performance web applications. Every project is an opportunity to tell a story through seamless user experiences and cutting-edge interactive architecture. Let's create something extraordinary together.
              </p>
            </motion.div>

            {/* GitHub Contributions Mock & Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-fit mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-300 font-medium">
                    <GitMerge size={16} className="text-neon-cyan" /> Open Source Activity
                  </div>
                  {/* Mock Contribution Graph */}
                  <div className="flex gap-1">
                    {mockContributions.map((colorClass, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-sm ${colorClass}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/junaid0786-ux"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/20 transition-colors border border-white/10 hover:border-white/50 group"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/junaidkhan-dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/20 transition-colors border border-white/10 hover:border-[#0A66C2] group"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 items-center"
            >
              <a
                href="#projects"
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neon-cyan hover:text-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,243,255,0.4)]"
              >
                View Systems
              </a>
              <a
                href="/resume.pdf"
                download
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/5 hover:border-white/50 transition-all duration-300 flex items-center gap-3"
              >
                <Download size={18} className="text-neon-purple" />
                Download Resume
              </a>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
