import { formatCurrency } from '../utils/finance'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const item = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
}

const SummaryCards = ({ summary }) => {
  const { t } = useTranslation()

  const cards = [
    {
      title: t('summary.balance'),
      value: summary.balance,
      tone: summary.balance >= 0 ? 'positive' : 'negative',
      icon: <Wallet className="w-10 h-10" />,
      gradient: 'from-blue-600 via-indigo-600 to-purple-600',
      bgFade: 'from-blue-500/10 to-indigo-500/10',
      shadow: 'shadow-blue-500/40'
    },
    { 
      title: t('summary.income'), 
      value: summary.income, 
      tone: 'positive',
      icon: <TrendingUp className="w-10 h-10" />,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgFade: 'from-emerald-500/10 to-teal-500/10',
      shadow: 'shadow-emerald-500/40'
    },
    { 
      title: t('summary.expenses'), 
      value: summary.expenses, 
      tone: 'negative',
      icon: <TrendingDown className="w-10 h-10" />,
      gradient: 'from-rose-500 via-red-500 to-orange-500',
      bgFade: 'from-rose-500/10 to-red-500/10',
      shadow: 'shadow-rose-500/40'
    },
  ]

  return (
    <motion.section 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10" 
      aria-label="Financial summary"
    >
      {cards.map((card) => (
        <motion.article 
          variants={item}
          key={card.title} 
          whileHover={{ y: -12, scale: 1.03 }}
          className={`relative overflow-hidden p-8 rounded-[2rem] bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 shadow-2xl ${card.shadow} group`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${card.bgFade} opacity-50`}></div>
          <div className={`absolute -right-8 -top-8 w-40 h-40 bg-gradient-to-br ${card.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
          
          <div className="absolute bottom-4 right-4 opacity-5 transform group-hover:scale-150 group-hover:-rotate-12 transition-all duration-700 ease-out text-current">
             {card.icon}
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between gap-6">
            <div className="flex justify-between items-center w-full">
              <p className="text-sm font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">{card.title}</p>
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-xl`}>
                {card.icon}
              </div>
            </div>
            
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                {formatCurrency(card.value)}
              </h3>
            </motion.div>
          </div>
        </motion.article>
      ))}
    </motion.section>
  )
}

export default SummaryCards
