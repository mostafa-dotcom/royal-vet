'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';
import { CheckCircle2, ChevronRight, Cat, Dog, Bird, Heart, Phone, Gift, Stethoscope, Scissors, Home, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

type Step = 'intro' | 'phone' | 'pet_details' | 'extra_questions' | 'processing' | 'success';
type PetType = 'dog' | 'cat' | 'bird' | 'other' | '';

export default function AppCoupon() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  
  const [step, setStep] = useState<Step>('intro');
  const [phone, setPhone] = useState('');
  const [petType, setPetType] = useState<PetType>('');
  const [petName, setPetName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [serviceInterest, setServiceInterest] = useState('');

  // 3D Tilt Effect for Ticket
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const startProcessing = () => {
    setStep('processing');
    // Simulate API call and generation
    setTimeout(() => {
      // Generate random premium code
      const code = `ROYAL-${Math.random().toString(36).substring(2, 6).toUpperCase()}-26`;
      setCouponCode(code);
      setStep('success');
    }, 2000);
  };


  const slideVariants = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' }
  };

  return (
    <section id="appcoupon" className="py-24 md:py-32 relative bg-transparent overflow-hidden border-t border-white/[0.02]">
      {/* Background Cinematic Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#D4AF37]/5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="bg-gradient-to-br from-[#0c0c0c] via-[#050505] to-[#000000] rounded-[3rem] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-16 min-h-[550px] border border-white/[0.04] shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]">
            
            {/* Cinematic Premium Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-[#D4AF37]/2 to-transparent blur-[80px] pointer-events-none opacity-60 mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FDFBF7]/5 to-transparent blur-[80px] pointer-events-none opacity-50" />

            {/* Content Side */}
            <div className="w-full md:w-1/2 relative z-20 flex flex-col justify-center h-full">
              <AnimatePresence mode="wait">
                
                {/* STEP 0: INTRO */}
                {step === 'intro' && (
                  <motion.div
                    key="intro"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center md:text-start"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] mb-8 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                      <span className="text-xs md:text-sm font-bold tracking-widest uppercase">{isAr ? "تطبيق رويال ڤيت" : "Royal Vet App"}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-['var(--font-alexandria)'] font-black tracking-tighter mb-6 leading-[1.1] bg-gradient-to-b from-[#FDFBF7] via-[#FDFBF7] to-[#FDFBF7]/50 bg-clip-text text-transparent heading-glow">
                      {isAr ? (
                        <>احجز مكانك في <span className="text-[#D4AF37]">الابلكيشن</span></>
                      ) : (
                        <>Reserve Your Spot In The <span className="text-[#D4AF37]">App</span></>
                      )}
                    </h2>
                    <p className="text-lg text-[#FDFBF7]/60 font-light mb-10 max-w-md mx-auto md:mx-0 body-luxury">
                      {isAr 
                        ? "سجل دلوقتي عشان تكون من أول الناس اللي يوصلها الكود الذهبي. استخدمه أول ما نطلق التطبيق وخد كوينز وهدايا ترحيبية." 
                        : "Register now to be among the first to receive the Golden Code. Use it upon app launch to get welcome coins and rewards."}
                    </p>
                    <button 
                      onClick={() => setStep('phone')}
                      className="relative overflow-hidden group bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-[#0A0A0A] font-bold px-10 py-4 rounded-full uppercase tracking-widest text-sm transition-all duration-500 ease-out hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] focus-visible:outline-none flex items-center gap-3 mx-auto md:mx-0"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isAr ? "خد هديتك دلوقتي" : "Claim Your VIP Gift"}
                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out" />
                    </button>
                  </motion.div>
                )}

                {/* STEP 1: PHONE */}
                {step === 'phone' && (
                  <motion.div
                    key="phone"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md mx-auto md:mx-0"
                  >
                    <h3 className="text-3xl font-['var(--font-alexandria)'] font-bold tracking-tight text-[#FDFBF7] mb-4 heading-glow">
                      {isAr ? "رقم تليفونك إيه؟" : "What's your phone number?"}
                    </h3>
                    <p className="text-[#FDFBF7]/50 mb-8 text-sm body-luxury">
                      {isAr ? "هنبعتلك بس التحديثات المهمة، مفيش أي رسايل مزعجة." : "We'll only send important updates. No spam, ever."}
                    </p>
                    
                    <div className="relative mb-8 group">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-[#FDFBF7]/30 group-focus-within:text-[#D4AF37] transition-colors duration-300" />
                      </div>
                      <input 
                        type="tel" 
                        autoFocus
                        placeholder="+20 123 456 7890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && phone.length > 5 && setStep('pet_details')}
                        className="w-full bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-[1.5rem] pl-14 pr-6 py-5 text-xl text-[#FDFBF7] placeholder-[#FDFBF7]/20 focus:outline-none focus:border-[#D4AF37]/40 focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300 font-mono shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                    
                    <button 
                      onClick={() => setStep('pet_details')}
                      disabled={phone.length < 6}
                      className="w-full bg-[#FDFBF7] text-[#0A0A0A] font-bold px-8 py-4 rounded-xl uppercase tracking-widest text-sm transition-all duration-300 ease-out hover:bg-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isAr ? "اللي بعده" : "Next"}
                      <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: PET DETAILS */}
                {step === 'pet_details' && (
                  <motion.div
                    key="pet_details"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md mx-auto md:mx-0"
                  >
                    <h3 className="text-3xl font-['var(--font-alexandria)'] font-bold text-[#FDFBF7] mb-2 heading-glow">
                      {isAr ? "احكيلنا عن رفيقك الملكي" : "Tell us about your royal companion"}
                    </h3>
                    <p className="text-[#FDFBF7]/60 mb-6 text-sm body-luxury">
                      {isAr ? "ده هيساعدنا نجهز هدايا تفرحه وتناسبه بالظبط." : "This helps us tailor the rewards perfectly for them."}
                    </p>
                    
                    {/* Pet Type Selector */}
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {[
                        { id: 'cat', icon: Cat, label: isAr ? 'قط' : 'Cat' },
                        { id: 'dog', icon: Dog, label: isAr ? 'كلب' : 'Dog' },
                        { id: 'bird', icon: Bird, label: isAr ? 'طائر' : 'Bird' },
                        { id: 'other', icon: Heart, label: isAr ? 'آخر' : 'Other' }
                      ].map((type) => {
                        const Icon = type.icon;
                        const isSelected = petType === type.id;
                        return (
                          <button
                            key={type.id}
                            onClick={() => setPetType(type.id as PetType)}
                            className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-300 ease-out group ${
                              isSelected 
                                ? 'bg-gradient-to-b from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                                : 'bg-[#111111]/80 border-white/5 text-[#FDFBF7]/40 hover:bg-[#1a1a1a] hover:border-white/10 hover:text-[#FDFBF7] shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]'
                            }`}
                          >
                            <Icon className={`w-7 h-7 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} />
                            <span className="text-xs font-semibold tracking-wide uppercase">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="relative mb-8 group">
                      <input 
                        type="text" 
                        placeholder={isAr ? "اسم أليفك (اختياري)" : "Pet's Name (Optional)"}
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && petType && setStep('extra_questions')}
                        className="w-full bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-[1.5rem] px-6 py-5 text-lg text-[#FDFBF7] placeholder-[#FDFBF7]/20 focus:outline-none focus:border-[#D4AF37]/40 focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                    
                    <button 
                      onClick={() => setStep('extra_questions')}
                      disabled={!petType}
                      className="w-full bg-[#FDFBF7] text-[#0A0A0A] font-bold px-8 py-4 rounded-xl uppercase tracking-widest text-sm transition-all duration-300 ease-out hover:bg-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isAr ? "اللي بعده" : "Next"}
                      <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 3: EXTRA QUESTIONS */}
                {step === 'extra_questions' && (
                  <motion.div
                    key="extra_questions"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md mx-auto md:mx-0"
                  >
                    <h3 className="text-3xl font-['var(--font-alexandria)'] font-bold text-[#FDFBF7] mb-2 heading-glow">
                      {isAr ? "إيه أكتر خدمة بتدور عليها؟" : "What service do you need most?"}
                    </h3>
                    <p className="text-[#FDFBF7]/60 mb-6 text-sm body-luxury">
                      {isAr ? "عشان نوفرلك أفضل تجربة أول ما نفتح." : "To provide you the best experience upon launch."}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {[
                        { id: 'clinic', icon: Stethoscope, label: isAr ? 'كشف وعيادة' : 'Clinic' },
                        { id: 'grooming', icon: Scissors, label: isAr ? 'نظافة وعناية' : 'Grooming' },
                        { id: 'boarding', icon: Home, label: isAr ? 'استضافة' : 'Boarding' },
                        { id: 'store', icon: ShoppingBag, label: isAr ? 'منتجات وأكل' : 'Store' }
                      ].map((service) => {
                        const Icon = service.icon;
                        const isSelected = serviceInterest === service.id;
                        return (
                          <button
                            key={service.id}
                            onClick={() => setServiceInterest(service.id)}
                            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ease-out group ${
                              isSelected 
                                ? 'bg-gradient-to-b from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                                : 'bg-[#111111]/80 border-white/5 text-[#FDFBF7]/40 hover:bg-[#1a1a1a] hover:border-white/10 hover:text-[#FDFBF7] shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]'
                            }`}
                          >
                            <Icon className={`w-6 h-6 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} />
                            <span className="text-xs font-semibold tracking-wide uppercase">{service.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    
                    <button 
                      onClick={startProcessing}
                      disabled={!serviceInterest}
                      className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-[#0A0A0A] font-bold px-8 py-4 rounded-xl uppercase tracking-widest text-sm transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isAr ? "أكد واستلم هديتك" : "Confirm & Get Gift"}
                    </button>
                  </motion.div>
                )}

                {/* STEP 4: PROCESSING (Veterinary DNA Motif) */}
                {step === 'processing' && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col items-center justify-center py-12"
                  >
                    <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                      <motion.div 
                        className="absolute inset-0 rounded-full border border-[#D4AF37]/30"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div 
                        className="absolute inset-4 rounded-full border border-[#D4AF37]/60"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      />
                      <div className="w-3 h-3 bg-[#D4AF37] rounded-full shadow-[0_0_20px_rgba(212,175,55,1)]" />
                    </div>
                    <h3 className="text-[#D4AF37] font-['var(--font-ibm)'] tracking-[0.3em] uppercase text-sm animate-pulse">
                      {isAr ? "بنجهزلك الكود الملكي..." : "Encoding Royal Ticket..."}
                    </h3>
                  </motion.div>
                )}

                {/* STEP 4: SUCCESS */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    className="text-center md:text-start"
                  >
                    <div className="inline-flex items-center gap-3 mb-6 bg-[#111111] px-5 py-2 rounded-full border border-[#D4AF37]/30">
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-[#FDFBF7] font-medium text-sm">
                        {isAr ? "سجلناك بنجاح في قائمة كبار الزوار" : "Successfully added to the VIP list"}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-['var(--font-alexandria)'] font-bold text-[#FDFBF7] mb-4 heading-glow">
                      {isAr ? "تذكرتك الذهبية جاهزة" : "Your Golden Ticket is Ready"}
                    </h2>
                    <p className="text-[#FDFBF7]/60 mb-8 max-w-md mx-auto md:mx-0 body-luxury">
                      {isAr 
                        ? "خلي الكود ده معاك. استخدمه في التطبيق أول ما يشتغل عشان تاخد كوينز وهدايا حصرية لـ " 
                        : "Keep this code safe. Redeem it in the app upon launch for exclusive coins and rewards for "}
                      <span className="text-[#D4AF37] font-bold">{petName || (isAr ? 'أليفك' : 'your pet')}</span>.
                    </p>
                  </motion.div>
                )}
                
              </AnimatePresence>
            </div>

            {/* Visual Mobile Display Side */}
            <div className="w-full md:w-1/2 relative z-10 flex justify-center mt-8 md:mt-0" style={{ perspective: 1200 }}>
              <motion.div
                initial={{ opacity: 0, rotateY: 180, scale: 0.5, z: -500 }}
                whileInView={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 3, type: "spring", bounce: 0.2 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY }}
                className="relative cursor-crosshair group"
              >
                {/* Glowing Aura behind phone */}
                <motion.div 
                  className="absolute inset-0 bg-[#D4AF37] blur-[80px] rounded-full pointer-events-none" 
                  animate={{ opacity: step === 'success' ? 0.4 : 0.1, scale: step === 'success' ? 1.3 : 1 }}
                  transition={{ duration: 1 }}
                />
                
                {/* The Mobile Frame (iPhone style) */}
                <div className="relative w-[280px] md:w-[320px] aspect-[1/2.1] bg-[#0A0A0A] rounded-[3rem] border-[6px] border-[#1F1F1F] shadow-[0_30px_60px_rgba(0,0,0,0.9),inset_0_0_10px_rgba(0,0,0,1)] overflow-hidden flex flex-col z-10">
                  
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#000000] rounded-full z-50 flex items-center justify-between px-2 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                    <div className="w-2 h-2 rounded-full bg-[#111] border border-white/5" />
                    <div className="w-2 h-2 rounded-full bg-[#1A1A1A] border border-white/5 relative">
                      <div className="absolute inset-0.5 rounded-full bg-[#050505]" />
                    </div>
                  </div>

                  {/* Digital Display Content - Realistic In-App Vibe */}
                  <div className="flex-1 bg-[#0A0A0A] flex flex-col relative overflow-hidden">
                    
                    {/* Fake App Background (Out of Focus) */}
                    <div className={`absolute inset-0 transition-all duration-1000 ${step === 'success' ? 'blur-[12px] opacity-30 scale-105' : 'blur-[4px] opacity-10'}`}>
                       {/* Header */}
                       <div className="flex justify-between items-center p-6 border-b border-white/5">
                         <div className="flex gap-3 items-center">
                            <div className="w-10 h-10 rounded-full bg-white/10" />
                            <div className="space-y-2">
                               <div className="w-16 h-2 bg-white/20 rounded-full" />
                               <div className="w-24 h-2 bg-white/10 rounded-full" />
                            </div>
                         </div>
                         <div className="w-8 h-8 rounded-full bg-white/5" />
                       </div>
                       
                       {/* Content Blocks */}
                       <div className="p-6 space-y-4">
                         <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/10" />
                         <div className="flex gap-4">
                           <div className="w-1/2 h-24 rounded-2xl bg-white/5" />
                           <div className="w-1/2 h-24 rounded-2xl bg-white/5" />
                         </div>
                         <div className="w-full h-40 rounded-2xl bg-white/5" />
                       </div>
                    </div>

                    {/* Dark Overlay for Modal */}
                    <div className={`absolute inset-0 bg-black/40 transition-opacity duration-1000 ${step === 'success' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-5 w-full">
                       
                       {step === 'intro' ? (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full flex flex-col items-center justify-center relative z-10"
                          >
                             {/* Smooth Moving Ambient Light */}
                             <motion.div 
                               animate={{ 
                                 x: [-40, 40, -40],
                                 y: [-20, 30, -20],
                                 scale: [1, 1.3, 1],
                                 opacity: [0.2, 0.5, 0.2] 
                               }}
                               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                               className="absolute top-[10%] left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-[#D4AF37]/30 to-transparent blur-[50px] rounded-full pointer-events-none z-0"
                             />

                             {/* Extremely Fluid Floating Logo in a Chic Frame */}
                             <motion.div 
                               animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                               className="relative mb-8 z-10"
                             >
                                <motion.div 
                                  animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                  className="absolute -inset-10 bg-[#D4AF37]/15 blur-[40px] rounded-[2.5rem] pointer-events-none" 
                                />
                                
                                {/* Chic App Icon Frame */}
                                <div className="w-36 h-36 rounded-[2rem] bg-gradient-to-br from-white/5 to-[#0A0A0A]/40 border-[1px] border-white/10 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(255,255,255,0.05)] backdrop-blur-2xl relative flex items-center justify-center overflow-hidden">
                                   
                                   {/* Inner subtle glow */}
                                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/20 to-transparent opacity-80" />
                                   
                                   {/* Frame Border Highlight */}
                                   <div className="absolute inset-0 rounded-[2rem] border border-[#D4AF37]/10" />
                                   
                                   <div className="w-32 h-32 relative z-10 flex items-center justify-center">
                                      <Image src="/logo.png" alt="Royal Vet App" width={128} height={128} className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]" />
                                   </div>
                                </div>
                             </motion.div>
                             
                             <motion.div
                               animate={{ opacity: [0.7, 1, 0.7] }}
                               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                               className="text-center mb-10"
                             >
                               <h4 className="text-2xl font-bold text-white mb-2 tracking-wide font-['var(--font-alexandria)'] drop-shadow-md">
                                 {isAr ? "تطبيق رويال ڤيت" : "Royal Vet App"}
                               </h4>
                               <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-mono">
                                 {isAr ? "قريباً على هاتفك" : "Coming to your phone"}
                               </p>
                             </motion.div>
                             
                             {/* Floating Notification */}
                             <motion.div 
                               initial={{ opacity: 0, y: 20 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.5 }}
                               className="w-full"
                             >
                               <motion.div 
                                 whileHover={{ scale: 1.02, y: -2 }}
                                 className="w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 flex items-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden group cursor-pointer"
                               >
                                  {/* Sweep animation inside notification */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                                  
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C7324] p-[1px] shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                                     <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center">
                                        <Gift className="w-4 h-4 text-[#D4AF37]" />
                                     </div>
                                  </div>
                                  <div className="flex-1 text-left relative z-10">
                                     <p className="text-white text-[12px] font-bold mb-1 tracking-wide">{isAr ? "هدية حصرية في انتظارك" : "Exclusive Gift Waiting"}</p>
                                     <p className="text-white/60 text-[9px] leading-relaxed">{isAr ? "سجل الآن لفتح مكافأتك واستلام كود الـ VIP." : "Register now to unlock your reward and receive VIP code."}</p>
                                  </div>
                               </motion.div>
                             </motion.div>
                          </motion.div>
                       ) : step === 'success' ? (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: 'spring', bounce: 0.4, duration: 1 }}
                            className="w-full"
                          >
                            {/* Premium Glass Modal */}
                            <div className="w-full rounded-[2rem] bg-[#111111]/80 border border-white/10 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] p-6 text-center relative overflow-hidden flex flex-col items-center">
                               
                               {/* Modal Ambient Glow */}
                               <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#D4AF37]/20 blur-[40px] rounded-full pointer-events-none" />
                               
                               {/* Modal Icon (Gift) */}
                               <div className="relative mb-5 mt-2">
                                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C7324] p-[1px] shadow-[0_10px_30px_rgba(212,175,55,0.4)]">
                                     <div className="w-full h-full bg-gradient-to-b from-[#1a1a1a] to-[#0A0A0A] rounded-full flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 to-transparent opacity-50" />
                                        <Gift className="w-7 h-7 text-[#FDFBF7] relative z-10 drop-shadow-md" />
                                     </div>
                                  </div>
                                  <motion.div 
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-2 rounded-full border border-[#D4AF37]/30 pointer-events-none" 
                                  />
                               </div>

                               <h4 className="text-xl font-bold text-white mb-2 tracking-wide font-['var(--font-alexandria)']">{isAr ? "هدية إطلاق التطبيق" : "App Launch Gift"}</h4>
                               <p className="text-[11px] text-white/50 mb-8 leading-relaxed px-2">
                                 {isAr ? "استخدم هذا الكود عند توفر التطبيق للحصول على رصيد مجاني فوري." : "Use this code when the app launches to claim your free balance."}
                               </p>

                               {/* The Code Input Look */}
                               <div className="w-full relative group cursor-text">
                                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37]/30 via-white/10 to-[#D4AF37]/30 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500" />
                                  <div className="relative w-full bg-black/90 rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 shadow-inner">
                                     <p className="text-[8px] text-[#D4AF37] uppercase tracking-widest mb-1">{isAr ? "كود التفعيل الخاص بك" : "Your Activation Code"}</p>
                                     <p className="text-2xl font-mono font-bold text-white tracking-[0.15em] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{couponCode}</p>
                                  </div>
                               </div>

                            </div>
                          </motion.div>
                       ) : (
                          <div className="w-full flex flex-col items-center justify-center h-48 relative z-10">
                             {/* Teaser Loading Animation */}
                             <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                               {/* Outer rings */}
                               <motion.div 
                                 animate={{ rotate: 360 }}
                                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                 className="absolute inset-0 rounded-full border border-white/10 border-t-[#D4AF37]/60 border-r-[#D4AF37]/20"
                               />
                               <motion.div 
                                 animate={{ rotate: -360 }}
                                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                 className="absolute inset-2 rounded-full border border-white/5 border-b-[#D4AF37]"
                               />
                               {/* Center pulsing core */}
                               <motion.div 
                                 animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 1, 0.2] }}
                                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                 className="absolute inset-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C7324] shadow-[0_0_30px_rgba(212,175,55,0.6)] blur-[2px]"
                               />
                               {/* Icon inside */}
                               <Gift className="w-6 h-6 text-[#FDFBF7] absolute z-10 drop-shadow-md" />
                             </div>
                             
                             {/* Teaser Text */}
                             <div className="text-center space-y-2">
                                <motion.p 
                                  animate={{ opacity: [0.4, 1, 0.4] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                  className="text-white font-bold tracking-widest text-sm font-['var(--font-alexandria)'] drop-shadow-md"
                                >
                                  {isAr ? "جاري تجهيز هديتك..." : "PREPARING GIFT..."}
                                </motion.p>
                                <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-mono">
                                  {isAr ? "يتم تأمين الكود الخاص بك" : "Securing your unique code"}
                                </p>
                             </div>
                          </div>
                       )}

                    </div>
                  </div>

                  {/* Holographic Screen Glare on Hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.15)] to-transparent pointer-events-none z-50 mix-blend-overlay" 
                    style={{
                      x: useTransform(mouseX, [-300, 300], ['-100%', '100%']),
                      y: useTransform(mouseY, [-300, 300], ['-100%', '100%']),
                    }}
                  />
                  
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
