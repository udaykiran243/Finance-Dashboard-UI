import { formatCurrency } from '../utils/finance'
import { motion } from 'framer-motion'
import { Lightbulb, Info, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const container = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { staggerChildren: 0.2 } }
}

const item = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { type: "spring" } }
}

const InsightsPanel = ({ insights }) => {
  const { t } = useTranslation();

  return (
    <motion.section 
      initial="hidden"
      animate="show"
      variants={container}
      className="p-8 rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-xl border border-[#c9d7e3]/40 dark:border-slate-700/50 shadow-xl h-auto flex flex-col relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full"></div>
      <h3 className="text-2xl font-bold flex items-center gap-3 text-slate-800 dark:text-slate-100 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <Lightbulb className="text-amber-500 w-6 h-6" /> {t('insights.title')}
      </h3>
      
      <ul className="space-y-6 flex-1 flex flex-col justify-start">
        <motion.li variants={item} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 mt-1">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{t('insights.highestSpending')}</span>
            <strong className="text-lg text-slate-800 dark:text-slate-200">
              {insights.highestSpending
                ? `${insights.highestSpending.name} (${formatCurrency(insights.highestSpending.value)})`
                : t('insights.noData')}
            </strong>
          </div>
        </motion.li>

        <motion.li variants={item} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 mt-1">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{t('insights.monthlyEval')}</span>
            <strong className="text-lg text-slate-800 dark:text-slate-200">{insights.monthlyComparison}</strong>
          </div>
        </motion.li>

        <motion.li variants={item} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 mt-1">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{t('insights.aiObs')}</span>
            <strong className="text-lg text-slate-800 dark:text-slate-200">{insights.usefulObservation}</strong>
          </div>
        </motion.li>
      </ul>
    </motion.section>
  )
}

export default InsightsPanel
