'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';
import { 
  ShieldAlert, 
  Microscope, 
  Bone, 
  HeartPulse, 
  Dna, 
  Activity, 
  Stethoscope,
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  LucideIcon
} from 'lucide-react';

type SystemId = 'mouth' | 'heart' | 'coat' | 'stomach' | 'paws';

interface SystemConfig {
  id: SystemId;
  icon: LucideIcon;
  color: string;
  gridSpan: string;
}

const systems: SystemConfig[] = [
  { id: 'heart', icon: HeartPulse, color: 'from-[#D4AF37]/20 to-[#D4AF37]/5', gridSpan: 'md:col-span-8 md:row-span-2' },
  { id: 'coat', icon: Dna, color: 'from-[#F3E5AB]/20 to-[#F3E5AB]/5', gridSpan: 'md:col-span-4 md:row-span-1' },
  { id: 'mouth', icon: Bone, color: 'from-[#AA8000]/20 to-[#AA8000]/5', gridSpan: 'md:col-span-4 md:row-span-1' },
  { id: 'stomach', icon: Stethoscope, color: 'from-[#8B6914]/20 to-[#8B6914]/5', gridSpan: 'md:col-span-6 md:row-span-1' },
  { id: 'paws', icon: Activity, color: 'from-[#FFDF73]/20 to-[#FFDF73]/5', gridSpan: 'md:col-span-6 md:row-span-1' },
];

export default function InteractiveWellness() {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  
  const [selectedId, setSelectedId] = useState<SystemId | null>(null);

  // Stop body scroll when a modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedId]);

  return (
    <section className="relative py-32 w-full min-h-screen flex flex-col items-center justify-center bg-[#050505] overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Background Texture - Royal Edition */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 w-full flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] font-['var(--font-ibm)'] tracking-[0.2em] text-xs font-bold uppercase border border-[#D4AF37]/30 px-5 py-2 rounded-full bg-[#D4AF37]/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              {isAr ? 'بروتوكول الفحص المتقدم' : 'Advanced Diagnostic Protocol'}
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['var(--font-heading)'] text-white mb-6 drop-shadow-lg">
            {t.wellnessGuideTitle}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg font-light body-luxury">
            {t.wellnessGuideDesc}
          </p>
        </div>

        {/* Bento Box Grid - Royal Edition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 w-full max-w-5xl mx-auto auto-rows-[180px]">
          {systems.map((system) => {
            const data = t.hotspots[system.id];
            const Icon = system.icon;
            
            return (
              <motion.div
                key={system.id}
                layoutId={`card-${system.id}`}
                onClick={() => setSelectedId(system.id)}
                className={`relative group cursor-pointer overflow-hidden rounded-[2rem] border border-white/5 bg-[#111111]/80 backdrop-blur-md ${system.gridSpan} transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:-translate-y-1`}
              >
                {/* Royal Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${system.color} opacity-20 group-hover:opacity-40 transition-all duration-700`} />
                <div className="absolute inset-0 bg-[#0A0A0A]/40 backdrop-blur-[2px]" />
                
                {/* Content */}
                <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      <Icon className="w-7 h-7 text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className={`w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ${isAr ? 'translate-x-4 group-hover:translate-x-0' : '-translate-x-4 group-hover:translate-x-0'}`}>
                      {isAr ? (
                        <ChevronLeft className="w-5 h-5 text-[#D4AF37]" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <motion.h3 layoutId={`title-${system.id}`} className="text-2xl md:text-3xl font-bold font-['var(--font-heading)'] text-white mb-3 group-hover:text-[#FDFBF7] transition-colors">
                      {data.title}
                    </motion.h3>
                    <p className="text-white/50 text-sm md:text-base line-clamp-2 body-luxury group-hover:text-white/70 transition-colors">
                      {data.symptoms}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal Overlay - Royal Edition */}
      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-40 bg-[#050505]/90 backdrop-blur-lg"
            />
            
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none" dir={isAr ? 'rtl' : 'ltr'}>
              {systems.map((system) => {
                if (system.id !== selectedId) return null;
                
                const data = t.hotspots[system.id];
                const Icon = system.icon;
                
                return (
                  <motion.div
                    key={system.id}
                    layoutId={`card-${system.id}`}
                    className="relative w-full max-w-4xl bg-[#0A0A0A] rounded-[2.5rem] border border-[#D4AF37]/20 overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.1)]"
                  >
                    {/* Header Gradient */}
                    <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#D4AF37]/15 to-transparent" />
                    
                    <div className="relative z-10 flex flex-col p-8 md:p-12 overflow-y-auto no-scrollbar">
                      
                      {/* Close Button */}
                      <button 
                        onClick={() => setSelectedId(null)}
                        className={`absolute top-8 ${isAr ? 'left-8' : 'right-8'} w-12 h-12 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-300 z-20 group`}
                      >
                        <X className="w-6 h-6 text-white/70 group-hover:text-[#D4AF37] transition-colors" />
                      </button>

                      {/* Icon & Title */}
                      <div className="flex items-center gap-6 mb-12 mt-4">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(212,175,55,0.15)] backdrop-blur-md">
                          <Icon className="w-10 h-10 text-[#D4AF37]" />
                        </div>
                        <div>
                          <motion.h3 layoutId={`title-${system.id}`} className="text-4xl md:text-5xl font-bold font-['var(--font-heading)'] text-transparent bg-clip-text bg-gradient-to-r from-[#FDFBF7] to-[#D4AF37]">
                            {data.title}
                          </motion.h3>
                          <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full mt-4" />
                        </div>
                      </div>
                      
                      {/* Data Sections */}
                      <div className="flex flex-col gap-10">
                        
                        {/* Symptoms */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-start gap-5"
                        >
                          <div className="mt-1 w-12 h-12 rounded-2xl bg-[#111] flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                            <ShieldAlert className="w-5 h-5 text-[#D4AF37]/80" />
                          </div>
                          <div>
                            <h4 className="text-sm md:text-base text-white/40 font-bold mb-2 font-['var(--font-ibm)'] uppercase tracking-[0.15em]">
                              {isAr ? 'الأعراض الإكلينيكية' : 'Clinical Symptoms'}
                            </h4>
                            <p className="text-white/90 text-lg md:text-xl leading-relaxed body-luxury">{data.symptoms}</p>
                          </div>
                        </motion.div>

                        {/* Treatment */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-start gap-5"
                        >
                          <div className="mt-1 w-12 h-12 rounded-2xl bg-[#111] flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                            <Microscope className="w-5 h-5 text-[#D4AF37]/80" />
                          </div>
                          <div>
                            <h4 className="text-sm md:text-base text-white/40 font-bold mb-2 font-['var(--font-ibm)'] uppercase tracking-[0.15em]">
                              {isAr ? 'البروتوكول العلاجي' : 'Treatment Protocol'}
                            </h4>
                            <p className="text-white/90 text-lg md:text-xl leading-relaxed body-luxury">{data.treatment}</p>
                          </div>
                        </motion.div>

                        {/* Vet Tip */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-6"
                        >
                          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 rounded-3xl p-8 md:p-10 relative overflow-hidden group/tip">
                            {/* Animated Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent -translate-x-[150%] group-hover/tip:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                            
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/15 blur-[40px] pointer-events-none" />
                            
                            <div className="flex items-start gap-5 relative z-10">
                              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-1">
                                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                              </div>
                              <div>
                                <h4 className="text-base md:text-lg text-[#D4AF37] font-bold mb-3 font-['var(--font-ibm)']">
                                  {isAr ? 'توصية طبية حصرية' : 'Veterinary Recommendation'}
                                </h4>
                                <p className="text-white/95 text-lg md:text-2xl leading-relaxed body-luxury italic font-medium">&quot;{data.vetTip}&quot;</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}

