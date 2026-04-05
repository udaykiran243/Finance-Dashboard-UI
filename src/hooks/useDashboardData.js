import { useEffect, useMemo, useState } from 'react'
import {
  getCategoryBreakdown,
  getInsights,
  getSummary,
  getTrendData,
  setFinanceConfig,
} from '../utils/finance'
import { fetchTransactions } from '../services/mockApi'
import { useTranslation } from 'react-i18next'

const STORAGE_KEY = 'finance-dashboard-transactions'
const ROLE_KEY = 'finance-dashboard-role'
const THEME_KEY = 'finance-dashboard-theme'
const FILTER_KEY = 'finance-dashboard-filters'
const LOCALE_KEY = 'finance-dashboard-locale'
const CURRENCY_KEY = 'finance-dashboard-currency'

const DEFAULT_FILTERS = {
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

export default function useDashboardData() {
  const { i18n } = useTranslation()
  const storedTransactions = useMemo(() => getStoredTransactions(), [])
  const [role, setRole] = useState(() => localStorage.getItem(ROLE_KEY) || 'viewer')
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light')
  const [language, setLanguage] = useState(() => localStorage.getItem(LOCALE_KEY) || 'en')
  const [currency, setCurrency] = useState(() => localStorage.getItem(CURRENCY_KEY) || 'USD')
  
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem(FILTER_KEY)

    if (!saved) {
      return DEFAULT_FILTERS
    }

    try {
      return { ...DEFAULT_FILTERS, ...JSON.parse(saved) }
    } catch {
      return DEFAULT_FILTERS
    }
  })
  const [requestedPage, setRequestedPage] = useState(1)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [transactions, setTransactions] = useState(() => storedTransactions || [])
  const [isLoading, setIsLoading] = useState(() => !storedTransactions)

  // Configure i18n & finance util globals
  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, language)
    localStorage.setItem(CURRENCY_KEY, currency)
    
    // Map short lang codes to locales for Intl
    const locales = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'hi': 'hi-IN'
    };
    
    i18n.changeLanguage(language);
    setFinanceConfig(locales[language] || 'en-US', currency);
    
    // Trigger re-render of transactions to update formatted numbers
    setTransactions(prev => [...prev]);
  }, [language, currency, i18n])

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
    setFilters(DEFAULT_FILTERS)
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return {
    role,
    setRole,
    theme,
    toggleTheme,
    filters,
    categories,
    hasInvalidDateRange,
    onFilterChange,
    resetFilters,
    filteredTransactions,
    paginatedTransactions,
    summary,
    trendData,
    categoryData,
    insights,
    totalPages,
    currentPage,
    pageSize: PAGE_SIZE,
    setRequestedPage,
    editingTransaction,
    setEditingTransaction,
    saveTransaction,
    isLoading,
    language,
    setLanguage,
    currency,
    setCurrency,
  }
}
