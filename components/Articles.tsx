'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../app/utils/LanguageContext';
import { translations } from '../app/utils/translations';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const recentArticles = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600",
    date: "2024-05-15",
    titleAr: "كيفية العناية بأسنان كلبك",
    titleEn: "How to Care for Your Dog's Teeth",
    excerptAr: "نصائح هامة للحفاظ على صحة فم أليفك والوقاية من أمراض اللثة.",
    excerptEn: "Important tips to maintain your pet's oral health and prevent gum disease."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600",
    date: "2024-05-10",
    titleAr: "أهم التطعيمات للقطط",
    titleEn: "Essential Vaccinations for Cats",
    excerptAr: "دليلك الشامل للتطعيمات الأساسية التي تحتاجها قطتك لحياة صحية.",
    excerptEn: "Your comprehensive guide to the essential vaccinations your cat needs for a healthy life."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600",
    date: "2024-05-02",
    titleAr: "التغذية السليمة للحيوانات الأليفة",
    titleEn: "Proper Nutrition for Pets",
    excerptAr: "تعرف على الأطعمة المسموحة والممنوعة لضمان تغذية متوازنة لحيوانك الأليف.",
    excerptEn: "Learn about allowed and forbidden foods to ensure a balanced diet for your pet."
  }
];

export default function Articles() {
  const { language } = useLanguage();
  const t = translations[language];
  const isAr = language === 'ar';

  return (
    <section id="articles" className="py-24 bg-transparent relative overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-6"
          >
            {t.articlesTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            {t.articlesDesc}
          </motion.p>
        </div>

        {/* Articles Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {recentArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0f0f0f] rounded-3xl overflow-hidden border border-white/5 shadow-lg group hover:border-[#D4AF37]/30 transition-colors duration-500 flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image 
                  src={article.image} 
                  alt={isAr ? article.titleAr : article.titleEn} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
                  priority={idx <= 1}
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[#D4AF37] text-xs font-medium">
                  {article.date}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {isAr ? article.titleAr : article.titleEn}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {isAr ? article.excerptAr : article.excerptEn}
                </p>
                <Link href={`/articles/${article.id}`} className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors duration-300 text-sm font-bold uppercase tracking-wider mt-auto">
                  <span>{t.readMore}</span>
                  {isAr ? (
                    <ArrowLeft className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Articles Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <Link href="/articles" className="group flex items-center gap-3 bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A0A0A] hover:border-[#D4AF37] focus-visible:outline-none">
            <span>{t.viewAllArticles}</span>
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
