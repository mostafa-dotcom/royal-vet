'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import Image from 'next/image';

// ------------------------------------------------------------------------
// PERFORMANCE FIX: Isolate the rapid state updates!
// ------------------------------------------------------------------------
function ProgressCounter({ onComplete }: { onComplete: () => void }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString().padStart(2, '0') + '%');

  useEffect(() => {
    const anim = animate(count, 100, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1], // Apple-like ease out
      onComplete: onComplete
    });
    return () => anim.stop();
  }, [count, onComplete]);

  return (
    <motion.span className="text-[#D4AF37] text-sm md:text-base tracking-[0.5em] font-mono font-light ml-[0.5em] transform-gpu will-change-transform">
      {rounded}
    </motion.span>
  );
}

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    if (isLoaded && isVisible) {
      // 300ms delay to let the flashbang transition trigger beautifully
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 300); 
    }
    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [isLoaded, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden pointer-events-auto transform-gpu will-change-transform"
        >
          {/* Main Animation Container (Zero React Re-renders here!) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 1.3, filter: "brightness(4)", opacity: 0, transition: { duration: 1.2, ease: "easeOut" } }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 transform-gpu will-change-transform"
          >
            {/* The Golden Core (Intense backlight) */}
            <div className="absolute w-[60%] h-[60%] bg-[#D4AF37] rounded-full blur-[60px] opacity-20 mix-blend-screen pointer-events-none transform-gpu will-change-transform" />

            {/* The Veterinary Heartbeat Pulses (Phase 4 Signature Motif) */}
            {[0, 0.5, 1].map((delay, i) => (
              <motion.div 
                key={i}
                className="absolute inset-[25%] rounded-full pointer-events-none transform-gpu will-change-transform"
                style={{ 
                  border: '1px solid rgba(212,175,55,0.4)', 
                  boxShadow: '0 0 20px rgba(212,175,55,0.3), inset 0 0 20px rgba(212,175,55,0.3)' 
                }}
                animate={{ 
                  scale: [1, 1.1, 1, 1.3, 2.5], 
                  opacity: [0, 0.8, 0.2, 1, 0] 
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeOut", 
                  times: [0, 0.1, 0.2, 0.4, 1],
                  delay 
                }}
              />
            ))}

            {/* The Logo */}
            <div className="absolute inset-[15%] z-10 transform-gpu will-change-transform">
              <Image 
                src="/logo.png" 
                alt="Royal Vet Logo" 
                fill 
                sizes="(max-width: 768px) 250px, 350px"
                priority
                className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
              />
            </div>
          </motion.div>

          {/* Minimalist Progress Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-16 md:bottom-24 flex flex-col items-center gap-4 z-20 transform-gpu will-change-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-gradient-to-l from-[#D4AF37]/50 to-transparent" />
              
              {/* Isolated Child Component for Lag-Free Numbers */}
              <ProgressCounter onComplete={handleComplete} />
              
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
            </div>
            <span className="text-[#FDFBF7]/30 text-[9px] tracking-[0.6em] uppercase ml-[0.6em]">
              Excellence Awaits
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
