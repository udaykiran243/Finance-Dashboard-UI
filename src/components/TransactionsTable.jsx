import { formatCurrency } from '../utils/finance'

const TransactionsTable = ({
  role,
  rows,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  onEdit,
}) => {
  if (!rows.length) {
    return (
      <div className="empty-state">
        <h3>No transactions found</h3>
        <p>Try changing filters, search term, or add a transaction as Admin.</p>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Note</th>
            <th>Amount</th>
            {role === 'admin' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((tx) => (
            <tr key={tx.id}>
              <td>{new Date(tx.date).toLocaleDateString('en-US')}</td>
              <td>{tx.category}</td>
              <td>
                <span className={`pill ${tx.type}`}>{tx.type}</span>
              </td>
              <td>{tx.note}</td>
              <td>{formatCurrency(tx.amount)}</td>
              {role === 'admin' && (
                <td>
                  <button className="button-link" onClick={() => onEdit(tx)}>
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination" aria-label="Transactions pagination">
          <p className="pagination-meta">
            Showing {(currentPage - 1) * pageSize + 1}-{(currentPage - 1) * pageSize + rows.length} of{' '}
            {totalCount}
          </p>

          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            {'<'}
          </button>

          <div className="page-list">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1

              return (
                <span key={page}>
                  <button
                    type="button"
                    className={page === currentPage ? 'active-page' : ''}
                    onClick={() => onPageChange(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                  >
                    {page}
                  </button>
                </span>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            {'>'}
          </button>
        </div>
      )}
    </div>
  )
}

export default TransactionsTable
