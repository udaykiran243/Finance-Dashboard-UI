import { formatCurrency } from '../utils/finance'
import { motion, AnimatePresence } from 'framer-motion'
import { Pen, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const TransactionsTable = ({
  role,
  rows,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  onEdit,
}) => {
  const { t, i18n } = useTranslation()

  if (!rows.length) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700/50 m-4"
      >
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">{t('table.noFoundTitle')}</h3>
        <p className="text-slate-500 dark:text-slate-400">{t('table.noFoundDesc')}</p>
      </motion.div>
    )
  }

  const thClass = "px-6 py-4 text-left text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap"
  const tdClass = "px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300 font-medium"

  return (
    <div className="w-full bg-white dark:bg-slate-900 overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead>
            <tr>
              <th className={thClass}>{t('transactions.date')}</th>
              <th className={thClass}>{t('transactions.category')}</th>
              <th className={thClass}>{t('transactions.type')}</th>
              <th className={`${thClass} w-full`}>{t('transactions.note')}</th>
              <th className={`${thClass} text-right`}>{t('transactions.amount')}</th>
              {role === 'admin' && <th className={`${thClass} text-center`}>{t('transactions.action')}</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white/50 dark:bg-slate-900/50">
            <AnimatePresence>
            {rows.map((tx) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                key={tx.id} 
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className={tdClass}>{new Date(tx.date).toLocaleDateString(i18n.language || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td className={tdClass}>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {tx.category}
                  </span>
                </td>
                <td className={tdClass}>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${tx.type === 'income' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' : 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20'}`}>
                    {tx.type === 'income' ? t('controls.income') : t('controls.expense')}
                  </span>
                </td>
                <td className={`${tdClass} max-w-[200px] truncate`}>{tx.note}</td>
                <td className={`${tdClass} text-right font-extrabold ${tx.type === 'income' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </td>
                {role === 'admin' && (
                  <td className={`${tdClass} text-center`}>
                    <button 
                      className="p-1.5 text-slate-400 hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-500/10 rounded-lg transition-colors mx-auto block" 
                      onClick={() => onEdit(tx)}
                      title={t('form.edit')}
                    >
                      <Pen className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </motion.tr>
            ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700" aria-label="Transactions pagination">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-0">
            {t('table.showing')} <span className="font-bold text-slate-700 dark:text-slate-300">{(currentPage - 1) * pageSize + 1}</span> {t('table.to')} <span className="font-bold text-slate-700 dark:text-slate-300">{Math.min(currentPage * pageSize, totalCount)}</span> {t('table.of')} <span className="font-bold text-slate-700 dark:text-slate-300">{totalCount}</span> {t('table.results')}
          </p>

          <div className="flex bg-white dark:bg-slate-800/80 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              type="button"
              className="px-3 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-800 border-r border-slate-200 dark:border-slate-700"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1
                const isActive = page === currentPage

                return (
                  <button
                    key={page}
                    type="button"
                    className={`px-4 py-2 text-sm font-bold transition-colors border-r border-slate-200 dark:border-slate-700 last:border-r-0 ${isActive ? 'bg-teal-500 text-white shadow-inner' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                    onClick={() => onPageChange(page)}
                    aria-label={`Page ${page}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              className="px-3 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-800 border-l border-slate-200 dark:border-slate-700"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionsTable
