export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export const toMonthLabel = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short' })
}

export const getSummary = (transactions) => {
  const totals = transactions.reduce(
    (acc, item) => {
      if (item.type === 'income') {
        acc.income += item.amount
      } else {
        acc.expenses += item.amount
      }
      return acc
    },
    { income: 0, expenses: 0 },
  )

  return {
    ...totals,
    balance: totals.income - totals.expenses,
  }
}

export const getTrendData = (transactions) => {
  const monthly = transactions.reduce((acc, item) => {
    const month = toMonthLabel(item.date)

    if (!acc[month]) {
      acc[month] = { month, income: 0, expenses: 0, net: 0 }
    }

    if (item.type === 'income') {
      acc[month].income += item.amount
    } else {
      acc[month].expenses += item.amount
    }

    acc[month].net = acc[month].income - acc[month].expenses

    return acc
  }, {})

  return Object.values(monthly)
}

export const getCategoryBreakdown = (transactions) => {
  const categories = transactions
    .filter((item) => item.type === 'expense')
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount
      return acc
    }, {})

  return Object.entries(categories).map(([name, value]) => ({ name, value }))
}

export const getInsights = (transactions) => {
  const expenseByCategory = getCategoryBreakdown(transactions)
  const trendData = getTrendData(transactions)

  const highestSpending = expenseByCategory.sort((a, b) => b.value - a.value)[0]

  const latest = trendData[trendData.length - 1]
  const previous = trendData[trendData.length - 2]

  let monthlyComparison = 'Not enough monthly data for comparison.'

  if (latest && previous) {
    const difference = latest.net - previous.net
    const direction = difference >= 0 ? 'up' : 'down'
    monthlyComparison = `Net balance is ${direction} by ${formatCurrency(
      Math.abs(difference),
    )} compared to ${previous.month}.`
  }

  const averageExpense =
    transactions.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0) /
      (transactions.filter((tx) => tx.type === 'expense').length || 1)

  const outlier = transactions
    .filter((tx) => tx.type === 'expense' && tx.amount > averageExpense * 1.8)
    .sort((a, b) => b.amount - a.amount)[0]

  return {
    highestSpending,
    monthlyComparison,
    usefulObservation: outlier
      ? `Large one-time spending detected in ${outlier.category} (${formatCurrency(
          outlier.amount,
        )}).`
      : 'Spending appears stable with no unusual spikes.',
  }
}
