'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const RevealText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  return (
    <div className="overflow-hidden inline-flex px-1 py-4 -my-4">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default function Services() {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const [activeIdx, setActiveIdx] = useState(0);

  const icons = ["🩺", "👶", "✂️", "💉", "🏡", "🐩", "🛁", "🐾", "🎓", "🦷"];
  const images = [
    "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1625316708582-7c38734be31d?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=1200",
  ];

  const servicesList = t.servicesList || [];
  const services = servicesList.map((s: { title: string; desc: string }, idx: number) => ({
    id: String(idx + 1).padStart(2, '0'),
    title: s.title,
    description: s.desc,
    image: images[idx % images.length],
    icon: icons[idx % icons.length]
  }));

  return (
    <section id="services" className="bg-transparent relative z-10 text-[#FDFBF7] py-32 border-t border-white/5 overflow-hidden">
      
      {/* Intro Section */}
      <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-24 text-center">
        
        <div className="text-5xl md:text-6xl lg:text-7xl font-['var(--font-ar-calligraphy)'] font-bold tracking-tight leading-[1.4] opacity-90 flex justify-center gap-4 flex-wrap">
          <div className="translate-y-2 md:translate-y-3">
            <RevealText text={isAr ? "خدمات" : "Royal Vet"} delay={0.1} />
          </div>
          <div className="text-gradient-gold font-bold" style={{ fontFamily: 'var(--font-ar-cool)' }}>
            <RevealText text={isAr ? "رويال ڤيت" : "Services"} delay={0.2} />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 text-lg md:text-2xl font-light text-[#FDFBF7]/80 leading-relaxed max-w-3xl mx-auto body-luxury"
          style={{ fontFamily: "var(--font-ibm)" }}
        >
          {isAr 
            ? "عشان راحتهم تهمنا، بنحرص دايماً إننا نقدملهم أفضل رعاية." 
            : "Because their comfort matters, we always strive to provide the best care."}
        </motion.p>
      </div>

      {/* Expanding Flex Accordion */}
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row w-full h-[auto] md:h-[70vh] gap-4">
          {services.map((service, idx) => {
            const isActive = activeIdx === idx;
            
            return (
              <motion.div
                key={service.id}
                layout
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={`relative overflow-hidden rounded-[2rem] md:rounded-[3rem] cursor-pointer transition-all duration-700 ease-[0.16,1,0.3,1] border border-white/10 hover:border-[#D4AF37]/50 ${
                  isActive ? 'md:flex-[4] flex-grow shadow-[0_30px_80px_rgba(212,175,55,0.15)] h-[300px] md:h-auto' : 'md:flex-1 h-[80px] md:h-auto'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 33vw"
                    className={`object-cover transition-all duration-[1.5s] ease-[0.16,1,0.3,1] ${isActive ? 'scale-105 grayscale-0' : 'scale-100 grayscale-[60%] opacity-60'}`}
                  />
                </div>
                
                {/* Gradient Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-90' : 'opacity-70'}`} />
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-100'}`} />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none">
                  
                  {/* Icon & ID Container */}
                  <div className={`flex items-center gap-4 transition-all duration-700 ${isActive ? 'mb-6' : 'mb-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:mb-6'}`}>
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl shadow-lg shrink-0">
                      {service.icon}
                    </div>
                    <div className={`text-[#D4AF37] font-serif italic text-2xl md:text-3xl transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 md:opacity-100'}`} dir="ltr">
                      {service.id}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className={`overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] ${isActive ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <h3 className="text-2xl md:text-4xl font-['var(--font-alexandria)'] font-black text-[#FDFBF7] mb-4 drop-shadow-md">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base font-light font-sans text-[#FDFBF7]/80 leading-relaxed max-w-lg mb-6 body-luxury">
                      {service.description}
                    </p>
                    
                    <button className="group relative inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-[#FDFBF7] rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0A0A0A] pointer-events-auto shadow-lg">
                      <span>{isAr ? "اعرف أكتر" : "Bring Royal Vet Home"}</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </span>
                    </button>
                  </div>

                  {/* Vertical text for inactive state (Desktop only) */}
                  <div className={`hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 origin-bottom-left -rotate-90 whitespace-nowrap transition-all duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                     <span className="text-lg font-['var(--font-alexandria)'] font-bold text-[#FDFBF7]/70 tracking-wide uppercase">
                       {service.title}
                     </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
    </section>
  );
}
