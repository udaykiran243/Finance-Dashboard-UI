import { formatCurrency } from '../utils/finance'

const GroupedSummary = ({ rows, groupBy }) => {
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
    <section className="panel grouped-panel">
      <h3>Grouped View ({groupBy})</h3>
      <div className="grouped-grid">
        {groupedRows.map((entry) => (
          <article key={entry.name} className="grouped-card">
            <p className="grouped-title">{entry.name}</p>
            <p>Transactions: {entry.count}</p>
            <p>Income: {formatCurrency(entry.income)}</p>
            <p>Expense: {formatCurrency(entry.expense)}</p>
            <p>Net: {formatCurrency(entry.net)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default GroupedSummary
