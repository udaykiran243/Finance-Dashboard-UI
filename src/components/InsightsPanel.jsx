import { formatCurrency } from '../utils/finance'

const InsightsPanel = ({ insights }) => {
  return (
    <section className="panel insights-panel">
      <h3>Insights</h3>
      <ul>
        <li>
          Highest spending category:{' '}
          <strong>
            {insights.highestSpending
              ? `${insights.highestSpending.name} (${formatCurrency(insights.highestSpending.value)})`
              : 'No expense data yet'}
          </strong>
        </li>
        <li>
          Monthly comparison: <strong>{insights.monthlyComparison}</strong>
        </li>
        <li>
          Useful observation: <strong>{insights.usefulObservation}</strong>
        </li>
      </ul>
    </section>
  )
}

export default InsightsPanel
