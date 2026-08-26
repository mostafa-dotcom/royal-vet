'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';

import Image from 'next/image';

const bgImages = [
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1920"
];

interface MilestoneItem {
  year: string;
  date?: string;
  title: string;
  desc: string;
  isAnniversary?: boolean;
}

const ConfettiBurst = () => {
  const prng = (seed: number) => {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
  };

  const colors = ['bg-[#D4AF37]', 'bg-[#FFF3C7]', 'bg-white', 'bg-[#F3E5AB]', 'bg-[#B8962E]'];

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 overflow-visible">
      {[...Array(40)].map((_, i) => {
        const r1 = prng(i * 1);
        const r2 = prng(i * 2);
        const r3 = prng(i * 3);
        const r4 = prng(i * 4);
        const r5 = prng(i * 5);
        const color = colors[Math.floor(r5 * colors.length)];
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, r1 * 1.5 + 0.5, 0],
              x: (r2 - 0.5) * 800,
              y: (r3 - 0.5) * 800 - 200,
              rotate: r4 * 720,
            }}
            transition={{
              duration: 2.5 + prng(i * 6) * 2,
              repeat: Infinity,
              delay: prng(i * 7) * 2,
              ease: "easeOut"
            }}
            className={`absolute w-2 h-2 md:w-3 md:h-3 rounded-full ${color} shadow-[0_0_15px_rgba(212,175,55,0.8)]`}
          />
        );
      })}
    </div>
  );
};

function MilestoneText({ item, index, numItems, smoothProgress }: { item: MilestoneItem, index: number, numItems: number, smoothProgress: MotionValue<number> }) {
  const startFadeIn = index === 0 ? 0 : (index - 0.5) / (numItems - 1);
  const peak = index / (numItems - 1);
  const isLast = index === numItems - 1;
  const startFadeOut = isLast ? 2 : (index + 0.5) / (numItems - 1);

  const opacity = useTransform(
    smoothProgress,
    [startFadeIn, peak, startFadeOut],
    [0, 1, 0]
  );
  
  const translateY = useTransform(
    smoothProgress,
    [startFadeIn, peak, startFadeOut],
    [60, 0, -60]
  );

  const filter = useTransform(
    smoothProgress,
    [startFadeIn, peak, startFadeOut],
    ["blur(15px)", "blur(0px)", "blur(15px)"]
  );
  
  const pointerEvents = useTransform(
    smoothProgress,
    (v: number) => (v > startFadeIn && (isLast || v < startFadeOut) ? "auto" : "none")
  );

  return (
    <motion.div 
      style={{ opacity, y: translateY, filter, pointerEvents }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className={`flex items-center gap-6 md:gap-10 mb-4 md:mb-8`}>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="relative">
            <h3 className="text-6xl md:text-7xl lg:text-[7rem] xl:text-[9rem] font-black font-['var(--font-alexandria)'] text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#F3E5AB] leading-none tracking-tighter drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              {item.year}
            </h3>
            {item.isAnniversary && (
              <>
                <ConfettiBurst />
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.3)_0%,transparent_70%)] blur-2xl pointer-events-none -z-10"
                />
              </>
            )}
          </div>
        </div>
        <div className={`flex flex-col gap-3 items-start mt-6 md:mt-10`}>
          {item.date && (
             <span className="text-[#F3E5AB] text-base md:text-xl font-['var(--font-ibm)'] tracking-[0.1em] font-bold drop-shadow-md">
               {item.date}
             </span>
          )}
          <div className="flex items-stretch gap-4 md:gap-5 mt-1">
            <div className="w-[2px] rounded-full bg-gradient-to-b from-[#D4AF37] via-[#F3E5AB] to-transparent opacity-80 shrink-0" />
            <div className="flex flex-col gap-2 pb-2">
              <h4 className="text-2xl md:text-3xl xl:text-4xl font-bold font-['var(--font-heading)'] text-white leading-snug">
                {item.title}
              </h4>
              <p className="text-base md:text-lg font-light font-['var(--font-body)'] text-white/80 max-w-sm md:max-w-md leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MilestoneImage({ item, index, numItems, smoothProgress, image }: { item: MilestoneItem, index: number, numItems: number, smoothProgress: MotionValue<number>, image: string }) {
  const imgScale = 1.2;
  const imgY = useTransform(
    smoothProgress, 
    [(index - 1) / (numItems - 1), index / (numItems - 1), (index + 1) / (numItems - 1)],
    ["-15%", "0%", "15%"]
  );

  return (
    <div className="w-full h-[55vh] md:h-screen flex items-center justify-center md:p-12 lg:p-20">
      <div className="relative w-full h-full md:h-[85vh] md:rounded-[3rem] overflow-hidden md:shadow-[0_40px_100px_rgba(0,0,0,0.9)] group border-0 md:border md:border-white/10">
        
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 w-full h-full">
          <Image 
            src={image} 
            alt={item.title} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover filter grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000" 
          />
        </motion.div>
        
        {/* Deep gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-90 md:opacity-60" />
        
        {/* Inner Glass ring */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 hidden md:block rounded-[3rem] pointer-events-none" />
        
        {/* Artistic Date Watermark inside the image */}
        <div className="absolute bottom-8 right-10 pointer-events-none mix-blend-overlay hidden md:block">
          <span className="text-[12vw] font-black font-['var(--font-alexandria)'] text-white opacity-30 select-none tracking-tighter">
            {item.date || item.year}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function History() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end end"]
  });
  
  // Smooth out the scroll progress for a buttery feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25, mass: 0.5 });
  
  const milestones: MilestoneItem[] = t.historyMilestones || [
    { year: "2025", date: "14/8", title: "Opening Royal Vet", desc: "The beginning of a new era in pet care." },
    { year: "2026", date: "13/2", title: "First Emergency Surgery", desc: "Saving lives when it matters most." },
    { year: "2026", date: "23/5", title: "Introducing Home Visits", desc: "Bringing premium care to your doorstep." },
    { year: "2026", date: "13/6", title: "Advanced Surgical Equipment", desc: "Upgrading to world-class medical technology." },
    { year: "2026", date: "New", title: "The Royal Vet Ecosystem", desc: "A complete ecosystem for animal wellbeing." }
  ];

  const numItems = milestones.length;
  // Calculate the vertical scroll of the image container
  const imageY = useTransform(smoothProgress, [0, 1], ["0vh", `-${(numItems - 1) * 100}vh`]);

  return (
    <section id="history" ref={targetRef} className="relative bg-[#020202]" style={{ height: `${numItems * 100}vh` }}>
      
      {/* Background Ambient Glow that slowly pulses based on scroll */}
      <motion.div 
        style={{ opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]) }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] bg-[radial-gradient(circle,_#D4AF37_0%,_transparent_60%)] mix-blend-screen blur-[120px]" />
      </motion.div>

      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden relative">
        



        {/* IMAGE GALLERY (Top on mobile, Right/Left on desktop) */}
        <div className={`w-full h-[55vh] md:h-screen md:w-1/2 relative overflow-hidden z-10 md:order-2`}>
          <motion.div style={{ y: imageY }} className="w-full h-full">
            {milestones.map((item, index) => (
              <MilestoneImage
                key={index}
                item={item}
                index={index}
                numItems={numItems}
                smoothProgress={smoothProgress}
                image={bgImages[index % bgImages.length]}
              />
            ))}
          </motion.div>
        </div>

        {/* TEXT CONTENT (Bottom on mobile, Left/Right on desktop) */}
        <div className={`w-full h-[45vh] md:h-screen md:w-1/2 flex flex-col justify-center px-[8vw] md:px-[6vw] xl:px-[8vw] relative z-20 md:order-1 ${isAr ? 'text-right' : 'text-left'}`}>
          
          {/* Section Header */}
          <motion.div 
             initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
             whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="w-full flex flex-col items-center justify-center mb-4 md:mb-8"
          >
             <div className="inline-flex flex-col items-center">
               <h2 
                 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-['var(--font-cairo)',_sans-serif] text-[#FDFBF7] leading-[1.1] mb-6 drop-shadow-2xl text-center"
                 style={{ wordSpacing: '-0.2em' }}
               >
                 {isAr ? (
                   <>قصة <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">رويال ڤيت</span></>
                 ) : (
                   <>The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Royal Story</span></>
                 )}
               </h2>
               
               {/* Description */}
               <p className="text-[#FDFBF7]/80 text-sm md:text-base lg:text-lg font-['var(--font-ibm)'] font-light text-center max-w-sm md:max-w-md mt-1 mb-4 md:mb-6">
                 {t.historyDesc}
               </p>
               
               {/* Chic Scroll Down Indicator */}
               <div className="flex flex-col items-center gap-2 mt-2 opacity-80">
                 <span className="text-[10px] md:text-xs text-[#D4AF37] uppercase tracking-[0.2em] md:tracking-[0.3em] font-['var(--font-ibm)']">
                   {isAr ? 'مرر للأسفل' : 'Scroll Down'}
                 </span>
                 <div className="relative w-[1px] h-6 md:h-10 bg-white/10 overflow-hidden">
                   <motion.div 
                     animate={{ y: ["-100%", "100%"] }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent w-full h-full"
                   />
                 </div>
               </div>
              </div>
           </motion.div>

          {/* Vertical Timeline Track for Desktop */}
          <div className={`absolute top-1/2 -translate-y-1/2 ${isAr ? 'right-0' : 'left-0'} w-[2px] h-[50vh] bg-white/5 rounded-full hidden md:block`}>
            <motion.div 
               style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
               className="w-full h-full bg-gradient-to-b from-[#D4AF37] to-[#F3E5AB] shadow-[0_0_20px_#D4AF37]"
            />
            {/* Pulsing indicator node */}
            <motion.div 
               style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
               className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D4AF37] shadow-[0_0_20px_#D4AF37] border-2 border-[#020202]"
            />
          </div>

          <div className="relative w-full h-[35vh] md:h-[50vh] mt-4 md:mt-0">
            {milestones.map((item, index) => (
              <MilestoneText 
                key={index}
                item={item}
                index={index}
                numItems={numItems}
                smoothProgress={smoothProgress}
              />
            ))}
          </div>
          
        </div>

      </div>
      
      {/* Global Progress Bar fixed at the bottom of the screen (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-[3px] bg-white/5 z-50">
        <motion.div 
          style={{ scaleX: smoothProgress, transformOrigin: isAr ? 'right' : 'left' }} 
          className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] shadow-[0_0_15px_#D4AF37]" 
        />
      </div>
      
    </section>
  );
}
