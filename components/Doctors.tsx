'use client';

import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 12,
    },
  },
};

export default function Doctors() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const title = isAr ? 'الدكتور البيطري' : 'The Veterinarian';
  const subtitle = isAr 
    ? 'عشان صحة اليفك تهمنا, بنوفرله احسن رعاية طبية بأعلى مستوى.' 
    : 'The highest standards of care for your pet with distinguished medical expertise.';

  const doctors = [
    {
      id: 1,
      name: isAr ? 'د. عبدالفتاح الصباحي' : 'Dr. Abdelfattah El-Sabahy',
      specialty: isAr ? 'خريج طب بيطري جامعة المنصورة' : 'Graduated from Veterinary Medicine, Mansoura University',
      image: '/ta7a.png',
    }
  ];

  return (
    <section id="doctors" className="relative py-24 sm:py-32 overflow-hidden z-10" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Dynamic Background Glow for Doctors Section */}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none z-0" 
      />
      
      {/* Ambient Doctors Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`doc-particle-${i}`}
            className="absolute rounded-full bg-[#D4AF37] mix-blend-screen"
            style={{ 
              width: ((i % 2) + 1) + 'px', 
              height: ((i % 2) + 1) + 'px', 
              left: `${(i * 23) % 100}%`, 
              top: `${(i * 37) % 100}%` 
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 10 + (i % 5),
              repeat: Infinity,
              ease: "linear",
              delay: (i % 3)
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            <span className="w-8 h-[1px] bg-[#D4AF37]/50 hidden md:block" />
            {isAr ? 'أطبائنا' : 'Our Vets'}
            <span className="w-8 h-[1px] bg-[#D4AF37]/50 hidden md:block" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-['var(--font-alexandria)'] text-white mb-6 drop-shadow-xl">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Doctor Card Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex justify-center"
        >
          {doctors.map((doc) => (
            <motion.div
              key={doc.id}
              variants={cardVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              className="group relative w-full max-w-sm h-[450px] rounded-[2.5rem] overflow-hidden"
            >
              {/* Outer Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl z-0" />
              
              {/* Glass Card Container */}
              <div className="absolute inset-[2px] rounded-[2.5rem] overflow-hidden bg-[#0A0A0A]/40 backdrop-blur-xl border border-white/10 group-hover:border-[#D4AF37]/40 transition-colors duration-500 z-10 flex flex-col justify-end">
                
                {/* Doctor Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={doc.image} 
                    alt={doc.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out opacity-70 group-hover:opacity-100"
                  />
                  {/* Heavy bottom gradient so text is readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="relative z-20 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md group-hover:text-[#F3E5AB] transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-[#D4AF37] font-medium text-sm md:text-base mb-6 tracking-wide drop-shadow-md">
                      {doc.specialty}
                    </p>
                  </motion.div>
                  
                  {/* Social Links that slide up on hover */}
                  <div className="flex gap-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {/* Facebook */}
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-colors border border-white/20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    {/* Instagram */}
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-colors border border-white/20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    {/* WhatsApp */}
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-colors border border-white/20">
                      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path></svg>
                    </a>
                  </div>
                </div>

                {/* Decorative Accent Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
