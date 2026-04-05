import DashboardCharts from './components/DashboardCharts'
import DashboardHeader from './components/DashboardHeader'
import GroupedSummary from './components/GroupedSummary'
import InsightsPanel from './components/InsightsPanel'
import LoadingPanel from './components/LoadingPanel'
import SummaryCards from './components/SummaryCards'
import TransactionsSection from './components/TransactionsSection'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useDashboardContext } from './context/DashboardContext'
import { motion, AnimatePresence } from 'framer-motion'
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
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-6 max-w-[1600px] mx-auto px-4 sm:px-8 pt-36 md:pt-40 pb-12 w-full relative z-10"
      >
        <DashboardHeader />

        <AnimatePresence>
          <motion.div 
            id="dashboard"
            className="scroll-mt-32"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 50, damping: 15 }}
          >
            <SummaryCards summary={summary} />
          </motion.div>

          <motion.div
            id="analytics"
            className="scroll-mt-32"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 50, damping: 15 }}
          >
            <DashboardCharts trendData={trendData} categoryData={categoryData} />
          </motion.div>

          <motion.div
            id="transactions"
            className="my-10 scroll-mt-32"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 50, damping: 15 }}
          >
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
          </motion.div>

          <div id="settings" className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start scroll-mt-32">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 50, damping: 15 }}
            >
              <GroupedSummary rows={filteredTransactions} groupBy={filters.groupBy} />
            </motion.div>

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0, type: 'spring', stiffness: 50, damping: 15 }}
            >
              <InsightsPanel insights={insights} />
            </motion.div>
          </div>
        </AnimatePresence>
      </motion.main>
      <Footer />
    </>
  )
}

export default App
