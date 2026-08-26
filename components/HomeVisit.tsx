'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';
import Image from 'next/image';
import { Phone, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

export default function HomeVisit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const yCard = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="homevisit" ref={containerRef} className="relative w-full py-32 md:py-48 overflow-hidden z-10 border-t border-white/5">
      {/* Background Image with Parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[140%] -top-[20%] z-0">
        <Image 
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2000"
          alt="Vet Home Visit"
          fill
          className="object-cover object-center filter grayscale-[30%] opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-20 h-full flex items-center">
        <div className={`flex flex-col lg:flex-row items-center justify-between w-full gap-16 ${isAr ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
          
          {/* Typography / Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
                </span>
                {isAr ? 'خدمة الزيارة المنزلية' : 'Home Visit Service'}
              </div>

              <h2 className="text-5xl md:text-7xl font-black font-['var(--font-alexandria)'] text-[#FDFBF7] leading-[1.1] mb-6 drop-shadow-2xl">
                {isAr ? 'دلوقتي العيادة بقت' : 'Royal Veterinary Care'} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">
                  {isAr ? 'بتجيلك لحد باب بيتك' : 'To Your Doorstep.'}
                </span>
              </h2>

              <p className="text-lg md:text-xl font-light font-['var(--font-ibm)'] text-[#FDFBF7]/70 leading-relaxed max-w-xl mb-12">
                {isAr 
                  ? 'لو اليفك بيخاف يخرج, فيه حشرات, شعره بيقع, ضوافره بتقطع هدومك, محتاج يحلق مفيش داعي تخرجه برا احنا هنجيلك لحد باب بيتك' 
                  : 'No need to stress your pet with travel. Our medical team, equipped with the latest mobile veterinary tech, is ready to reach you wherever you are, providing comprehensive care in your pet\'s comfort zone.'}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-4 mb-12">
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-colors hover:border-[#D4AF37]/30 hover:bg-white/10">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm font-medium text-white">{isAr ? 'متاح 24/7' : 'Available 24/7'}</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-colors hover:border-[#D4AF37]/30 hover:bg-white/10">
                  <span className="text-xl">🚑</span>
                  <span className="text-sm font-medium text-white">{isAr ? 'استجابة سريعة' : 'Rapid Response'}</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-colors hover:border-[#D4AF37]/30 hover:bg-white/10">
                  <span className="text-xl">🩺</span>
                  <span className="text-sm font-medium text-white">{isAr ? 'معدات متكاملة' : 'Fully Equipped'}</span>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Glassmorphic Booking Card */}
          <motion.div 
            style={{ y: yCard }}
            className="w-full lg:w-[45%] relative group"
          >
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/30 to-transparent blur-3xl rounded-[3rem] opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
            
            <div className="relative bg-[#0A0A0A]/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-14 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] hover:border-[#D4AF37]/40 transition-colors duration-500">
              {/* Noise Texture */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
              
              <div className="relative z-10 flex flex-col gap-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/50 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-shadow duration-500">
                  <Phone className="w-8 h-8 text-[#D4AF37]" />
                </div>
                
                <h3 className="text-3xl font-black font-['var(--font-alexandria)'] text-white drop-shadow-md">
                  {isAr ? 'احجز زيارتك دلوقتي' : 'Book a Home Visit Now'}
                </h3>
                
                <p className="text-[#FDFBF7]/60 text-sm md:text-base font-light">
                  {isAr ? 'سواء حالة طارئة أو كشف عادي، إحنا دايماً جنبك وموجودين عشان نساعدك في أي وقت.' : 'For emergencies or routine checkups, we are always near you.'}
                </p>

                <div className="my-6 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                <a 
                  href="tel:+1234567890" 
                  className="relative group/btn inline-flex items-center justify-center gap-4 px-8 py-5 bg-[#D4AF37] text-black rounded-full font-bold uppercase tracking-widest text-sm overflow-hidden hover:scale-105 hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isAr ? 'كلمنا فوراً' : 'Call Us Immediately'}
                    <span className="transition-transform duration-500 group-hover/btn:translate-x-1">
                      {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </span>
                  </span>
                  {/* Button Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                </a>


              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
