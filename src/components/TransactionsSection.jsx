import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import ExportActions from './ExportActions'
import TransactionControls from './TransactionControls'
import TransactionForm from './TransactionForm'
import TransactionsTable from './TransactionsTable'
import { useTranslation } from 'react-i18next'

function TransactionsSection({
  role,
  filters,
  categories,
  hasInvalidDateRange,
  onFilterChange,
  onResetFilters,
  filteredTransactions,
  editingTransaction,
  onSaveTransaction,
  onCancelEditing,
  paginatedTransactions,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onEditTransaction,
}) {
  const { t } = useTranslation();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-3xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-xl border border-[#c9d7e3]/40 dark:border-slate-700/50 shadow-xl space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 dark:border-slate-700 pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800 dark:text-slate-100">
          <FileText className="text-emerald-500 w-6 h-6" /> {t('app.transactionsHistory')}
        </h2>
        <div className="px-4 py-1.5 mt-4 md:mt-0 rounded-full bg-slate-100 dark:bg-slate-700 text-sm font-bold text-slate-500 dark:text-slate-300">
          {filteredTransactions.length} {t('app.recordsFound')}
        </div>
      </div>

      <div className="bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
        <TransactionControls
          filters={filters}
          categories={categories}
          hasInvalidDateRange={hasInvalidDateRange}
          onChange={onFilterChange}
          onReset={onResetFilters}
        />
        <ExportActions rows={filteredTransactions} />
      </div>

      {role === 'admin' && (
        <motion.div
           initial={{ opacity: 0, height: 0 }}
           animate={{ opacity: 1, height: 'auto' }}
           exit={{ opacity: 0, height: 0 }}
        >
          <TransactionForm
            key={editingTransaction?.id || 'new'}
            categories={categories}
            editingTransaction={editingTransaction}
            onSave={onSaveTransaction}
            onCancel={onCancelEditing}
          />
        </motion.div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm mt-4">
        <TransactionsTable
          role={role}
          rows={paginatedTransactions}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={filteredTransactions.length}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onEdit={onEditTransaction}
        />
      </div>
    </motion.section>
  )
}

export default TransactionsSection
