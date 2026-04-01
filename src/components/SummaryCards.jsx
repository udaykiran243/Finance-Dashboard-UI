import { formatCurrency } from '../utils/finance'

const SummaryCards = ({ summary }) => {
  const cards = [
    {
      title: 'Total Balance',
      value: summary.balance,
      tone: summary.balance >= 0 ? 'positive' : 'negative',
    },
    { title: 'Income', value: summary.income, tone: 'positive' },
    { title: 'Expenses', value: summary.expenses, tone: 'negative' },
  ]

  return (
    <section className="summary-grid" aria-label="Financial summary">
      {cards.map((card) => (
        <article key={card.title} className={`summary-card ${card.tone}`}>
          <p className="card-label">{card.title}</p>
          <p className="card-value">{formatCurrency(card.value)}</p>
        </article>
      ))}
    </section>
  )
}

export default SummaryCards
