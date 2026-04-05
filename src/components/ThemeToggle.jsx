import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100/50 dark:bg-slate-800/60 border border-white/60 dark:border-slate-700/50 shadow-inner overflow-hidden group focus:outline-none"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-colors duration-500 rounded-full" />
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          className="relative z-10"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          )}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">{isDark ? 'Light mode' : 'Dark mode'}</span>
    </motion.button>
  );
};

export default ThemeToggle;
