import CustomSelect from './CustomSelect'

const TransactionControls = ({ filters, categories, hasInvalidDateRange, onChange, onReset }) => {
  const typeOptions = [
    { value: 'all', label: 'All types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ]

  const categoryOptions = [
    { value: 'all', label: 'All categories' },
    ...categories.map((category) => ({ value: category, label: category })),
  ]

  const sortOptions = [
    { value: 'date-desc', label: 'Newest first' },
    { value: 'date-asc', label: 'Oldest first' },
    { value: 'amount-desc', label: 'Highest amount' },
    { value: 'amount-asc', label: 'Lowest amount' },
  ]

  const groupOptions = [
    { value: 'none', label: 'No grouping' },
    { value: 'category', label: 'Group by category' },
    { value: 'month', label: 'Group by month' },
  ]

  return (
    <>
      <div className="controls-grid">
        <input
          type="search"
          placeholder="Search by note or category"
          value={filters.search}
          onChange={(event) => onChange('search', event.target.value)}
        />

        <CustomSelect
          value={filters.type}
          options={typeOptions}
          onChange={(value) => onChange('type', value)}
          ariaLabel="Filter by transaction type"
        />

        <CustomSelect
          value={filters.category}
          options={categoryOptions}
          onChange={(value) => onChange('category', value)}
          ariaLabel="Filter by category"
        />

        <CustomSelect
          value={filters.sortBy}
          options={sortOptions}
          onChange={(value) => onChange('sortBy', value)}
          ariaLabel="Sort transactions"
        />

        <input
          type="date"
          value={filters.dateFrom}
          onChange={(event) => onChange('dateFrom', event.target.value)}
        />

        <input
          type="date"
          value={filters.dateTo}
          onChange={(event) => onChange('dateTo', event.target.value)}
        />

        <input
          type="number"
          min="0"
          step="1"
          placeholder="Min amount"
          value={filters.minAmount}
          onChange={(event) => onChange('minAmount', event.target.value)}
        />

        <input
          type="number"
          min="0"
          step="1"
          placeholder="Max amount"
          value={filters.maxAmount}
          onChange={(event) => onChange('maxAmount', event.target.value)}
        />

        <CustomSelect
          value={filters.groupBy}
          options={groupOptions}
          onChange={(value) => onChange('groupBy', value)}
          ariaLabel="Group transaction results"
        />

        <button type="button" className="button-secondary" onClick={onReset}>
          Reset Filters
        </button>
      </div>

      {hasInvalidDateRange && (
        <p className="filter-warning">Date range is invalid. "From" must be earlier than "To".</p>
      )}
    </>
  )
}

export default TransactionControls
