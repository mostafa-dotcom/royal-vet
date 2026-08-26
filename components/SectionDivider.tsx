'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function SectionDivider() {
  return (
    <div className="w-full relative flex items-center justify-center py-20 z-20">
      
      {/* Cinematic Glowing Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent blur-[40px] mix-blend-screen pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-center opacity-80">
        {/* Left Line */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex-1 max-w-[400px] h-[2px] bg-gradient-to-l from-[#D4AF37] via-[#D4AF37]/50 to-transparent origin-right rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
        />
        
        {/* Central Emblem */}
        <motion.div 
          initial={{ scale: 0, opacity: 0, rotate: -90 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1, ease: "backOut", delay: 0.3 }}
          className="px-6 flex items-center justify-center relative"
        >
          <div className="absolute inset-0 bg-[#D4AF37]/50 blur-[20px] rounded-full" />
          <div className="w-10 h-10 rounded-full border-[1.5px] border-[#D4AF37] flex items-center justify-center bg-[#111] shadow-[0_0_20px_rgba(212,175,55,0.8),inset_0_0_15px_rgba(212,175,55,0.4)] relative z-10">
            <Sparkles className="w-5 h-5 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
        </motion.div>
        
        {/* Right Line */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex-1 max-w-[400px] h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent origin-left rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
        />
      </div>
    </div>
  );
}
