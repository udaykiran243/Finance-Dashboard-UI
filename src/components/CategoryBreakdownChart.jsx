import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCurrency } from '../utils/finance'

const COLORS = ['#f97316', '#0891b2', '#e11d48', '#16a34a', '#4f46e5', '#b45309']

const CategoryBreakdownChart = ({ data }) => {
  if (!data.length) {
    return <p className="empty-inline">No expense categories to display.</p>
  }

  return (
    <div className="panel chart-panel">
      <h3>Spending Breakdown</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={95} innerRadius={45}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="legend-list">
        {data.map((entry, index) => (
          <li key={entry.name}>
            <span style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            {entry.name}: {formatCurrency(entry.value)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryBreakdownChart
