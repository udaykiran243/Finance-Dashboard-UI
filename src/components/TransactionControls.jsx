const TransactionControls = ({ filters, categories, hasInvalidDateRange, onChange, onReset }) => {
  return (
    <>
      <div className="controls-grid">
        <input
          type="search"
          placeholder="Search by note or category"
          value={filters.search}
          onChange={(event) => onChange('search', event.target.value)}
        />

        <select value={filters.type} onChange={(event) => onChange('type', event.target.value)}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={(event) => onChange('category', event.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select value={filters.sortBy} onChange={(event) => onChange('sortBy', event.target.value)}>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Highest amount</option>
          <option value="amount-asc">Lowest amount</option>
        </select>

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

        <select value={filters.groupBy} onChange={(event) => onChange('groupBy', event.target.value)}>
          <option value="none">No grouping</option>
          <option value="category">Group by category</option>
          <option value="month">Group by month</option>
        </select>

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
