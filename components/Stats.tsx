'use client'; 

import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, { duration: 3000, bounce: 0 });
  const displayValue = useTransform(springValue, (current) => Math.floor(current));

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, springValue, value]);

  return (
    <span ref={ref} className="flex items-center justify-center tracking-tighter" dir="ltr">
      <span className="font-light mr-2 text-[#D4AF37] opacity-80">{prefix}</span>
      <motion.span>{displayValue}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const statsData = [
    { id: 1, value: 15000, prefix: "+", suffix: "", text: t.statsPatients },
    { id: 2, value: 5000, prefix: "+", suffix: "", text: t.statsAwards }, 
    { id: 3, value: 20000, prefix: "+", suffix: "", text: isAr ? "تطعيم" : "Vaccinations" },
    { id: 4, value: 12000, prefix: "+", suffix: "", text: isAr ? "عيلة مبسوطة" : "Happy Families" },
    { id: 5, value: 24, prefix: "", suffix: "/7", text: isAr ? "طوارئ" : "Emergency Cases" },
  ];

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-transparent relative z-10 overflow-hidden">
      
      {/* Subtle parallax background glow */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 opacity-30 pointer-events-none will-change-transform transform-gpu">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent rounded-[100%] blur-[120px] transform-gpu will-change-transform" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-16 max-w-screen-2xl relative z-10">
        
        {/* Section Headers */}
        <div className="mb-24 md:mb-32 text-center flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-serif font-light text-[#FDFBF7] tracking-wider mb-8 heading-glow font-['var(--font-alexandria)']"
          >
            {isAr ? "آلاف وثقوا فينا." : "Trusted By Thousands."}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-lg md:text-xl text-[#FDFBF7]/60 font-sans font-light max-w-2xl leading-relaxed body-luxury"
          >
            {isAr ? "كل رقم بيعبر عن روح أنقذناها، وكل زيارة بتعبر عن عيلة وثقت فينا." : "Every number represents a life cared for. Every visit represents a family that trusted us."}
          </motion.p>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center md:justify-between items-center gap-16 md:gap-8"
        >
          
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }} 
              className="flex flex-col items-center text-center group w-[40%] md:w-[15%]"
            >
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-['var(--font-alexandria)'] font-black leading-none text-[#FDFBF7] opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105 group-hover:text-[#D4AF37] will-change-transform transform-gpu drop-shadow-[0_0_10px_rgba(253,251,247,0.3)]">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </h3>
              <p className="mt-6 text-xs md:text-sm font-['var(--font-ibm)'] text-[#FDFBF7]/70 uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium transition-colors duration-500 group-hover:text-[#FDFBF7]">
                {stat.text}
              </p>
            </motion.div>
          ))}
          
        </motion.div>
      </div>
    </section>
  );
}