'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { login } from '../actions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-transparent relative z-20" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-premium p-8 rounded-[2rem] border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-serif tracking-wide">Royal Vet</h1>
          <h2 className="text-[#D4AF37] text-lg font-sans">لوحة التحكم الإدارية</h2>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-sans block text-right">كلمة المرور</label>
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#D4AF37]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input 
                type="password"
                name="password"
                id="password"
                required
                dir="ltr"
                autoComplete="current-password"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-11 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all font-sans text-left"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-2 font-sans text-right">{error}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-black font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all bg-[length:200%_auto] hover:bg-[position:right_center] disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'تسجيل الدخول'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
