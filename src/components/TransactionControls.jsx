import CustomSelect from './CustomSelect'
import { motion } from 'framer-motion'
import { FilterX, Search, Calendar, DollarSign } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const TransactionControls = ({ filters, categories, hasInvalidDateRange, onChange, onReset }) => {
  const { t } = useTranslation()

  const typeOptions = [
    { value: 'all', label: t('controls.allTypes') },
    { value: 'income', label: t('controls.income') },
    { value: 'expense', label: t('controls.expense') },
  ]

  const categoryOptions = [
    { value: 'all', label: t('controls.allCategories') },
    ...categories.map((category) => ({ value: category, label: category })),
  ]

  const sortOptions = [
    { value: 'date-desc', label: t('controls.newestFirst') },
    { value: 'date-asc', label: t('controls.oldestFirst') },
    { value: 'amount-desc', label: t('controls.highestAmount') },
    { value: 'amount-asc', label: t('controls.lowestAmount') },
  ]

  const groupOptions = [
    { value: 'none', label: t('controls.noGrouping') },
    { value: 'category', label: t('controls.groupByCategory') },
    { value: 'month', label: t('controls.groupByMonth') },
  ]

  const inputClass = "w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all shadow-sm pl-10"

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="search"
            placeholder={t('transactions.search')}
            className={inputClass}
            value={filters.search}
            onChange={(event) => onChange('search', event.target.value)}
          />
        </div>

        <CustomSelect value={filters.type} options={typeOptions} onChange={(v) => onChange('type', v)} ariaLabel="Filter by type" />
        <CustomSelect value={filters.category} options={categoryOptions} onChange={(v) => onChange('category', v)} ariaLabel="Filter by category" />
        <CustomSelect value={filters.sortBy} options={sortOptions} onChange={(v) => onChange('sortBy', v)} ariaLabel="Sort transactions" />
        
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input type="date" className={inputClass} value={filters.dateFrom} onChange={(e) => onChange('dateFrom', e.target.value)} />
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input type="date" className={inputClass} value={filters.dateTo} onChange={(e) => onChange('dateTo', e.target.value)} />
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input type="number" min="0" step="1" placeholder={t('controls.minAmount')} className={inputClass} value={filters.minAmount} onChange={(e) => onChange('minAmount', e.target.value)} />
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input type="number" min="0" step="1" placeholder={t('controls.maxAmount')} className={inputClass} value={filters.maxAmount} onChange={(e) => onChange('maxAmount', e.target.value)} />
        </div>

        <div className="lg:col-span-2">
          <CustomSelect value={filters.groupBy} options={groupOptions} onChange={(v) => onChange('groupBy', v)} ariaLabel="Group results" />
        </div>

        <div className="lg:col-span-2 flex items-end">
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 py-2.5 rounded-xl font-semibold transition-all border border-slate-200 dark:border-slate-700 shadow-sm" 
            onClick={onReset}
          >
            <FilterX className="w-4 h-4" /> {t('controls.resetFilters')}
          </button>
        </div>
      </div>

      {hasInvalidDateRange && (
        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-rose-500 text-sm font-medium bg-rose-50 dark:bg-rose-500/10 p-3 rounded-lg border border-rose-200 dark:border-rose-500/20">
          Date range is invalid. "From" must be earlier than "To".
        </motion.p>
      )}
    </motion.div>
  )
}

export default TransactionControls
