import DashboardCharts from './components/DashboardCharts'
import DashboardHeader from './components/DashboardHeader'
import GroupedSummary from './components/GroupedSummary'
import InsightsPanel from './components/InsightsPanel'
import LoadingPanel from './components/LoadingPanel'
import SummaryCards from './components/SummaryCards'
import TransactionsSection from './components/TransactionsSection'
import { useDashboardContext } from './context/DashboardContext'
import './App.css'

function App() {
  const {
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
    pageSize,
    setRequestedPage,
    editingTransaction,
    setEditingTransaction,
    saveTransaction,
    isLoading,
  } = useDashboardContext()

  if (isLoading) {
    return <LoadingPanel />
  }

  return (
    <main className="dashboard-shell mx-auto">
      <DashboardHeader role={role} onRoleChange={setRole} theme={theme} onThemeToggle={toggleTheme} />

      <SummaryCards summary={summary} />

      <DashboardCharts trendData={trendData} categoryData={categoryData} />

      <TransactionsSection
        role={role}
        filters={filters}
        categories={categories}
        hasInvalidDateRange={hasInvalidDateRange}
        onFilterChange={onFilterChange}
        onResetFilters={resetFilters}
        filteredTransactions={filteredTransactions}
        editingTransaction={editingTransaction}
        onSaveTransaction={saveTransaction}
        onCancelEditing={() => setEditingTransaction(null)}
        paginatedTransactions={paginatedTransactions}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setRequestedPage}
        onEditTransaction={setEditingTransaction}
      />

      <GroupedSummary rows={filteredTransactions} groupBy={filters.groupBy} />

      <InsightsPanel insights={insights} />
    </main>
  )
}

export default App
