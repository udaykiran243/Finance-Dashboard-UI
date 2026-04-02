import BalanceTrendChart from './BalanceTrendChart'
import CategoryBreakdownChart from './CategoryBreakdownChart'

function DashboardCharts({ trendData, categoryData }) {
  return (
    <section className="charts-grid">
      <BalanceTrendChart data={trendData} />
      <CategoryBreakdownChart data={categoryData} />
    </section>
  )
}

export default DashboardCharts
