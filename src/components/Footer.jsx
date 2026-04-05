import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Compass, Target, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full mt-24 py-12 px-6 sm:px-12 bg-slate-900 dark:bg-slate-950 text-slate-400 dark:text-slate-500 rounded-t-[3rem] border-t border-slate-800 relative overflow-hidden z-10"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-700 rounded-xl">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 tracking-tight">
            {t('app.title')}
          </span>
        </div>

        <div className="flex gap-8 text-sm font-medium">
          <a href="#dashboard" className="hover:text-cyan-400 transition-colors">{t('app.dashboard')}</a>
          <a href="#analytics" className="hover:text-cyan-400 transition-colors">{t('app.analytics')}</a>
          <a href="#transactions" className="hover:text-cyan-400 transition-colors">{t('app.transactions')}</a>
          <a href="#settings" className="hover:text-cyan-400 transition-colors">{t('footer.settingsInsights')}</a>
        </div>

        <div className="flex gap-4">
          <a href="#" className="p-2 bg-slate-800 dark:bg-slate-900 rounded-full hover:bg-slate-700 dark:hover:bg-slate-800 hover:text-cyan-400 transition-all transform hover:-translate-y-1">
            <Compass className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 bg-slate-800 dark:bg-slate-900 rounded-full hover:bg-slate-700 dark:hover:bg-slate-800 hover:text-cyan-400 transition-all transform hover:-translate-y-1">
            <Target className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 bg-slate-800 dark:bg-slate-900 rounded-full hover:bg-slate-700 dark:hover:bg-slate-800 hover:text-cyan-400 transition-all transform hover:-translate-y-1">
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm relative z-10">
        <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
      </div>
    </motion.footer>
  );
}
