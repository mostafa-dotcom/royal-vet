'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  // Directly track mouse values without triggering React re-renders
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Premium, buttery-smooth spring configs
  // Outer ring lags slightly behind for that premium "drag" effect
  const springConfigInner = { damping: 25, stiffness: 700, mass: 0.1 };
  const springConfigOuter = { damping: 35, stiffness: 300, mass: 0.5 };
  
  const innerX = useSpring(cursorX, springConfigInner);
  const innerY = useSpring(cursorY, springConfigInner);
  
  const outerX = useSpring(cursorX, springConfigOuter);
  const outerY = useSpring(cursorY, springConfigOuter);

  useEffect(() => {
    // Check if device is touch - don't show custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // Timeout prevents the ESLint "cascading renders" error
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // If on mobile/touch device or not mounted yet, don't render cursor at all
  if (!isMounted) return null;
  if (window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] flex items-center justify-center mix-blend-screen"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.08)' : 'rgba(212, 175, 55, 0)',
            borderColor: isHovering ? 'rgba(212, 175, 55, 0.8)' : 'rgba(212, 175, 55, 0.3)',
            borderWidth: isHovering ? '1px' : '1px',
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-10 h-10 rounded-full border shadow-[0_0_20px_rgba(212,175,55,0.15)] flex items-center justify-center backdrop-blur-[2px]"
        />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[10000] flex items-center justify-center mix-blend-screen"
        style={{
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 0 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,1)]"
        />
      </motion.div>
    </>
  );
}
