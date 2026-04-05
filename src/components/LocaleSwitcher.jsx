import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, DollarSign, Euro, PoundSterling, IndianRupee } from 'lucide-react';
import { useDashboardContext } from '../context/DashboardContext';

const LocaleSwitcher = () => {
  const { language, setLanguage, currency, setCurrency } = useDashboardContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  const currencies = [
    { code: 'USD', icon: DollarSign },
    { code: 'EUR', icon: Euro },
    { code: 'GBP', icon: PoundSterling },
    { code: 'INR', icon: IndianRupee }
  ];

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100/50 dark:bg-slate-800/60 border border-white/60 dark:border-slate-700/50 shadow-inner group focus:outline-none"
        aria-label="Localization settings"
      >
        <Languages className="w-4 h-4 text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <React.Fragment>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="absolute right-0 top-12 mt-2 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/50 dark:border-slate-700/80 shadow-[0_20px_40px_rgb(0,0,0,0.15)] dark:shadow-[0_20px_40px_rgb(0,0,0,0.4)] rounded-2xl z-50 overflow-hidden"
            >
              <div className="p-2 space-y-1">
                <div className="px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Select Region / Lang
                </div>
                
                <div className="grid grid-cols-1 gap-1 mb-2 p-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl border border-white/40 dark:border-slate-700/50">
                  {languages.map((lng) => {
                    const isActive = language === lng.code;
                    return (
                      <button
                        key={lng.code}
                        onClick={() => { setLanguage(lng.code); setIsOpen(false); }}
                        className={`relative flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                          isActive 
                            ? 'text-white' 
                            : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-700/40'
                        }`}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="activeLang"
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-sm z-[-1]"
                          />
                        )}
                        <span className="z-10">{lng.label}</span>
                        <span className={`z-10 text-xs uppercase ${isActive ? 'text-cyan-100' : 'text-slate-400'}`}>{lng.code}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-2">
                  Select Currency
                </div>

                <div className="flex justify-between items-center gap-1 p-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl border border-white/40 dark:border-slate-700/50">
                   {currencies.map((curr) => {
                    const isActive = currency === curr.code;
                    const Icon = curr.icon;
                    return (
                      <button
                        key={curr.code}
                        onClick={() => { setCurrency(curr.code); setIsOpen(false); }}
                        className={`relative flex flex-col items-center justify-center p-2 flex-1 rounded-lg transition-colors ${
                          isActive 
                            ? 'text-white' 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-700/40'
                        }`}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="activeCurr"
                            className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-lg shadow-sm z-[-1]"
                          />
                        )}
                        <Icon className="w-5 h-5 z-10 mb-1" />
                        <span className={`text-[10px] font-bold z-10 ${isActive ? 'text-cyan-100' : 'text-slate-500'}`}>{curr.code}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocaleSwitcher;