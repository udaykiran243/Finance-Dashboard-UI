import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart
} from 'recharts'
import { formatCurrency } from '../utils/finance'
import { useTranslation } from 'react-i18next'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-2xl shadow-xl">
        <p className="text-slate-400 font-bold mb-1 uppercase tracking-widest text-xs">{label}</p>
        <p className="text-cyan-400 font-black text-xl">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

const BalanceTrendChart = ({ data }) => {
  const { t } = useTranslation();

  if (!data.length) {
    return <p className="text-slate-500 italic p-6">{t('app.noTrendData')}</p>
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('app.balanceTrend')}</h3>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} tickFormatter={(value) => formatCurrency(value).replace(/\.00$/, '')} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#06b6d4', strokeWidth: 2, strokeDasharray: '4 4' }} />
            <Area type="monotone" dataKey="net" stroke="#06b6d4" strokeWidth={4} fillOpacity={1} fill="url(#colorNet)" activeDot={{ r: 8, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BalanceTrendChart
