'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

import { useLanguage } from '../app/utils/LanguageContext';
import { Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { t, toggleLanguage, language } = useLanguage();
  const isAr = language === 'ar';

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHidden(false);
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const links = [
    { name: isAr ? 'الرئيسية' : 'Home', href: '/' },
    { name: isAr ? 'خدماتنا' : 'Services', href: '/services' },
    { name: isAr ? 'عن العيادة' : 'Our Story', href: '/story' },
    { name: isAr ? 'الصور' : 'Gallery', href: '/gallery' },
    { name: isAr ? 'مقالات' : 'Articles', href: '/articles' },
    { name: isAr ? 'التطبيق' : 'The App', href: '/app' },
    { name: isAr ? 'الأسئلة والآراء' : 'FAQ & Reviews', href: '/faq' },
    { name: isAr ? 'تواصل معنا' : 'Contact', href: '/contact' },
  ];


  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-center z-[100] pointer-events-none p-4 md:p-6" dir={isAr ? 'rtl' : 'ltr'}>
        <motion.nav
          variants={{
            visible: { y: 0, opacity: 1, scale: 1 },
            hidden: { y: "-150%", opacity: 0, scale: 0.95 }
          }}
          initial="visible"
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between px-3 py-2 md:px-4 md:py-2.5 rounded-full transition-all duration-500 will-change-transform w-full md:w-auto md:min-w-[850px] max-w-[1200px] relative group
            ${isScrolled 
              ? 'bg-[#050505]/60 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]' 
              : 'bg-transparent border border-transparent shadow-none'
            }`}
        >
          {isScrolled && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          )}

          {/* Left Side: Logo */}
          <Link href="/" className="flex items-center group/logo px-2 rounded-full relative z-10">
            <div className={`relative shrink-0 pointer-events-none transform-gpu transition-all duration-500 flex items-center justify-center ${isScrolled ? 'w-10 h-10' : 'w-14 h-14 md:w-20 md:h-20'}`}>
              <Image 
                src="/logo.png" 
                alt="Royal Vet Logo" 
                fill
                priority
                className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover/logo:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 64px, 96px"
              />
            </div>
          </Link>

          {/* Center: Desktop Links */}
          <div className="hidden xl:flex items-center gap-0.5 px-2 relative z-10">
            {links.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={idx} 
                  href={link.href} 
                  className={`relative px-2.5 py-1.5 md:py-2 rounded-full text-[12px] lg:text-[13px] font-sans font-bold transition-all duration-300 overflow-hidden group/link
                    ${isActive ? 'text-[#050505]' : 'text-[#FDFBF7]/70 hover:text-[#D4AF37]'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#B3932F] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side: Lang + CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 md:gap-4 relative z-10">
            
            <Link
              href="/login"
              className={`flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full transition-all duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
                ${isScrolled ? 'bg-white/5 border border-white/10 text-[#FDFBF7]' : 'bg-black/20 border border-white/20 text-white backdrop-blur-md'}
                hover:bg-[#D4AF37] hover:text-[#0A0A0A] hover:border-[#D4AF37] hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
              `}
              title={isAr ? "تسجيل الدخول" : "Login"}
            >
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </Link>

            <button 
              onClick={toggleLanguage}
              className={`flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full font-['var(--font-ibm)'] font-medium text-xs md:text-sm transition-all duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
                ${isScrolled ? 'bg-white/5 border border-white/10 text-[#FDFBF7]' : 'bg-black/20 border border-white/20 text-white backdrop-blur-md'}
                hover:bg-[#D4AF37] hover:text-[#0A0A0A] hover:border-[#D4AF37] hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
              `}
              title={isAr ? "Switch to English" : "اقلب عربي"}
            >
              {isAr ? 'EN' : 'ع'}
            </button>

            <Link href="/contact" className="hidden sm:block relative group px-6 py-2.5 md:px-7 md:py-3 rounded-full font-bold text-xs uppercase tracking-widest text-[#0A0A0A] overflow-hidden focus-visible:outline-none shadow-[0_5px_20px_rgba(212,175,55,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] bg-[length:200%_auto] animate-shimmer transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-white/30 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 drop-shadow-sm">{t.bookNow}</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className={`xl:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                ${isScrolled ? 'border border-white/10 text-white bg-white/5' : 'border border-white/20 text-white bg-black/20 backdrop-blur-md'}
                hover:bg-[#D4AF37] hover:text-black hover:border-transparent hover:scale-105`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(25px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-[#050505]/90 flex flex-col justify-center items-center"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#B3932F]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black hover:border-transparent hover:rotate-90 transition-all duration-500 group"
            >
              <X className="w-6 h-6 transition-transform group-hover:scale-110" />
            </button>

            {/* Mobile Links */}
            <div className="flex flex-col items-center gap-6 md:gap-8 w-full px-6 z-10">
              {links.map((link, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                    className={`relative text-3xl md:text-5xl font-['var(--font-alexandria)'] font-bold transition-colors duration-300 group inline-block
                      ${pathname === link.href ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
                  >
                    {link.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B3932F] rounded-full transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.05 + 0.1, duration: 0.5 }}
                className="mt-8 flex flex-col items-center gap-6"
              >
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#D4AF37] font-bold text-lg transition-colors flex items-center gap-2 font-['var(--font-ibm)']">
                  <User className="w-5 h-5" />
                  {isAr ? 'تسجيل الدخول' : 'Login / Client Portal'}
                </Link>

                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="relative inline-block group px-12 py-4 rounded-full font-bold text-sm uppercase tracking-widest text-[#0A0A0A] overflow-hidden shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] bg-[length:200%_auto] animate-shimmer" />
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                    {t.bookNow}
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}