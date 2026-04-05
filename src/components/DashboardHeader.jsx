import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function DashboardHeader() {
  const { t } = useTranslation();

  return (
    <motion.header 
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.1 }}
      layout
      className="relative flex flex-col items-center justify-center overflow-hidden panel backdrop-blur-3xl bg-white/40 dark:bg-slate-900/40 border border-white/30 dark:border-slate-700/60 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] rounded-[3rem] p-16 md:p-24 mb-10 w-full"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/10 via-blue-600/10 to-purple-600/10 opacity-70 pointer-events-none mix-blend-overlay"></div>
      
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-gradient-to-tr from-cyan-400 to-indigo-500 blur-[120px] rounded-full opacity-40 dark:opacity-30 pointer-events-none"
      ></motion.div>
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-[25rem] h-[25rem] bg-gradient-to-tr from-purple-500 to-pink-500 blur-[120px] rounded-full opacity-40 dark:opacity-30 pointer-events-none"
      ></motion.div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
           className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse mr-2"></span>
          <span className="text-xs uppercase tracking-widest font-bold text-slate-600 dark:text-slate-300">{t('header.status')}</span>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="uppercase tracking-[0.4em] font-extrabold mb-4 text-cyan-600 dark:text-cyan-400 drop-shadow-sm text-sm"
        >
          {t('header.eyebrow')}
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-balance text-6xl md:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-blue-50 dark:to-slate-400 pt-6 pb-6 leading-tight drop-shadow-xl"
        >
          {t('header.title')}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, sm: -10 }}
          animate={{ opacity: 1, sm: 0 }}
          transition={{ delay: 0.7 }}
          className="subtitle max-w-3xl text-xl md:text-2xl mt-4 font-medium text-slate-600 dark:text-slate-400 mx-auto leading-relaxed"
        >
          {t('header.subtitle')}
        </motion.p>
      </div>
    </motion.header>
  )
}

export default DashboardHeader
