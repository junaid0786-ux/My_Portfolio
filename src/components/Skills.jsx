import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Bot, CreditCard, Code, Database, Server, Layout as LayoutIcon, Terminal } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const skillGroups = [
  {
    name: 'Core Orbit',
    radius: 3,
    speed: 0.5,
    tilt: [Math.PI / 8, 0, 0],
    items: [
      { name: 'React.js', color: 'cyan', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Node.js', color: 'cyan', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'MongoDB', color: 'cyan', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'Express.js', color: 'cyan', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', bgWhite: true },
    ]
  },
  {
    name: 'Web Core Orbit',
    radius: 5.5,
    speed: 0.4,
    tilt: [-Math.PI / 12, 0, Math.PI / 12],
    items: [
      { name: 'JavaScript', color: 'purple', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', color: 'purple', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', color: 'purple', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'TypeScript', color: 'purple', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    ]
  },
  {
    name: 'Tools Orbit',
    radius: 8,
    speed: 0.3,
    tilt: [Math.PI / 10, 0, -Math.PI / 10],
    items: [
      { name: 'Tailwind CSS', color: 'cyan', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Three.js', color: 'cyan', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg', bgWhite: true },
      { name: 'Framer Motion', color: 'cyan', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framer/framer-original.svg' },
      { name: 'Git', color: 'cyan', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    ]
  },
  {
    name: 'Outer Orbit',
    radius: 10.5,
    speed: 0.15,
    tilt: [-Math.PI / 6, 0, Math.PI / 6],
    items: [
      { name: 'UI/UX Design', color: 'white', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
      { name: 'AI Engineering', color: 'white', Icon: Bot },
      { name: 'Razorpay API', color: 'white', Icon: CreditCard },
      { name: 'Lenis Scroll', color: 'white', Icon: Code },
    ]
  }
];

function SkillCard({ item, isGlobalHovered }) {
  const [hovered, setHovered] = useState(false);

  const glowShadow = 
    item.color === 'cyan' ? 'shadow-[0_0_20px_rgba(0,243,255,0.8)]' :
    item.color === 'purple' ? 'shadow-[0_0_20px_rgba(176,38,255,0.8)]' :
    'shadow-[0_0_20px_rgba(255,255,255,0.6)]';
    
  const borderColor = 
    item.color === 'cyan' ? 'border-neon-cyan' :
    item.color === 'purple' ? 'border-neon-purple' :
    'border-white/50';

  const defaultShadow = 
    item.color === 'cyan' ? 'shadow-[0_0_10px_rgba(0,243,255,0.3)]' :
    item.color === 'purple' ? 'shadow-[0_0_10px_rgba(176,38,255,0.3)]' :
    'shadow-[0_0_10px_rgba(255,255,255,0.2)]';

  return (
    <Html center zIndexRange={[100, 0]}>
      <div 
        onPointerEnter={() => { setHovered(true); isGlobalHovered.current = true; }}
        onPointerLeave={() => { setHovered(false); isGlobalHovered.current = false; }}
        className={`relative w-10 h-10 rounded-full bg-black/90 border flex items-center justify-center transition-all duration-300 ease-out cursor-pointer select-none
          ${hovered ? `scale-125 ${borderColor} ${glowShadow} z-50` : `scale-100 ${borderColor} ${defaultShadow}`}
        `}
      >
        {item.img ? (
           <img src={item.img} alt={item.name} className={`w-5 h-5 object-contain ${item.bgWhite ? 'bg-white rounded-full p-0.5' : ''}`} />
        ) : item.Icon ? (
           <item.Icon className={`w-5 h-5 ${item.color === 'cyan' ? 'text-neon-cyan' : item.color === 'purple' ? 'text-neon-purple' : 'text-white'}`} />
        ) : null}

        {hovered && (
          <div className="absolute top-full mt-3 px-3 py-1 bg-black border border-white/20 rounded-lg whitespace-nowrap text-[10px] font-bold tracking-wider text-white shadow-xl pointer-events-none">
            {item.name}
          </div>
        )}
      </div>
    </Html>
  );
}

function Orbit({ group, isGlobalHovered }) {
  const orbitRef = useRef();

  useFrame((state, delta) => {
    if (!isGlobalHovered.current && orbitRef.current) {
      orbitRef.current.rotation.y -= delta * group.speed;
    }
  });

  return (
    <group rotation={group.tilt}>
      <group ref={orbitRef}>
        {/* Invisible Track */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[group.radius - 0.02, group.radius + 0.02, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Skill Nodes */}
        {group.items.map((item, i) => {
          const angle = (i / group.items.length) * Math.PI * 2;
          const x = Math.cos(angle) * group.radius;
          const z = Math.sin(angle) * group.radius;
          return (
            <group key={i} position={[x, 0, z]}>
              <SkillCard item={item} isGlobalHovered={isGlobalHovered} />
            </group>
          );
        })}
      </group>
    </group>
  );
}

function OrbitalSystem() {
  const isGlobalHovered = useRef(false);

  return (
    <group>
      {/* Sun / Black Hole Center */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Glowing accretion disk */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1, 1.5, 64]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2.5, 64]} />
        <meshBasicMaterial color="#b026ff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      <Html center>
        <div className="text-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border border-neon-cyan/50 shadow-[0_0_30px_rgba(0,243,255,0.6)] animate-pulse flex items-center justify-center bg-black">
             <span className="text-[8px] tracking-widest text-neon-cyan font-bold uppercase">Core</span>
          </div>
        </div>
      </Html>

      {/* Orbits */}
      {skillGroups.map((group, i) => (
        <Orbit key={i} group={group} isGlobalHovered={isGlobalHovered} />
      ))}
    </group>
  );
}

export default function Skills() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yCard1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [200, -150]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yCard4 = useTransform(scrollYProgress, [0, 1], [220, -180]);
  const scaleCenter = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section ref={containerRef} id="skills" className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center bg-space-900 overflow-hidden">
      
      {/* Header */}
      <div className="text-center z-10 pointer-events-none mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Orbital <span className="text-neon-purple font-light">Stack</span>
        </h2>
        <p className="mt-4 text-gray-400 font-light tracking-widest uppercase text-xs md:text-sm">Interactive Tech System</p>
      </div>

      {/* Grid Layout for Skills & Canvas */}
      <div className="w-full max-w-[90rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 z-10 relative items-center">
        
        {/* Left Side: Backend & Systems */}
        <div className="lg:col-span-1 order-2 lg:order-1 flex flex-col gap-6">
          <motion.div style={{ y: yCard1 }} className="bg-black/60 rounded-3xl p-6 border border-white/10 hover:border-neon-cyan/30 transition-colors duration-500 shadow-2xl relative overflow-hidden group will-change-transform">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
              <Server className="w-5 h-5 text-neon-cyan" />
              Backend Systems
            </h3>
            <ul className="space-y-4 text-gray-300 font-light text-sm">
              <li className="flex items-start gap-3">
                <span className="text-neon-cyan mt-1 font-bold">›</span>
                <p>Scalable Node.js & Express.js Microservices</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-cyan mt-1 font-bold">›</span>
                <p>High-Performance RESTful & GraphQL APIs</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-cyan mt-1 font-bold">›</span>
                <p>Enterprise-grade Authentication (JWT, OAuth) & Security</p>
              </li>
            </ul>
          </motion.div>

          <motion.div style={{ y: yCard2 }} className="bg-black/60 rounded-3xl p-6 border border-white/10 hover:border-neon-cyan/30 transition-colors duration-500 shadow-2xl relative overflow-hidden group will-change-transform">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
              <Database className="w-5 h-5 text-neon-cyan" />
              Database & Cloud
            </h3>
            <ul className="space-y-4 text-gray-300 font-light text-sm">
              <li className="flex items-start gap-3">
                <span className="text-neon-cyan mt-1 font-bold">›</span>
                <p>Advanced MongoDB Aggregation Pipelines</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-cyan mt-1 font-bold">›</span>
                <p>High-Availability Schema Design & Index Optimization</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-cyan mt-1 font-bold">›</span>
                <p>Cloud Serverless Deployments & CI/CD Pipelines</p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Center: 3D Canvas Area */}
        <motion.div className="lg:col-span-2 order-1 lg:order-2 h-[50vh] lg:h-[70vh] w-full cursor-crosshair">
          <Canvas camera={{ position: [0, 10, 16], fov: 50 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <OrbitalSystem />
          </Canvas>
        </motion.div>

        {/* Right Side: Frontend & Design */}
        <div className="lg:col-span-1 order-3 flex flex-col gap-6">
          <motion.div style={{ y: yCard3 }} className="bg-black/60 rounded-3xl p-6 border border-white/10 hover:border-neon-purple/30 transition-colors duration-500 shadow-2xl relative overflow-hidden group will-change-transform">
            <div className="absolute inset-0 bg-gradient-to-bl from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
              <LayoutIcon className="w-5 h-5 text-neon-purple" />
              Frontend Interfaces
            </h3>
            <ul className="space-y-4 text-gray-300 font-light text-sm">
              <li className="flex items-start gap-3">
                <span className="text-neon-purple mt-1 font-bold">›</span>
                <p>React.js Advanced Patterns & State Management</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-purple mt-1 font-bold">›</span>
                <p>Pixel-Perfect Tailwind CSS v4 & Glassmorphism UI</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-purple mt-1 font-bold">›</span>
                <p>Physics-Based Framer Motion & Three.js Animations</p>
              </li>
            </ul>
          </motion.div>

          <motion.div style={{ y: yCard4 }} className="bg-black/60 rounded-3xl p-6 border border-white/10 hover:border-neon-purple/30 transition-colors duration-500 shadow-2xl relative overflow-hidden group will-change-transform">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
              <Terminal className="w-5 h-5 text-neon-purple" />
              Specializations
            </h3>
            <ul className="space-y-4 text-gray-300 font-light text-sm">
              <li className="flex items-start gap-3">
                <span className="text-neon-purple mt-1 font-bold">›</span>
                <p>High-Performance, Visual-First Frontend Engineering</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-purple mt-1 font-bold">›</span>
                <p>Direct-to-Consumer (D2C) & E-Commerce Architecture</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-purple mt-1 font-bold">›</span>
                <p>Design-to-Code Translation (Figma to React)</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-purple mt-1 font-bold">›</span>
                <p>End-to-End MERN System Development</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-purple mt-1 font-bold">›</span>
                <p>AI-Enhanced Workflow & Asset Generation</p>
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
      
    </section>
  );
}
