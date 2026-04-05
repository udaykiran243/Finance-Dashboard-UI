import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Menu, X } from 'lucide-react';
import { useDashboardContext } from '../context/DashboardContext';
import RoleSwitcher from './RoleSwitcher';
import ThemeToggle from './ThemeToggle';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { role, setRole, theme, toggleTheme } = useDashboardContext();
  const [activeTab, setActiveTab] = useState('app.dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { labelKey: 'app.dashboard', id: '#dashboard' },
    { labelKey: 'app.analytics', id: '#analytics' },
    { labelKey: 'app.transactions', id: '#transactions' },
    { labelKey: 'app.settings', id: '#settings' },
  ];

  return (
    <motion.nav
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
      className="fixed top-6 left-0 right-0 mx-auto w-[95%] max-w-6xl z-[999]"
    >
      <div className="relative px-4 sm:px-6 py-3 sm:py-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-full">
        <div className="flex items-center justify-between w-full">     
          {/* Left: Brand */}
          <div className="flex items-center justify-start z-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}     
            >
              <div className="p-2 sm:p-2.5 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/40 group-hover:shadow-cyan-400/60 transition-all duration-300">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 dark:text-white">
                Zorvyn<span className="text-cyan-500">.</span>
              </h1>
            </motion.div>
          </div>

          {/* Center: Navigation (Desktop) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
            <div className="flex items-center gap-1 p-1 bg-slate-100/50 dark:bg-slate-800/60 rounded-full border border-white/60 dark:border-slate-700/50 shadow-inner">
              {navItems.map((item) => {
                const isActive = activeTab === item.labelKey;
                return (
                  <motion.a
                    key={item.labelKey}
                    href={item.id}
                    onClick={() => setActiveTab(item.labelKey)}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 z-10 ${
                      isActive
                        ? 'text-white dark:text-cyan-50'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBadge"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-md z-[-1]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {t(item.labelKey)}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 z-20">
            <RoleSwitcher role={role} onRoleChange={setRole} />
            <LocaleSwitcher />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            {/* Hamburger Icon for Mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center p-2 rounded-full border border-white/60 dark:border-slate-700/50 shadow-inner text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute top-[110%] left-0 right-0 p-4 mt-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/50 dark:border-slate-800/80 shadow-[0_20px_40px_rgb(0,0,0,0.15)] dark:shadow-[0_20px_40px_rgb(0,0,0,0.4)] rounded-[2rem] lg:hidden overflow-hidden origin-top"
          >
            <div className="grid grid-cols-1 gap-2">
              {navItems.map((item, index) => {
                const isActive = activeTab === item.labelKey;
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.labelKey}
                    href={item.id}
                    onClick={() => {
                      setActiveTab(item.labelKey);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`relative px-6 py-4 rounded-2xl text-base font-bold transition-all ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-md z-[-1]" />
                    )}
                    {t(item.labelKey)}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
