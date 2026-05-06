import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Send, Rocket } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef(null);

  // 3D Hover Interaction state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen flex items-center justify-center py-24 overflow-hidden bg-space-900">

      {/* Radar Background Pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="absolute w-[40vw] h-[40vw] rounded-full border border-neon-cyan/20 animate-radar" style={{ animationDelay: '0s' }}></div>
        <div className="absolute w-[60vw] h-[60vw] rounded-full border border-neon-cyan/10 animate-radar" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-[80vw] h-[80vw] rounded-full border border-neon-cyan/5 animate-radar" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            Transmission <span className="text-neon-cyan font-light">Center</span>
          </h2>
          <p className="text-gray-400 font-light">Open a secure channel to discuss your next mission.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Interactive Rocket Graphic */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="flex justify-center items-center relative perspective-[1200px] order-2 lg:order-1 h-[400px] cursor-crosshair"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* 3D Floating Rocket Container */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center p-12 rounded-full border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm shadow-[0_0_50px_rgba(0,243,255,0.1)] group"
              style={{ transformZ: 50 }}
            >
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-neon-cyan/30 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 pointer-events-none"></div>

              <Rocket
                size={140}
                strokeWidth={1}
                className="text-white drop-shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-transform duration-500 group-hover:-translate-y-4 group-hover:scale-110"
              />

              {/* Rocket Exhaust */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-6 h-12 bg-gradient-to-t from-transparent via-orange-400 to-yellow-200 blur-md rounded-full animate-pulse"></div>
                <div className="w-10 h-16 absolute top-2 bg-gradient-to-t from-transparent via-red-500 to-transparent blur-lg rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden order-1 lg:order-2"
          >
            {/* Subtle noise/texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            <form className="relative z-10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-400 font-medium ml-1">Comm ID (Name)</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all placeholder:text-gray-600"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-400 font-medium ml-1">Signal Vector (Email)</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all placeholder:text-gray-600"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-gray-400 font-medium ml-1">Transmission Data (Message)</label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all placeholder:text-gray-600 resize-none"
                  placeholder="Enter coordinates and mission details..."
                ></textarea>
              </div>

              <button
                className="group relative w-full overflow-hidden rounded-xl bg-white/5 border border-white/10 py-4 mt-4 transition-all hover:border-neon-cyan/50"
              >
                <div className="absolute inset-0 w-full h-full bg-neon-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                {/* Warp speed lines effect on hover */}
                <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                  <div className="w-[2px] h-[20px] bg-white absolute top-1/2 left-[10%] -translate-y-1/2 group-hover:animate-[warp_0.5s_linear_infinite]"></div>
                  <div className="w-[2px] h-[30px] bg-white absolute top-1/2 left-[30%] -translate-y-1/2 group-hover:animate-[warp_0.7s_linear_infinite_0.1s]"></div>
                  <div className="w-[2px] h-[15px] bg-white absolute top-1/2 left-[50%] -translate-y-1/2 group-hover:animate-[warp_0.4s_linear_infinite_0.2s]"></div>
                  <div className="w-[2px] h-[25px] bg-white absolute top-1/2 left-[70%] -translate-y-1/2 group-hover:animate-[warp_0.6s_linear_infinite_0.3s]"></div>
                  <div className="w-[2px] h-[20px] bg-white absolute top-1/2 left-[90%] -translate-y-1/2 group-hover:animate-[warp_0.5s_linear_infinite_0.15s]"></div>
                </div>

                <style>{`
                  @keyframes warp {
                    0% { transform: translateY(-100px) scaleY(1); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100px) scaleY(3); opacity: 0; }
                  }
                `}</style>

                <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-widest uppercase text-sm">
                  Transmit <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
