import React from 'react';
import { Heart, Mail } from 'lucide-react';

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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black/80 backdrop-blur-md border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[100px] bg-neon-cyan/10 blur-[50px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Cosmic Greeting */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tighter mb-4 text-white">
            Ready to explore <span className="text-neon-purple font-light">new galaxies?</span>
          </h2>
          <p className="text-gray-400 font-light text-sm max-w-md mx-auto">
            Whether you have a question or just want to say hi, my inbox is always open in the vastness of space.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 mb-12">
          <a href="https://github.com/junaid0786-ux" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all">
            <GithubIcon className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/junaidkhan-dev/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-white/5 transition-all">
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a href="mailto:your@email.com" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan hover:bg-white/5 transition-all">
            <Mail size={20} />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl text-xs text-gray-500 font-light tracking-widest uppercase">
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} JUNAID KHAN. ALL SYSTEMS OPERATIONAL.
          </p>
          <p className="flex items-center gap-2">
            BUILT WITH <Heart size={12} className="text-neon-purple animate-pulse" /> & COFFEE
          </p>
        </div>

      </div>
    </footer>
  );
}
