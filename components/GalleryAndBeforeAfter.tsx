'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../app/utils/LanguageContext';
import { translations } from '../app/utils/translations';
import { ChevronsLeftRight, ArrowRight, ArrowLeft } from 'lucide-react';

const beforeImage = "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1200"; 
const afterImage = "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=1200";  

const previewImages = [
  "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600"
];

export default function GalleryAndBeforeAfter() {
  const { language } = useLanguage();
  const t = translations[language];
  const isAr = language === 'ar';

  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  /**
   * Calculates and updates the slider position based on mouse/touch coordinates.
   * Ensures the position stays within 0% to 100% bounds.
   */
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate relative x coordinate inside the container
    const x = clientX - rect.left;
    // Convert to percentage and clamp between 0 and 100
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  // Global event listeners for smooth dragging outside the container bounds
  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      handleMove(e.clientX);
    };
    const handleTouchMoveGlobal = (e: TouchEvent) => {
      handleMove(e.touches[0].clientX);
    };
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMoveGlobal);
      window.addEventListener('mouseup', handleMouseUpGlobal);
      window.addEventListener('touchmove', handleTouchMoveGlobal);
      window.addEventListener('touchend', handleMouseUpGlobal);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('mouseup', handleMouseUpGlobal);
      window.removeEventListener('touchmove', handleTouchMoveGlobal);
      window.removeEventListener('touchend', handleMouseUpGlobal);
    };
  }, [isDragging, handleMove]);

  return (
    <section id="gallery" className="py-24 bg-transparent relative overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none transform-gpu will-change-transform" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-['var(--font-alexandria)'] font-bold text-[#D4AF37] mb-6"
          >
            {isAr ? 'تحولات قبل وبعد' : 'Before & After'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#FDFBF7]/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            {isAr ? 'شاهد الفرق الواضح قبل وبعد العناية بخدماتنا المتميزة.' : 'See the clear difference before and after our premium care.'}
          </motion.p>
        </div>

        {/* Before / After Slider */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative select-none group mb-24 transform-gpu will-change-transform cursor-ew-resize"
          ref={containerRef}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }}
        >
          <div className="relative aspect-[4/3] md:aspect-[21/9] cursor-ew-resize overflow-hidden rounded-3xl">
            {/* After Image (Background) */}
            <Image 
              src={afterImage} 
              alt="After Grooming" 
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />
            
            {/* Before Image (Foreground, clipped) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <Image 
                src={beforeImage} 
                alt="Before Grooming" 
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="absolute inset-0 w-full h-full object-cover filter grayscale-[10%]"
                draggable="false"
              />
            </div>

            {/* Slider Handle Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-ew-resize flex items-center justify-center transition-opacity transform-gpu will-change-transform"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              {/* Slider Handle Button */}
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl border border-white/30 text-white hover:scale-110 transition-transform active:scale-95 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black">
                <ChevronsLeftRight className="w-6 h-6" />
              </div>
            </div>

            {/* Labels */}
            <div className={`absolute top-6 ${isAr ? 'right-6' : 'left-6'} bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-white text-sm font-medium uppercase tracking-wider`}>
              {t.beforeLabel}
            </div>
            <div className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} bg-[#D4AF37]/90 backdrop-blur-md px-6 py-2 rounded-full border border-[#D4AF37]/50 text-black text-sm font-bold uppercase tracking-wider`}>
              {t.afterLabel}
            </div>
          </div>
        </motion.div>

        {/* View Full Transformations Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-16"
        >
          <Link href="/gallery?tab=transformations" className="group flex items-center gap-3 bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A0A0A] hover:border-[#D4AF37] focus-visible:outline-none transform-gpu will-change-transform">
            <span>{isAr ? 'شاهد كل التحولات' : 'View All Transformations'}</span>
            {isAr ? (
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
            ) : (
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            )}
          </Link>
        </motion.div>

        {/* Gallery Section */}
        <div className="text-center mb-12 relative z-10 pt-16 border-t border-white/5">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-['var(--font-alexandria)'] font-bold text-[#D4AF37] mb-6"
          >
            {isAr ? 'معرض الصور' : 'Photo Gallery'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#FDFBF7]/60 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            {isAr ? 'لقطات من داخل عيادتنا وبعض ضيوفنا السعداء.' : 'Snapshots from inside our clinic and some of our happy guests.'}
          </motion.p>
        </div>

        {/* Mini Gallery Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {previewImages.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 group shadow-lg transform-gpu will-change-transform"
            >
              <Image 
                src={src} 
                alt={`Preview gallery image ${idx + 1}`} 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] transform-gpu will-change-transform"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* View Full Gallery Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <Link href="/gallery" className="group flex items-center gap-3 bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A0A0A] hover:border-[#D4AF37] focus-visible:outline-none transform-gpu will-change-transform">
            <span>{t.viewFullGallery}</span>
            {isAr ? (
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
            ) : (
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            )}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
