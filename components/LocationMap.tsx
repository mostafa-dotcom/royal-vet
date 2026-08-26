'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';
import { Navigation, Clock, Phone } from 'lucide-react';

export default function LocationMap() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section id="location" className="relative w-full h-[80vh] md:h-[90vh] bg-[#0A0A0A] border-t border-white/5 overflow-hidden z-10 flex items-center justify-center">
      
      {/* Background Map Iframe with CSS Filter magic - 3D Isometric View */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden" style={{ perspective: '1200px' }}>
        <div 
          className="absolute inset-0 w-full h-full origin-center"
          style={{ transform: 'rotateX(45deg) scale(1.6) translateY(-5%)', transformStyle: 'preserve-3d' }}
        >
          <iframe
            src="https://maps.google.com/maps?q=31.094625,31.306762&t=m&z=17&output=embed&iwloc=near"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover filter invert grayscale-[100%] contrast-[1.2] hue-rotate-[180deg] opacity-80 pointer-events-none"
          ></iframe>
          
          {/* Minimalist Elegant Gold Map Point (3D Counter-Rotation) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center justify-center">
            
            {/* Floating 3D Location Pin (Classic shape, highly polished) */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[100%] mb-1 flex justify-center"
              style={{ transform: 'rotateX(-45deg)', transformOrigin: 'bottom' }}
            >
              {/* Soft glow behind the pin */}
              <div className="absolute top-0 w-12 h-12 bg-[#D4AF37] blur-[20px] opacity-30 rounded-full" />
              
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-14 h-14 relative z-10 drop-shadow-[0_15px_15px_rgba(212,175,55,0.7)]">
                <defs>
                  <linearGradient id="goldGradientClassic" x1="10%" y1="0%" x2="90%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2CD" />
                    <stop offset="30%" stopColor="#D4AF37" />
                    <stop offset="70%" stopColor="#B8860B" />
                    <stop offset="100%" stopColor="#6B4E04" />
                  </linearGradient>
                </defs>
                
                {/* Main Pin Shape */}
                <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 24 12 24C12 24 20 14 20 8C20 3.58 16.42 0 12 0Z" fill="url(#goldGradientClassic)" stroke="#FFF2CD" strokeWidth="0.2" />
                
                {/* Glossy Top Highlight for 3D glass/metal effect */}
                <path d="M12 0.5C8.5 0.5 5.5 2.5 4.5 6C5.5 2.5 8.5 1.2 12 1.2C15.5 1.2 18.5 2.5 19.5 6C18.5 2.5 15.5 0.5 12 0.5Z" fill="#FFFFFF" opacity="0.6" />
                
                {/* Inner Hole */}
                <circle cx="12" cy="8" r="6" fill="#0A0A0A" />
                <circle cx="12" cy="8" r="6" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.8" />
                
                {/* Royal Vet Logo Image */}
                <image href="/logo.png" x="6.5" y="2.5" width="11" height="11" preserveAspectRatio="xMidYMid meet" />
              </svg>
            </motion.div>

            {/* Expanding Ripples (Sonar Effect) */}
            <div className="absolute w-24 h-24 bg-[#D4AF37]/10 rounded-full animate-[ping_3s_ease-out_infinite]" />
            <div className="absolute w-16 h-16 border border-[#D4AF37]/30 rounded-full animate-[ping_3s_ease-out_infinite_1s]" />
            <div className="absolute w-10 h-10 border border-[#D4AF37]/50 rounded-full animate-[ping_3s_ease-out_infinite_2s]" />
            
            {/* Core Glow */}
            <div className="absolute w-8 h-8 bg-[#D4AF37]/20 rounded-full blur-md" />
            
            {/* Inner Golden Dot standing straight */}
            <div 
              className="relative z-10 w-4 h-4 bg-gradient-to-tr from-[#B8860B] to-[#F3E5AB] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)] border border-white/50"
              style={{ transform: 'rotateX(-45deg)' }}
            >
              {/* Center highlight */}
              <div className="absolute top-[2px] right-[2px] w-1.5 h-1.5 bg-white/80 rounded-full blur-[0.5px]" />
            </div>
          </div>
        </div>
        
        {/* Dark Vignette Overlay - Reduced for clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-[#0A0A0A] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none z-10" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20 flex justify-end">
        
        {/* Floating Info Panel */}
        <motion.div 
          initial={{ opacity: 0, x: isAr ? -50 : 50, y: 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", stiffness: 80, damping: 20 }}
          className="w-full md:w-[450px] bg-[#0A0A0A]/70 backdrop-blur-2xl border border-white/10 hover:border-[#D4AF37]/30 rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.9)] transition-colors duration-500 group"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            {isAr ? 'مكاننا فين؟' : 'Our Location'}
          </div>

          <h2 className="text-3xl md:text-4xl font-black font-['var(--font-alexandria)'] text-white mb-8 leading-tight heading-glow">
            {isAr ? 'دايماً في ' : 'Always Within '}
            <span className="text-gradient-gold">{isAr ? 'انتظارك' : 'Reach'}</span>
          </h2>

          <div className="flex flex-col gap-6 mb-10 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/50 transition-colors duration-500">
                <Navigation className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 font-['var(--font-ibm)']">{isAr ? 'العنوان' : 'Address'}</h4>
                <p className="text-white/60 text-sm leading-relaxed font-light body-luxury">
                  {isAr ? 'نبروه بجوار مسجد المنزلاوي عند موقف المنصورة-البر التاني' : 'Nabaruh, next to El Manzalawy Mosque at Mansoura stop - second bank'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/50 transition-colors duration-500">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 font-['var(--font-ibm)']">{isAr ? 'مواعيد العمل' : 'Working Hours'}</h4>
                <p className="text-white/60 text-sm leading-relaxed font-light body-luxury">
                  {isAr ? 'موجودين عشانكم 24 ساعة كل يوم' : 'Available 24/7 Daily'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/50 transition-colors duration-500">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 font-['var(--font-ibm)']">{isAr ? 'كلمنا على' : 'Contact'}</h4>
                <p className="text-white/60 text-sm leading-relaxed font-light body-luxury" dir="ltr">
                  01552295998
                </p>
              </div>
            </div>
          </div>

          <a href="https://maps.app.goo.gl/o2xw5vGbufKPrkFo9" target="_blank" rel="noopener noreferrer" className="w-full relative group/btn inline-flex items-center justify-center gap-3 px-6 py-4 bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37] text-white hover:text-black rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-500 overflow-hidden shadow-lg hover:shadow-[0_10px_20px_rgba(212,175,55,0.3)]">
            <span className="relative z-10 flex items-center gap-3">
              <Navigation className="w-4 h-4 transition-colors duration-500 group-hover/btn:text-black" />
              {isAr ? 'اعرف الطريق' : 'Get Directions'}
            </span>
          </a>
        </motion.div>
      </div>

    </section>
  );
}
