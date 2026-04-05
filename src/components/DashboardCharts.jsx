import { motion } from 'framer-motion'
import BalanceTrendChart from './BalanceTrendChart'
import CategoryBreakdownChart from './CategoryBreakdownChart'

function DashboardCharts({ trendData, categoryData }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-8">
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="p-6 rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-xl border border-[#c9d7e3]/40 dark:border-slate-700/50 shadow-xl transition-all duration-500 ease-out flex flex-col items-center justify-center min-h-[400px]"
      >
        <BalanceTrendChart data={trendData} />
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="p-6 rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-xl border border-[#c9d7e3]/40 dark:border-slate-700/50 shadow-xl transition-all duration-500 ease-out flex flex-col items-center justify-center min-h-[400px]"
      >
        <CategoryBreakdownChart data={categoryData} />
      </motion.div>
    </section>
  )
}

export default DashboardCharts
