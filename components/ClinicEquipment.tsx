'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { useRef } from 'react';

interface EquipmentItem {
  id: string;
  title: string;
  desc: string;
  features: string[];
  image: string;
}

// Reusable 3D Card Component
function EquipmentCard({ item, index }: { item: EquipmentItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation angles (max 7.5 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full h-[600px] md:h-[700px] perspective-[2000px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full relative rounded-3xl overflow-hidden cursor-crosshair shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 group"
      >
        {/* Background Image */}
        <Image 
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index <= 1}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Glassmorphism Content Box at the bottom */}
        <div 
          style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
          className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 p-6 md:p-8 flex flex-col gap-4 rounded-3xl bg-[#020202]/40 backdrop-blur-2xl border border-white/10 pointer-events-none shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        >
          {/* Subtle Glow behind text */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none rounded-3xl" />
          
          <h3 style={{ transform: "translateZ(30px)" }} className="text-3xl md:text-4xl font-bold font-['var(--font-heading)'] text-white drop-shadow-2xl">
            {item.title}
          </h3>
          
          <p style={{ transform: "translateZ(20px)" }} className="text-white/90 text-base md:text-lg font-['var(--font-body)'] font-light leading-relaxed max-w-lg drop-shadow-md">
            {item.desc}
          </p>
          
          <div style={{ transform: "translateZ(40px)" }} className="flex flex-wrap gap-2 md:gap-3 mt-2">
            {item.features?.map((feature: string, fIndex: number) => (
              <div 
                key={fIndex}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg"
              >
                <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#F3E5AB]" />
                <span className="text-xs md:text-sm text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Floating Flare Effect on Hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" 
          style={{ transform: "translateZ(80px)" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ClinicEquipment() {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  const equipmentItems = t.equipmentItems || [];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" id="equipment" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Background Ambient Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,_#D4AF37_0%,_transparent_60%)] mix-blend-screen blur-[150px] opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <span className="text-[#D4AF37] font-['var(--font-ibm)'] tracking-[0.3em] text-sm md:text-base font-bold uppercase mb-4">
            {isAr ? 'تجهيزات العيادة' : 'Our Facilities'}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-['var(--font-cairo)'] text-white mb-6 tracking-tight drop-shadow-xl">
            {t.equipmentTitle || (isAr ? 'أحدث التقنيات الطبية' : 'Latest Medical Technologies')}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light font-['var(--font-body)'] leading-relaxed">
            {t.equipmentDesc || (isAr ? 'نستخدم أحدث الأجهزة لضمان التشخيص الدقيق والعلاج الآمن لأليفك' : 'We use state-of-the-art equipment to ensure accurate diagnosis and safe treatment for your pet')}
          </p>
        </motion.div>

        {/* 3D Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {equipmentItems.map((item: EquipmentItem, idx: number) => (
            <EquipmentCard key={item.id || idx} item={item} index={idx} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
