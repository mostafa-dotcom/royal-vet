'use client';
import React from 'react';
import { useLanguage } from '../app/utils/LanguageContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FloatingCalculatorBtn() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const pathname = usePathname();

  if (pathname === '/age-calculator') {
    return null;
  }

  return (
    <div className={`fixed z-[110] transition-all duration-300 top-24 md:top-8 lg:top-10 ${isAr ? 'right-4 md:right-6 lg:right-8 xl:right-12' : 'left-4 md:left-6 lg:left-8 xl:left-12'}`}>
      <Link href="/age-calculator">
        <motion.div
          animate={{
            boxShadow: [
              "0px 0px 15px rgba(212,175,55,0.3)",
              "0px 0px 30px rgba(212,175,55,0.6)",
              "0px 0px 15px rgba(212,175,55,0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#F3E5AB] px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-[#F3E5AB]/50 cursor-pointer shadow-lg"
        >
          {/* Animated Sweep / Shine */}
          <motion.div
            animate={{ x: ['-200%', '200%'] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1.5 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[30deg] z-10"
          />
          
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <span className="relative z-20 text-black font-black font-['var(--font-ar-heading)'] text-[11px] md:text-sm tracking-wide whitespace-nowrap mt-0.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
            {isAr ? 'احسب عمر أليفك' : 'Calculate Pet Age'}
          </span>
        </motion.div>
      </Link>
    </div>
  );
}
