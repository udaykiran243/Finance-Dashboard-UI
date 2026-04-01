import { useEffect, useMemo, useState } from 'react'
import SummaryCards from './components/SummaryCards'
import BalanceTrendChart from './components/BalanceTrendChart'
import CategoryBreakdownChart from './components/CategoryBreakdownChart'
import TransactionControls from './components/TransactionControls'
import TransactionsTable from './components/TransactionsTable'
import RoleSwitcher from './components/RoleSwitcher'
import InsightsPanel from './components/InsightsPanel'
import TransactionForm from './components/TransactionForm'
import ThemeToggle from './components/ThemeToggle'
import ExportActions from './components/ExportActions'
import GroupedSummary from './components/GroupedSummary'
import {
  getCategoryBreakdown,
  getInsights,
  getSummary,
  getTrendData,
} from './utils/finance'
import { fetchTransactions } from './services/mockApi'
import './App.css'

const STORAGE_KEY = 'finance-dashboard-transactions'
const ROLE_KEY = 'finance-dashboard-role'
const THEME_KEY = 'finance-dashboard-theme'
const FILTER_KEY = 'finance-dashboard-filters'

const defaultFilters = {
  search: '',
  type: 'all',
  category: 'all',
  sortBy: 'date-desc',
  dateFrom: '',
  dateTo: '',
  minAmount: '',
  maxAmount: '',
  groupBy: 'none',
}

const PAGE_SIZE = 10

const getStoredTransactions = () => {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return null
  }

  try {
    return JSON.parse(saved)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

function App() {
  const storedTransactions = useMemo(() => getStoredTransactions(), [])
  const [role, setRole] = useState(() => localStorage.getItem(ROLE_KEY) || 'viewer')
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light')
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem(FILTER_KEY)

    if (!saved) {
      return defaultFilters
    }

    try {
      return { ...defaultFilters, ...JSON.parse(saved) }
    } catch {
      return defaultFilters
    }
  })
  const [requestedPage, setRequestedPage] = useState(1)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [transactions, setTransactions] = useState(() => storedTransactions || [])
  const [isLoading, setIsLoading] = useState(() => !storedTransactions)

  useEffect(() => {
    if (!isLoading) {
      return
    }

    const load = async () => {
      const apiRows = await fetchTransactions()
      setTransactions(apiRows)
      setIsLoading(false)
    }

    load()
  }, [isLoading])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(ROLE_KEY, role)
  }, [role])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(FILTER_KEY, JSON.stringify(filters))
  }, [filters])

  const categories = useMemo(() => {
    const set = new Set(transactions.map((tx) => tx.category))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [transactions])

  const hasInvalidDateRange = Boolean(filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo)

  const filteredTransactions = useMemo(() => {
    if (hasInvalidDateRange) {
      return []
    }

    const searchQuery = filters.search.trim().toLowerCase()

    const rows = transactions.filter((tx) => {
      if (filters.type !== 'all' && tx.type !== filters.type) {
        return false
      }

      if (filters.category !== 'all' && tx.category !== filters.category) {
        return false
      }

      if (
        searchQuery &&
        !tx.note.toLowerCase().includes(searchQuery) &&
        !tx.category.toLowerCase().includes(searchQuery)
      ) {
        return false
      }

      if (filters.dateFrom && tx.date < filters.dateFrom) {
        return false
      }

      if (filters.dateTo && tx.date > filters.dateTo) {
        return false
      }

      if (filters.minAmount && tx.amount < Number(filters.minAmount)) {
        return false
      }

      if (filters.maxAmount && tx.amount > Number(filters.maxAmount)) {
        return false
      }

      return true
    })

    return rows.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'amount-desc':
          return b.amount - a.amount
        case 'amount-asc':
          return a.amount - b.amount
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })
  }, [transactions, filters, hasInvalidDateRange])

  const summary = useMemo(() => getSummary(transactions), [transactions])
  const trendData = useMemo(() => getTrendData(transactions), [transactions])
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions])
  const insights = useMemo(() => getInsights(transactions), [transactions])

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / PAGE_SIZE))
  const currentPage = Math.min(requestedPage, totalPages)

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    return filteredTransactions.slice(startIndex, startIndex + PAGE_SIZE)
  }, [filteredTransactions, currentPage])

  const onFilterChange = (field, value) => {
    setRequestedPage(1)
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const resetFilters = () => {
    setRequestedPage(1)
    setFilters(defaultFilters)
  }

  const saveTransaction = (entry) => {
    if (role !== 'admin') {
      return
    }

    setTransactions((prev) => {
      if (entry.id) {
        return prev.map((tx) => (tx.id === entry.id ? entry : tx))
      }

      return [{ ...entry, id: `t-${Date.now()}` }, ...prev]
    })

    setEditingTransaction(null)
  }

  if (isLoading) {
    return (
      <main className="dashboard-shell">
        <section className="panel loading-panel">
          <div className="loader" />
          <p>Loading transactions from mock API...</p>
        </section>
      </main>
    )
  }

  return (
    <main className="dashboard-shell">
      <header className="header panel">
        <div>
          <p className="eyebrow">Finance Dashboard UI</p>
          <h1>Personal Finance Command Center</h1>
          <p className="subtitle">Track your money flow, spending behavior, and key insights.</p>
        </div>
        <div className="header-actions">
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          />
          <RoleSwitcher role={role} onRoleChange={setRole} />
        </div>
      </header>

      <SummaryCards summary={summary} />

      <section className="charts-grid">
        <BalanceTrendChart data={trendData} />
        <CategoryBreakdownChart data={categoryData} />
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>Transactions</h2>
          <p>{filteredTransactions.length} records</p>
        </div>

        <TransactionControls
          filters={filters}
          categories={categories}
          hasInvalidDateRange={hasInvalidDateRange}
          onChange={onFilterChange}
          onReset={resetFilters}
        />

        <ExportActions rows={filteredTransactions} />

        {role === 'admin' && (
          <TransactionForm
            key={editingTransaction?.id || 'new'}
            categories={categories}
            editingTransaction={editingTransaction}
            onSave={saveTransaction}
            onCancel={() => setEditingTransaction(null)}
          />
        )}

        <TransactionsTable
          role={role}
          rows={paginatedTransactions}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={filteredTransactions.length}
          pageSize={PAGE_SIZE}
          onPageChange={setRequestedPage}
          onEdit={setEditingTransaction}
        />
      </section>

      <GroupedSummary rows={filteredTransactions} groupBy={filters.groupBy} />

      <InsightsPanel insights={insights} />
    </main>
  )
}

export default App
