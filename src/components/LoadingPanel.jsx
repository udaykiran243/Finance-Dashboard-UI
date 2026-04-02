function LoadingPanel() {
  return (
    <main className="dashboard-shell mx-auto">
      <section className="panel loading-panel">
        <div className="loader" />
        <p>Loading transactions from mock API...</p>
      </section>
    </main>
  )
}

export default LoadingPanel
