'use client';

import { MapPin, Phone, Clock } from 'lucide-react';
import { useLanguage } from '../app/utils/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="relative bg-transparent pt-24 pb-8 overflow-hidden z-10 border-t border-[#FDFBF7]/5">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 mb-16">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-black font-['var(--font-alexandria)'] text-[#FDFBF7] tracking-wider hover:text-[#D4AF37] transition-colors duration-500 cursor-default">
              {language === 'ar' ? "هذه فقط البداية." : "This Is Only The Beginning."}
            </h2>
            <p className="text-[#FDFBF7]/60 font-sans font-light leading-relaxed max-w-sm">
              {language === 'ar' ? "اليوم، رويال ڤيت عيادة بيطرية. غداً، ستصبح نظام التشغيل المتكامل لرعاية الحيوانات الأليفة." : "Today, Royal Vet is a veterinary clinic. Tomorrow, it becomes the operating system for pet care."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button className="bg-gradient-to-r from-[#D4AF37] to-[#B3932F] text-[#0A0A0A] font-['var(--font-ibm)'] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-500 hover:scale-105 shadow-[0_4px_20px_rgba(212,175,55,0.2)] focus-visible:outline-none">
                {language === 'ar' ? "انضم للرحلة" : "Join The Journey"}
              </button>
              <button className="bg-transparent border border-[#FDFBF7]/20 text-[#FDFBF7] font-['var(--font-ibm)'] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-500 hover:border-[#D4AF37] hover:text-[#D4AF37] focus-visible:outline-none">
                {language === 'ar' ? "احجز زيارتك الأولى" : "Book Your First Visit"}
              </button>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full border border-[#FDFBF7]/10 flex items-center justify-center text-[#FDFBF7]/50 hover:text-[#0A0A0A] hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-500 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full border border-[#FDFBF7]/10 flex items-center justify-center text-[#FDFBF7]/50 hover:text-[#0A0A0A] hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-500 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="w-12 h-12 rounded-full border border-[#FDFBF7]/10 flex items-center justify-center text-[#FDFBF7]/50 hover:text-[#0A0A0A] hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-500 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-serif text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-medium">
              {t.footerContact}
            </h3>
            <div className="flex items-center gap-4 text-[#FDFBF7]/60 font-light group cursor-pointer hover:text-[#FDFBF7] transition-colors duration-300">
              <div className="w-10 h-10 rounded-full border border-[#FDFBF7]/5 flex items-center justify-center bg-[#FDFBF7]/[0.02] group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 transition-all duration-300 shrink-0">
                <MapPin className="text-[#D4AF37] w-4 h-4" />
              </div>
              <span className="leading-relaxed">{t.footerAddress}</span>
            </div>
            <div className="flex items-center gap-4 text-[#FDFBF7]/60 font-light group cursor-pointer hover:text-[#FDFBF7] transition-colors duration-300">
              <div className="w-10 h-10 rounded-full border border-[#FDFBF7]/5 flex items-center justify-center bg-[#FDFBF7]/[0.02] group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 transition-all duration-300 shrink-0">
                <Phone className="text-[#D4AF37] w-4 h-4" />
              </div>
              <span dir="ltr" className="text-left tracking-wider">{t.footerPhone}</span>
            </div>
          </div>

          {/* Hours Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-serif text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-medium">
              {t.footerHours}
            </h3>
            <div className="flex items-start gap-4 text-[#FDFBF7]/60 font-light group cursor-pointer hover:text-[#FDFBF7] transition-colors duration-300">
              <div className="w-10 h-10 rounded-full border border-[#FDFBF7]/5 flex items-center justify-center bg-[#FDFBF7]/[0.02] group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 transition-all duration-300 shrink-0">
                <Clock className="text-[#D4AF37] w-4 h-4" />
              </div>
              <span className="leading-relaxed pt-2">{t.footerHoursText}</span>
            </div>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="border-t border-[#FDFBF7]/5 pt-8 text-center text-[#FDFBF7]/30 text-xs font-medium uppercase tracking-[0.3em]">
          <p>&copy; {new Date().getFullYear()} {t.footerRights}.</p>
        </div>
      </div>
    </footer>
  );
}
