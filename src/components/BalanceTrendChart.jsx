import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCurrency } from '../utils/finance'

const BalanceTrendChart = ({ data }) => {
  if (!data.length) {
    return <p className="empty-inline">No trend data available yet.</p>
  }

  return (
    <div className="panel chart-panel">
      <h3>Balance Trend</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="rgba(36, 62, 92, 0.2)" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Line type="monotone" dataKey="net" stroke="#0f766e" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BalanceTrendChart
