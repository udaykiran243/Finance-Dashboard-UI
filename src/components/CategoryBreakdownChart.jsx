import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import { formatCurrency } from '../utils/finance'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const COLORS = ['#06b6d4', '#8b5cf6', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6']

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-2xl shadow-xl flex items-center gap-3">
         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.fill }}></div>
         <div>
            <p className="text-slate-400 font-bold mb-0.5 text-xs">{payload[0].name}</p>
            <p className="text-white font-black text-lg">{formatCurrency(payload[0].value)}</p>
         </div>
      </div>
    );
  }
  return null;
};

const CategoryBreakdownChart = ({ data }) => {
  const { t } = useTranslation();

  if (!data.length) {
    return <p className="text-slate-500 italic p-6">{t('app.noExpenseData')}</p>
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t('app.spendingBreakdown')}</h3>
      <div className="flex-1 w-full min-h-[300px] flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              dataKey="value" 
              nameKey="name" 
              cx="50%" cy="50%" 
              outerRadius={100} 
              innerRadius={70}
              paddingAngle={6}
              stroke="none"
              isAnimationActive={true}
              animationBegin={200}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={entry.name} 
                  fill={COLORS[index % COLORS.length]} 
                  style={{ filter: `drop-shadow(0 4px 6px ${COLORS[index % COLORS.length]}40)` }}
                />
              ))}
            </Pie>
            <RechartsTooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="text-center">
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{t('app.total')}</p>
              <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
                {formatCurrency(data.reduce((a, b) => a + b.value, 0))}
              </p>
           </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
        {data.map((entry, index) => (
          <motion.div 
             key={entry.name}
             whileHover={{ scale: 1.05 }}
             className="flex items-center gap-2"
          >
            <span 
              className="w-4 h-4 rounded-md shadow-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length], boxShadow: `0 2px 8px ${COLORS[index % COLORS.length]}80` }} 
            />
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{entry.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CategoryBreakdownChart
