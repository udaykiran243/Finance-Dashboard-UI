import ExportActions from './ExportActions'
import TransactionControls from './TransactionControls'
import TransactionForm from './TransactionForm'
import TransactionsTable from './TransactionsTable'

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
  return (
    <section className="panel space-y-3">
      <div className="section-head">
        <h2>Transactions</h2>
        <p>{filteredTransactions.length} records</p>
      </div>

      <TransactionControls
        filters={filters}
        categories={categories}
        hasInvalidDateRange={hasInvalidDateRange}
        onChange={onFilterChange}
        onReset={onResetFilters}
      />

      <ExportActions rows={filteredTransactions} />

      {role === 'admin' && (
        <TransactionForm
          key={editingTransaction?.id || 'new'}
          categories={categories}
          editingTransaction={editingTransaction}
          onSave={onSaveTransaction}
          onCancel={onCancelEditing}
        />
      )}

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
    </section>
  )
}

export default TransactionsSection
