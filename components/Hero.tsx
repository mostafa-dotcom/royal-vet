'use client'; 

import { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '../app/utils/LanguageContext';

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none">
      <div className="w-16 h-16 border border-[#D4AF37]/30 rounded-full flex items-center justify-center animate-pulse">
        <div className="w-3 h-3 bg-[#D4AF37]/80 rounded-full shadow-[0_0_20px_rgba(212,175,55,1)]" />
      </div>
    </div>
  )
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  // --- Mouse Parallax Logic ---
  // We use Framer Motion's useMotionValue to track raw mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  /**
   * Captures mouse movement and normalizes coordinates to a [-1, 1] range.
   * Wrapped in useCallback to prevent recreation on every render.
   */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Optimization: Only process mouse movements when the hero section is visible in the viewport
    if (!inView) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize coordinates: 0 is center, -1 is top/left, 1 is bottom/right
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY, inView]);
  
  // Apply physics-based spring animation to smooth out raw mouse movements
  const springConfig = { damping: 40, stiffness: 100, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // --- Parallax Mapping ---
  // Map the smoothed [-1, 1] mouse coordinates to pixel offsets for different background layers
  // Background moves slightly in the same direction as the mouse
  const bgX = useTransform(smoothMouseX, [-1, 1], [-50, 50]);
  const bgY = useTransform(smoothMouseY, [-1, 1], [-50, 50]);
  
  // Particles move faster and in the opposite direction to create depth (parallax effect)
  const particlesX = useTransform(smoothMouseX, [-1, 1], [60, -60]);
  const particlesY = useTransform(smoothMouseY, [-1, 1], [60, -60]);

  // --- Dolly Camera Logic ---
  // Animate elements based on vertical scroll progress (0 = top, 1 = scrolled past)
  const dollyOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const pulseY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  // --- Animation Presets ---
  // Strict Spring Reveal Rules for initial load animations
  const springReveal = { type: "spring" as const, stiffness: 100, damping: 20 };

  return (
    <section ref={ref} onMouseMove={handleMouseMove} className="relative min-h-screen w-full bg-transparent overflow-hidden pt-28 pb-12 flex items-center">
      
      {/* Cinematic Lighting System: Ambient Glow */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none transform-gpu will-change-transform translate-x-1/3 -translate-y-1/3" />
      
      {/* Floating Gold Dust Particles */}
      <motion.div style={{ x: particlesX, y: particlesY }} className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu will-change-transform">
        {[...Array(20)].map((_, i) => {
          // Using pseudo-random values based on index to avoid hydration mismatch while still looking random
          const left = `${(i * 13) % 100}%`;
          const top = `${(i * 27) % 100}%`;
          const size = ((i % 3) + 1) + 'px';
          const duration = 8 + (i % 7);
          const delay = (i % 5);
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#D4AF37] mix-blend-screen transform-gpu will-change-transform"
              style={{ width: size, height: size, left, top }}
              animate={{
                y: [0, -150],
                x: [0, (i % 2 === 0 ? 30 : -30)],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay
              }}
            />
          );
        })}
      </motion.div>
      
      {/* Signature Moment: Veterinary DNA / Golden ECG Pulse */}
      <motion.div 
        style={{ y: pulseY }}
        className="absolute left-10 md:left-24 top-40 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent pointer-events-none hidden md:block transform-gpu will-change-transform"
      >
        <motion.div 
          animate={{ y: [0, 1000] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-32 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent blur-[2px] transform-gpu will-change-transform"
        />
        {/* Subtle Heartbeat node */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,1)] transform-gpu will-change-transform"
        />
      </motion.div>

      {/* Dolly Camera Grid Layout */}
      <motion.div style={{ y: textY, opacity: dollyOpacity }} className="relative z-10 w-full h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center px-6 md:px-12 transform-gpu will-change-transform">
        
        {/* Left Side: Typography and Button */}
        <motion.div 
          className="flex flex-col justify-center pointer-events-none z-20 order-2 lg:order-1 h-full lg:h-auto pb-12 lg:pb-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springReveal, delay: 0.1 }}
            className="relative"
          >
            {/* Cinematic Lighting System: Accent Light behind typography */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />
            <h1 className={`${isAr ? 'font-cool' : "font-['var(--font-en-formal)']"} text-5xl md:text-7xl lg:text-7xl font-bold leading-[1.4] text-[#FDFBF7] tracking-tight drop-shadow-2xl heading-glow py-4`}>
              {t.heroMainLine1} <br />
              <span className={`text-gradient-gold opacity-90 drop-shadow-md ${!isAr ? "font-['var(--font-en-script)'] font-normal text-[1.3em]" : ""}`}>
                {t.heroMainLine2}
              </span>
            </h1>
            <h2 className="mt-6 text-lg md:text-xl font-light font-['var(--font-ibm)'] text-[#FDFBF7]/80 max-w-xl leading-relaxed body-luxury">
              {t.heroDesc}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springReveal, delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-6 pointer-events-auto"
          >
            {/* Strict Micro-Interaction Rule: Fast, subtle changes (250ms ease-out) */}
            <button className="bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-[#0A0A0A] font-['var(--font-ibm)'] px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] focus-visible:outline-none relative overflow-hidden group">
              <span className="relative z-10">{t.heroAction}</span>
              {/* Specular button sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </button>
            <button className="bg-[#ffffff]/5 backdrop-blur-md border border-[#FDFBF7]/20 border-t-[#FDFBF7]/40 text-[#FDFBF7] font-['var(--font-ibm)'] px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 ease-out hover:bg-[#ffffff]/10 hover:scale-105 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] focus-visible:outline-none shadow-lg">
              {t.heroHelp}
            </button>
            <button className="text-[#FDFBF7]/60 font-['var(--font-ibm)'] text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-[#D4AF37] hover:tracking-[0.15em] focus-visible:outline-none">
              {t.heroExplore}
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Canvas */}
        <div className="w-full h-[50vh] lg:h-[70vh] relative order-1 lg:order-2 flex items-center justify-center pointer-events-auto z-10 transform-gpu cursor-grab active:cursor-grabbing touch-none">
          <Hero3D inView={inView} />
        </div>

      </motion.div>

      
    </section>
  );
}