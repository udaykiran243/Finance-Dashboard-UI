import { formatCurrency } from '../utils/finance'
import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" } }
}

const GroupedSummary = ({ rows, groupBy }) => {
  const { t } = useTranslation();

  if (groupBy === 'none') {
    return null
  }

  const grouped = rows.reduce((acc, item) => {
    const key =
      groupBy === 'month'
        ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : item.category

    if (!acc[key]) {
      acc[key] = { income: 0, expense: 0, count: 0 }
    }

    acc[key][item.type] += item.amount
    acc[key].count += 1

    return acc
  }, {})

  const groupedRows = Object.entries(grouped).map(([name, value]) => ({
    name,
    ...value,
    net: value.income - value.expense,
  }))

  return (
    <motion.section 
      initial="hidden"
      animate="show"
      variants={container}
      className="p-8 rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-xl border border-[#c9d7e3]/40 dark:border-slate-700/50 shadow-xl h-full flex flex-col"
    >
      <h3 className="text-2xl font-bold flex items-center gap-3 text-slate-800 dark:text-slate-100 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700 capitalize">
        <Layers className="text-blue-500 w-6 h-6" /> {t('grouped.by')} {groupBy === 'month' ? t('controls.groupByMonth').replace(t('grouped.by'), '').trim() : t('controls.groupByCategory').replace(t('grouped.by'), '').trim() || groupBy}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 flex-1">
        {groupedRows.map((entry) => (
          <motion.article 
            variants={item}
            key={entry.name} 
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform text-4xl font-bold">
              {entry.name[0]}
            </div>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">{entry.name}</p>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between text-slate-500 dark:text-slate-400"><span>{t('grouped.transactions')}</span> <span className="font-medium text-slate-700 dark:text-slate-300">{entry.count}</span></p>
              <p className="flex justify-between text-teal-600 dark:text-teal-400"><span>{t('grouped.income')}</span> <span className="font-medium">{formatCurrency(entry.income)}</span></p>
              <p className="flex justify-between text-rose-600 dark:text-rose-400"><span>{t('grouped.expense')}</span> <span className="font-medium">{formatCurrency(entry.expense)}</span></p>
              <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-slate-900 dark:text-white">
                <span>{t('grouped.net')}</span> <span>{formatCurrency(entry.net)}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}

export default GroupedSummary
