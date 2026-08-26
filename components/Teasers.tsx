'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useAnimationFrame, MotionValue, useTransform } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';
import { 
  BrainCircuit, Activity, Heart, Globe, Smartphone, 
  Syringe, GraduationCap, Users, ShoppingBag, Coins, Crown, Zap, 
  FileText, Medal, Rocket, Clock, Apple, Fingerprint, 
  Star, Target
} from 'lucide-react';

// --- DATA: 20 Future Features ---
const featuresData = [
  { id: 1, title: 'Online Booking', titleAr: 'الحجز أونلاين', desc: 'Seamlessly book your visits anytime.', descAr: 'احجز زيارتك بسهولة في أي وقت.', status: 'Launching', statusAr: 'بيجهز', percentage: 99, icon: <Clock className="w-5 h-5 text-[#D4AF37]" />, preview: 'app' },
  { id: 2, title: 'Home Visit', titleAr: 'الكشف المنزلي', desc: 'Royal care at your doorstep.', descAr: 'الرعاية الملكية لحد باب بيتك.', status: 'Launching', statusAr: 'بيجهز', percentage: 99, icon: <Heart className="w-5 h-5 text-[#D4AF37]" />, preview: 'app' },
  { id: 20, title: 'VIP Membership', titleAr: 'عضوية كبار الزوار', desc: 'Exclusive perks and zero waiting.', descAr: 'مزايا حصرية ومن غير انتظار.', status: 'Launching', statusAr: 'بيجهز', percentage: 95, icon: <Star className="w-5 h-5 text-[#D4AF37]" />, preview: 'app' },
  
  { id: 3, title: 'Pet Profiles', titleAr: 'بروفايل أليفك', desc: 'A unified identity for your pet.', descAr: 'هوية موحدة ومخصصة لأليفك.', status: 'Testing', statusAr: 'بنجربه', percentage: 85, icon: <Fingerprint className="w-5 h-5 text-[#D4AF37]" />, preview: 'app' },
  { id: 4, title: 'Digital Passport', titleAr: 'الباسبور الرقمي', desc: 'Travel globally with ease.', descAr: 'سافر بيه أي حتة بسهولة.', status: 'Testing', statusAr: 'بنجربه', percentage: 80, icon: <Globe className="w-5 h-5 text-[#D4AF37]" />, preview: 'passport' },
  { id: 5, title: 'Medical Records', titleAr: 'السجلات الطبية', desc: 'Your pet\'s full history, secured.', descAr: 'تاريخه الطبي كله في أمان.', status: 'Testing', statusAr: 'بنجربه', percentage: 80, icon: <FileText className="w-5 h-5 text-[#D4AF37]" />, preview: 'app' },
  { id: 17, title: 'Community', titleAr: 'مجتمعنا', desc: 'Connect with other pet lovers.', descAr: 'اتعرف على ناس بتحب الحيوانات زيك.', status: 'Testing', statusAr: 'بنجربه', percentage: 75, icon: <Users className="w-5 h-5 text-[#D4AF37]" />, preview: 'community' },
  
  { id: 6, title: 'Mobile App', titleAr: 'الأبلكيشن', desc: 'Royal Vet in your pocket.', descAr: 'رويال ڤيت معاك في جيبك.', status: 'Building', statusAr: 'شغالين عليه', percentage: 60, icon: <Smartphone className="w-5 h-5 text-[#D4AF37]" />, preview: 'app' },
  { id: 7, title: 'AI Assistant', titleAr: 'المساعد الذكي', desc: '24/7 instant veterinary support.', descAr: 'دعم بيطري فوري طول اليوم.', status: 'Building', statusAr: 'شغالين عليه', percentage: 55, icon: <Zap className="w-5 h-5 text-[#D4AF37]" />, preview: 'ai' },
  { id: 10, title: 'Vaccine Reminder', titleAr: 'فكرني بالتطعيم', desc: 'Never miss a shot again.', descAr: 'مش هتنسى أي تطعيم بعد كده.', status: 'Building', statusAr: 'شغالين عليه', percentage: 65, icon: <Syringe className="w-5 h-5 text-[#D4AF37]" />, preview: 'app' },
  { id: 16, title: 'Health Score', titleAr: 'مؤشر الصحة', desc: 'A live measure of vitality.', descAr: 'مقياس حيوي لصحة أليفك.', status: 'Building', statusAr: 'شغالين عليه', percentage: 50, icon: <Activity className="w-5 h-5 text-[#D4AF37]" />, preview: 'app' },
  
  { id: 8, title: 'AI Doctor', titleAr: 'دكتور الذكاء الاصطناعي', desc: 'Advanced diagnostics by AI.', descAr: 'تشخيص دقيق بالذكاء الاصطناعي.', status: 'Research', statusAr: 'تحت الدراسة', percentage: 30, icon: <BrainCircuit className="w-5 h-5 text-[#D4AF37]" />, preview: 'ai' },
  { id: 9, title: 'AI Nutrition', titleAr: 'أكله الصحي', desc: 'Customized diet plans.', descAr: 'أنظمة أكل مخصوصة عشانه.', status: 'Research', statusAr: 'تحت الدراسة', percentage: 35, icon: <Apple className="w-5 h-5 text-[#D4AF37]" />, preview: 'ai' },
  { id: 15, title: 'Challenges', titleAr: 'التحديات', desc: 'Compete with the Royal Community.', descAr: 'نافس مجتمع رويال.', status: 'Research', statusAr: 'تحت الدراسة', percentage: 25, icon: <Rocket className="w-5 h-5 text-[#D4AF37]" />, preview: 'gamification' },
  { id: 18, title: 'Academy', titleAr: 'الأكاديمية', desc: 'Learn how to care like a pro.', descAr: 'اتعلم إزاي تاخد بالك منه زي المحترفين.', status: 'Research', statusAr: 'تحت الدراسة', percentage: 20, icon: <GraduationCap className="w-5 h-5 text-[#D4AF37]" />, preview: 'academy' },
  
  { id: 11, title: 'Royal Coins', titleAr: 'كوينز رويال', desc: 'Earn points for every visit.', descAr: 'جمع نقط مع كل زيارة.', status: 'Concept', statusAr: 'مجرد فكرة', percentage: 10, icon: <Coins className="w-5 h-5 text-[#D4AF37]" />, preview: 'gamification' },
  { id: 12, title: 'Levels', titleAr: 'المستويات', desc: 'Level up your pet\'s status.', descAr: 'علي مستوى أليفك.', status: 'Concept', statusAr: 'مجرد فكرة', percentage: 10, icon: <Crown className="w-5 h-5 text-[#D4AF37]" />, preview: 'gamification' },
  { id: 13, title: 'Badges', titleAr: 'الشارات', desc: 'Unlock exclusive achievements.', descAr: 'افتح إنجازات حصرية.', status: 'Concept', statusAr: 'مجرد فكرة', percentage: 5, icon: <Medal className="w-5 h-5 text-[#D4AF37]" />, preview: 'gamification' },
  { id: 14, title: 'Missions', titleAr: 'المهام', desc: 'Complete health tasks for rewards.', descAr: 'خلص المهام الصحية وخد مكافآت.', status: 'Concept', statusAr: 'مجرد فكرة', percentage: 5, icon: <Target className="w-5 h-5 text-[#D4AF37]" />, preview: 'gamification' },
  { id: 19, title: 'Marketplace', titleAr: 'المتجر', desc: 'Premium products delivered.', descAr: 'منتجات فاخرة هتوصلك لحد باب البيت.', status: 'Concept', statusAr: 'مجرد فكرة', percentage: 5, icon: <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />, preview: 'marketplace' },
];

// --- ORBITAL MATH ---
const categorized = {
  inner: featuresData.filter(f => f.status === 'Launching'),
  middle: featuresData.filter(f => f.status === 'Testing' || f.status === 'Building'),
  outer: featuresData.filter(f => f.status === 'Research' || f.status === 'Concept')
};

const mapOrbit = (arr: typeof featuresData, radius: number, speedMultiplier: number) => {
  return arr.map((f, i) => ({
    ...f,
    baseAngle: (i / arr.length) * Math.PI * 2,
    orbitRadius: radius,
    speedMultiplier
  }));
};

const mappedFeatures = [
  ...mapOrbit(categorized.inner, 160, 1),      // Inner, Fast Clockwise
  ...mapOrbit(categorized.middle, 280, -0.6),  // Middle, Medium Counter-Clockwise
  ...mapOrbit(categorized.outer, 400, 0.3)     // Outer, Slow Clockwise
];

// Helper for status colors
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Concept': return '#888888';
    case 'Research': return '#4A90E2';
    case 'Building': return '#E67E22';
    case 'Testing': return '#9B59B6';
    case 'Launching': return '#2ECC71';
    default: return '#D4AF37';
  }
};

// --- PREVIEW COMPONENTS (Abstract UIs) ---
const AbstractPreview = ({ type }: { type: string }) => {
  if (type === 'app') {
    return (
      <div className="w-full h-40 bg-white/5 rounded-2xl border border-white/10 p-4 flex flex-col gap-3 overflow-hidden">
        <div className="flex gap-2 items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20" />
          <div className="h-2 w-16 bg-white/20 rounded-full" />
        </div>
        <div className="w-full h-16 rounded-xl bg-gradient-to-r from-white/5 to-[#D4AF37]/10" />
        <div className="flex gap-2">
          <div className="w-1/2 h-10 rounded-xl bg-white/5" />
          <div className="w-1/2 h-10 rounded-xl bg-white/5" />
        </div>
      </div>
    );
  }
  if (type === 'ai') {
    return (
      <div className="w-full h-40 bg-black/40 rounded-2xl border border-[#4A90E2]/30 p-4 flex flex-col gap-3 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#4A90E2]/20 blur-[20px] rounded-full" />
        <div className="self-end w-2/3 h-6 rounded-xl bg-white/10 rounded-tr-sm" />
        <div className="self-start w-3/4 h-12 rounded-xl bg-[#4A90E2]/20 border border-[#4A90E2]/30 rounded-tl-sm backdrop-blur-md" />
        <div className="mt-auto w-full h-8 rounded-xl bg-white/5 border border-white/10 flex items-center px-3">
          <div className="w-2 h-2 rounded-full bg-[#4A90E2] animate-pulse" />
        </div>
      </div>
    );
  }
  if (type === 'gamification') {
    return (
      <div className="w-full h-40 bg-gradient-to-b from-[#D4AF37]/5 to-[#B8860B]/20 rounded-2xl border border-[#D4AF37]/30 p-4 flex flex-col items-center justify-center gap-4 overflow-hidden relative">
        <Crown className="w-12 h-12 text-[#D4AF37] opacity-80" />
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-[#D4AF37]" />
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/5" />
          <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/20 shadow-[0_0_10px_#D4AF37]" />
          <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/5" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-40 bg-white/5 rounded-2xl border border-white/10 p-4 flex items-center justify-center">
      <div className="animate-pulse flex gap-2">
        <div className="w-2 h-2 bg-white/30 rounded-full" />
        <div className="w-2 h-2 bg-white/30 rounded-full" />
        <div className="w-2 h-2 bg-white/30 rounded-full" />
      </div>
    </div>
  );
};

// --- THE NODE COMPONENT ---
interface FeatureNodeProps {
  data: typeof mappedFeatures[0];
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  globalTime: MotionValue<number>;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
  clickedId: number | null;
  setClickedId: (id: number | null) => void;
  isAr: boolean;
}

const FeatureNode = ({ data, mouseX, mouseY, globalTime, hoveredId, setHoveredId, clickedId, setClickedId, isAr }: FeatureNodeProps) => {
  const isHovered = hoveredId === data.id;
  const isClicked = clickedId === data.id;
  const hasFocus = hoveredId !== null || clickedId !== null;
  const isBlurry = hasFocus && hoveredId !== data.id && clickedId !== data.id;

  // Physics motion values
  const nodeX = useMotionValue(0);
  const nodeY = useMotionValue(0);

  // Smooth springs for Apple-tier physics
  const springConfig = { damping: 25, stiffness: 150, mass: 1 };
  const smoothX = useSpring(nodeX, springConfig);
  const smoothY = useSpring(nodeY, springConfig);

  // Orbital + Magnet Physics Logic (Runs every frame)
  useAnimationFrame(() => {
    if (isClicked) return; // If clicked, layout animation takes over

    // Calculate current orbital position
    const t = globalTime.get();
    const currentAngle = data.baseAngle + (t * data.speedMultiplier);
    const targetX = Math.cos(currentAngle) * data.orbitRadius;
    const targetY = Math.sin(currentAngle) * data.orbitRadius;

    if (isHovered) {
      // Small pull towards mouse, but stay near orbit
      const mx = mouseX.get();
      const my = mouseY.get();
      nodeX.set(targetX + (mx - targetX) * 0.1);
      nodeY.set(targetY + (my - targetY) * 0.1);
      return;
    }

    // Apply magnet effect if near mouse, else follow orbit
    const mx = mouseX.get();
    const my = mouseY.get();
    const dx = mx - targetX;
    const dy = my - targetY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const magnetRadius = 150;
    
    if (distance < magnetRadius && !hasFocus) {
      const pullForce = (magnetRadius - distance) / magnetRadius; 
      nodeX.set(targetX + dx * pullForce * 0.4); 
      nodeY.set(targetY + dy * pullForce * 0.4);
    } else {
      nodeX.set(targetX);
      nodeY.set(targetY);
    }
  });

  // Calculate actual rendered coordinates for the SVG line dynamically
  const lineCoordsX = useTransform(globalTime, (t) => Math.cos(data.baseAngle + (t * data.speedMultiplier)) * data.orbitRadius);
  const lineCoordsY = useTransform(globalTime, (t) => Math.sin(data.baseAngle + (t * data.speedMultiplier)) * data.orbitRadius);
  const lineWidth = useTransform([lineCoordsX, lineCoordsY], ([x, y]: number[]) => Math.sqrt(x*x + y*y));
  const lineRotate = useTransform([lineCoordsX, lineCoordsY], ([x, y]: number[]) => `${Math.atan2(y, x)}rad`);

  return (
    <>
      {/* Dynamic Golden Connecting Line when hovered */}
      <AnimatePresence>
        {isHovered && !isClicked && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 pointer-events-none z-10 origin-left"
            style={{ width: lineWidth, rotate: lineRotate }}
          >
            <motion.div 
              initial={{ scaleX: 0 }} 
              animate={{ scaleX: 1 }} 
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-px bg-gradient-to-r from-[#D4AF37]/80 to-transparent origin-left shadow-[0_0_10px_#D4AF37]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layoutId={`node-${data.id}`}
        onMouseEnter={() => setHoveredId(data.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => {
          setClickedId(isClicked ? null : data.id);
          setHoveredId(null);
        }}
        style={{
          x: smoothX,
          y: smoothY,
          zIndex: isHovered || isClicked ? 50 : 20,
        }}
        animate={{
          scale: isHovered && !isClicked ? 1.1 : 1,
          opacity: isBlurry ? 0.1 : 1,
          filter: isBlurry ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${isClicked ? 'pointer-events-none' : 'pointer-events-auto'}`}
      >
        {/* State 1: Just the golden dot */}
        <AnimatePresence mode="wait">
          {!isHovered && !isClicked && (
            <motion.div
              key="dot"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
              className="w-3 h-3 rounded-full shadow-[0_0_15px_currentColor]"
              style={{ backgroundColor: getStatusColor(data.status), color: getStatusColor(data.status) }}
            />
          )}

          {/* State 2: Hovered (Minimal Glass Card) */}
          {isHovered && !isClicked && (
            <motion.div
              key="hover-card"
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
              className="bg-[#0A0A0A]/60 backdrop-blur-3xl rounded-2xl p-4 shadow-[0_30px_50px_rgba(0,0,0,0.8)] border border-white/5 flex items-center gap-4 w-64 transform-gpu"
              style={{ boxShadow: `0 0 40px ${getStatusColor(data.status)}40` }}
              dir={isAr ? 'rtl' : 'ltr'}
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                {data.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm truncate">{isAr ? data.titleAr : data.title}</span>
                <span style={{ color: getStatusColor(data.status) }} className="text-xs mt-1 font-mono tracking-wider truncate">{isAr ? data.statusAr : data.status}</span>
              </div>
            </motion.div>
          )}

          {/* State 3: Clicked (Expanded Glass Modal) */}
          {isClicked && (
            <motion.div
              key="clicked-card"
              layoutId={`node-${data.id}`}
              className="fixed inset-0 m-auto w-[90vw] max-w-sm h-max bg-[#0A0A0A]/70 backdrop-blur-3xl rounded-[2rem] p-6 shadow-[0_40px_100px_rgba(0,0,0,1)] border border-white/10 z-[100] transform-gpu pointer-events-auto"
              style={{ boxShadow: `0 0 80px ${getStatusColor(data.status)}20` }}
              dir={isAr ? 'rtl' : 'ltr'}
            >
              {/* Close Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); setClickedId(null); }}
                className="absolute top-4 right-4 w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors border border-white/10"
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                  {data.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 font-['var(--font-alexandria)']">{isAr ? data.titleAr : data.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: getStatusColor(data.status), color: getStatusColor(data.status) }} />
                    <span className="text-white/60 text-xs font-mono tracking-wider">{isAr ? data.statusAr : data.status}</span>
                  </div>
                </div>
              </div>

              <p className="text-white/80 text-sm leading-relaxed font-light mb-6">
                {isAr ? data.descAr : data.desc}
              </p>

              {/* Progress Bar inside Card */}
              <div className="mb-6">
                <div className="flex justify-between text-[10px] text-white/40 font-mono mb-2 uppercase">
                  <span>{isAr ? 'نسبة الجاهزية' : 'Readiness'}</span>
                  <span style={{ color: getStatusColor(data.status) }}>{data.percentage}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${data.percentage}%` }} 
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full shadow-[0_0_10px_currentColor]"
                    style={{ backgroundColor: getStatusColor(data.status), color: getStatusColor(data.status) }}
                  />
                </div>
              </div>

              {/* The Abstract UI Preview */}
              <div className="w-full relative">
                <div className="absolute -inset-2 bg-gradient-to-b from-white/5 to-transparent rounded-2xl blur-md -z-10" />
                <AbstractPreview type={data.preview} />
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop for click state */}
      <AnimatePresence>
        {isClicked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setClickedId(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default function Teasers() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  
  // Hydration Fix: Only render interactive WebGL/Physics on client
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const globalTime = useMotionValue(0);

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [clickedId, setClickedId] = useState<number | null>(null);

  // The Master Clock for Orbital Rotation
  useAnimationFrame((t, delta) => {
    // Pause rotation when focusing on a node
    if (hoveredId === null && clickedId === null) {
      globalTime.set(globalTime.get() + delta * 0.0002); // Adjust speed here
    }
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const cx = innerWidth / 2;
    const cy = innerHeight / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  };

  // Find currently hovered data for dynamic core text
  const activeData = hoveredId ? mappedFeatures.find(f => f.id === hoveredId) : null;

  if (!isMounted) {
    return <section className="min-h-screen bg-[#030303]" />;
  }

  return (
    <section 
      id="future" 
      className="relative min-h-[120vh] md:min-h-[150vh] w-full bg-[#030303] overflow-hidden flex flex-col items-center justify-center border-y border-white/5"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* Deep Space Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-[#030303] to-[#030303] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Header (Top) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-24 left-0 right-0 z-50 flex flex-col items-center text-center pointer-events-none"
      >
        <div className="inline-block px-6 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 text-[#D4AF37] backdrop-blur-md">
          {isAr ? "عالم رويال ڤيت" : "Royal Ecosystem"}
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-light text-[#FDFBF7] tracking-wider heading-glow font-['var(--font-alexandria)']">
          {isAr ? "اكتشف المستقبل" : "Discover The Future"}
        </h2>
        <p className="mt-4 text-[#FDFBF7]/50 font-light max-w-lg mx-auto text-sm md:text-base body-luxury">
          {isAr ? "حرك الماوس عشان تكتشف العالم، ودوس على أي نقطة عشان تعرف التفاصيل." : "Move your mouse to explore the intelligent core, and click any node to reveal details."}
        </p>
      </motion.div>

      {/* --- THE ROYAL CORE (Center) --- */}
      <div className="relative w-full h-screen flex items-center justify-center">
        
        {/* Core Glowing Orb */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full blur-[80px] pointer-events-none z-10"
          style={{ backgroundColor: activeData ? getStatusColor(activeData.status) : '#D4AF37' }}
        />

        {/* Core Physical Ring & Dynamic Data */}
        <motion.div 
          animate={{ rotateZ: 360 }}
          transition={{ rotateZ: { duration: 40, repeat: Infinity, ease: "linear" } }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-48 md:h-48 rounded-full border border-white/10 bg-[#0A0A0A]/40 backdrop-blur-xl shadow-[inset_0_0_40px_rgba(255,255,255,0.05)] pointer-events-none z-20 flex items-center justify-center overflow-hidden"
        >
          {/* Orbital dashed tracks inside core */}
          <div className="absolute inset-2 border border-white/10 rounded-full border-dashed opacity-30" />
        </motion.div>

        {/* Counter-rotating Text container (keeps text upright) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {activeData ? (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <span style={{ color: getStatusColor(activeData.status) }} className="text-3xl font-light font-mono drop-shadow-md">
                  {activeData.percentage}%
                </span>
                <span className="text-white/60 text-xs uppercase tracking-widest mt-1 max-w-[100px] truncate">
                  {isAr ? activeData.titleAr : activeData.title}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <Heart className="w-8 h-8 text-[#D4AF37] opacity-80 mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                <span className="text-[#D4AF37]/50 text-[10px] uppercase tracking-[0.3em]">Core</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- ORBITAL TRACK RINGS (Visual Guides) --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />

        {/* --- THE NODES (Features) --- */}
        {mappedFeatures.map((feature) => (
          <FeatureNode 
            key={feature.id} 
            data={feature} 
            mouseX={mouseX} 
            mouseY={mouseY}
            globalTime={globalTime}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            clickedId={clickedId}
            setClickedId={setClickedId}
            isAr={isAr}
          />
        ))}

      </div>

    </section>
  );
}