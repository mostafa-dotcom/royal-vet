'use client'; // السطر ده مهم جداً عشان نقول للموقع إننا بنعمل تفاعل مباشر هنا

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from './translations';

// هنا بنجهز شكل الصندوق السحري بتاعنا وإيه اللي جواه
type LanguageContextType = {
  language: Language; // اللغة الحالية
  toggleLanguage: () => void; // الزرار اللي هيبدل اللغة
  t: typeof translations.ar; // القاموس اللي فيه الكلمات
};

// بنبني الصندوق فاضي في الأول
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ده الغلاف اللي هيحوط الموقع كله عشان يوزع عليه اللغات
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // بنخلي العربي هو الأساس أول ما الموقع يفتح
  const [language, setLanguage] = useState<Language>('ar');

  // بنسحب الكلمات من القاموس حسب اللغة اللي شغالة دلوقتي
  const t = translations[language];

  // دي الحركة السحرية اللي بتبدل اللغة بين عربي وإنجليزي
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'ar' ? 'en' : 'ar'));
  };

  // ده بيغير اتجاه الموقع ولغة الـ HTML الأساسية لما اللغة تتغير
  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="w-full min-h-[100dvh]">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

// دي الأداة الصغيرة اللي هننادي عليها في أي صفحة عشان نغير اللغة أو نكتب كلمة
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('حصل مشكلة! الصندوق السحري مش راكب صح.');
  }
  return context;
};