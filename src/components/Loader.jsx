import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // 2.5 seconds total loading time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300); // Wait a moment at 100% before finishing
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Starry/Galaxy effect using CSS/divs */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[800px] h-[800px] bg-[#b026ff]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-[#00f3ff]/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Galaxy Core / Orb */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-10">
          {/* Orbital rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-2 border-r-2 border-[#00f3ff]/50 rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border-b-2 border-l-2 border-[#b026ff]/50 rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-5 border-t border-white/30 rounded-full"
          ></motion.div>

          {/* Glowing Center Core */}
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-6 bg-white rounded-full shadow-[0_0_30px_10px_rgba(255,255,255,0.8)]"
          ></motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white font-mono tracking-[0.4em] text-sm md:text-base uppercase mb-6 text-center"
        >
          Initializing Universe
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#b026ff] via-[#00f3ff] to-white shadow-[0_0_10px_rgba(0,243,255,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          ></motion.div>
        </div>
        
        {/* Progress Percentage */}
        <div className="mt-4 text-xs text-white/50 font-mono tracking-widest">
          {Math.round(progress)}%
        </div>
      </div>
    </motion.div>
  );
}
