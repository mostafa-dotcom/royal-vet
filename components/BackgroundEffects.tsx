'use client';

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function BackgroundEffects() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const springX = useSpring(50, { stiffness: 50, damping: 20 });
  const springY = useSpring(50, { stiffness: 50, damping: 20 });

  const mouseX = useTransform(springX, (v) => `${v}%`);
  const mouseY = useTransform(springY, (v) => `${v}%`);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    springX.set(mousePos.x);
    springY.set(mousePos.y);
  }, [mousePos, springX, springY]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0806] overflow-hidden">
      
      {/* Premium Texture Overlay: Masked Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.3]" 
        style={{ 
          backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.2) 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)'
        }} 
      />

      {/* Elegant Light Beams (Decorative Patterns) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-20%] w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rotate-[35deg] transform origin-left opacity-40 blur-[1px]" />
        <div className="absolute top-[20%] right-[-20%] w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent -rotate-[25deg] transform origin-right opacity-30 blur-[1px]" />
      </div>

      {/* Animated Gradient Orbs for Luxurious Depth */}
      {/* Orb 1: Top Left */}
      <motion.div 
        animate={{ 
          x: ["-5%", "5%", "-5%"],
          y: ["-5%", "5%", "-5%"],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-[-30%] left-[-20%] w-[100%] h-[100%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.12) 0%, transparent 60%)'
        }}
      />
      
      {/* Orb 2: Bottom Right */}
      <motion.div 
        animate={{ 
          x: ["5%", "-5%", "5%"],
          y: ["5%", "-5%", "5%"],
          rotate: [0, -30, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute bottom-[-40%] right-[-20%] w-[120%] h-[120%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(243, 229, 171, 0.08) 0%, transparent 60%)'
        }}
      />

      {/* Orb 3: Center ambient pulse */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 50%)'
        }}
      />

      {/* The Subtle Spotlight */}
      <motion.div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.12) 0%, transparent 800px)`,
          '--mouse-x': mouseX,
          '--mouse-y': mouseY,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any}
      />
      
      {/* Premium Vignette (Darkens edges to focus on center) */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(5, 5, 5, 0.85) 100%)'
        }} 
      />
    </div>
  );
}
