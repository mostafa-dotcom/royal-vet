'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const faqs = [
    {
      q: isAr ? 'هل تتوفر خدمة الزيارة المنزلية؟' : 'Do you provide home visits?',
      a: isAr ? 'نعم، نوفر خدمة الزيارات المنزلية بمركبات مجهزة بالكامل للتعامل مع مختلف الحالات وفي أي وقت.' : 'Yes, we provide home visits with fully equipped vehicles for various cases at any time.',
    },
    {
      q: isAr ? 'ما هي أوقات العمل في العيادة؟' : 'What are your working hours?',
      a: isAr ? 'نعمل على مدار الساعة، 7 أيام في الأسبوع لاستقبال الحالات الطارئة وتوفير الرعاية المستمرة.' : 'We operate 24/7, 7 days a week for emergency cases and continuous care.',
    },
    {
      q: isAr ? 'متى يجب تطعيم أليفي الجديد؟' : 'When should my new pet be vaccinated?',
      a: isAr ? 'تبدأ التطعيمات عادة من عمر 6 إلى 8 أسابيع. يرجى زيارتنا لفحص الأليف وتحديد جدول التطعيمات المناسب.' : 'Vaccinations usually start at 6-8 weeks of age. Please visit us for a checkup and proper vaccination schedule.',
    },
    {
      q: isAr ? 'هل تتوفر خدمات جراحية متقدمة؟' : 'Are advanced surgical services available?',
      a: isAr ? 'نعم، نمتلك غرفة عمليات مجهزة بأحدث التقنيات وأعلى معايير التعقيم لضمان سلامة أليفك أثناء الجراحة.' : 'Yes, we have a surgical suite equipped with the latest technology and highest sterilization standards for your pet\'s safety.',
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32 relative z-10" id="faq" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-white/60 text-lg">
            {isAr ? 'كل ما تحتاج معرفته عن خدماتنا' : 'Everything you need to know about our services'}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden hover:border-[#D4AF37]/30 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-white text-right md:text-left rtl:text-right">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-white/70 leading-relaxed border-t border-white/5 pt-4 rtl:text-right">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
