'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '../app/utils/LanguageContext';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const reviews = [
    {
      name: isAr ? 'أحمد محمود' : 'Ahmed Mahmoud',
      text: isAr ? 'أحسن عيادة بيطرية اتعاملت معاها. اهتمام مش طبيعي ورعاية ممتازة وتشخيص احترافي جداً.' : 'Best vet clinic I have dealt with. Great care, excellent attention, and high professionalism in diagnosis.',
      rating: 5,
    },
    {
      name: isAr ? 'سارة ياسين' : 'Sarah Yassin',
      text: isAr ? 'خدمة الكشف المنزلي أنقذت قطتي في وقت متأخر. دكاترة ممتازين وأجهزة حديثة جداً.' : 'The home visit service saved my cat late at night. Excellent doctors and very modern equipment.',
      rating: 5,
    },
    {
      name: isAr ? 'محمد علي' : 'Mohamed Ali',
      text: isAr ? 'العيادة مجهزة على أعلى مستوى ونتائج التحاليل طلعت بسرعة. شكراً رويال ڤيت!' : 'The clinic is fully equipped to the highest standard and lab results came out fast. Thank you Royal Vet!',
      rating: 5,
    }
  ];

  return (
    <section className="py-24 sm:py-32 relative z-10" id="testimonials" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 heading-glow font-['var(--font-alexandria)']">
            {isAr ? 'رأي عملائنا' : 'Customer Reviews'}
          </h2>
          <p className="text-white/60 text-lg body-luxury">
            {isAr ? 'فخورين بثقتكم فينا عشان نرعى أصدقائكم الأليفة' : 'We take pride in your trust to care for your furry friends'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 relative hover:border-[#D4AF37]/50 transition-colors group"
            >
              <Quote className={`w-10 h-10 text-[#D4AF37]/20 absolute top-6 ${isAr ? 'left-6' : 'right-6'} group-hover:text-[#D4AF37]/40 transition-colors transform ${isAr ? '-scale-x-100' : ''}`} />
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed mb-8 italic relative z-10 rtl:text-right">
                &quot;{review.text}&quot;
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
                  {review.name.charAt(0)}
                </div>
                <h4 className="text-white font-medium">{review.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
