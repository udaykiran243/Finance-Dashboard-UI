import { motion } from 'framer-motion';
import { User, ShieldAlert } from 'lucide-react';

const RoleSwitcher = ({ role, onRoleChange }) => {
  const roles = [
    { id: 'viewer', label: 'Viewer', icon: User },
    { id: 'admin', label: 'Admin', icon: ShieldAlert }
  ];

  return (
    <div className="flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/60 p-1 rounded-full border border-white/60 dark:border-slate-700/50 shadow-inner overflow-hidden">
      {roles.map((r) => {
        const isActive = role === r.id;
        const Icon = r.icon;
        
        return (
          <button
            key={r.id}
            onClick={() => onRoleChange(r.id)}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors duration-300 z-10 ${
              isActive 
                ? 'text-white dark:text-cyan-50' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeRoleBadge"
                className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 dark:from-cyan-600 dark:to-blue-600 rounded-full shadow-md z-[-1]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'opacity-100' : 'opacity-70'}`} />
            <span className="hidden lg:block">{r.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSwitcher;
