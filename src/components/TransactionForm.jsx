import { useState } from 'react'

const emptyTransaction = {
  date: '',
  amount: '',
  category: 'Groceries',
  type: 'expense',
  note: '',
}

const TransactionForm = ({ categories, editingTransaction, onSave, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    if (editingTransaction) {
      return {
        ...editingTransaction,
        amount: String(editingTransaction.amount),
      }
    }

    return emptyTransaction
  })

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const parsedAmount = Number(formData.amount)

    if (!formData.date || !formData.note.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return
    }

    onSave({
      ...formData,
      amount: parsedAmount,
      note: formData.note.trim(),
      id: editingTransaction?.id,
    })

    setFormData(emptyTransaction)
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h3>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h3>

      <div className="form-grid">
        <input
          type="date"
          value={formData.date}
          onChange={(event) => updateField('date', event.target.value)}
          required
        />
        <input
          type="number"
          min="1"
          step="1"
          placeholder="Amount"
          value={formData.amount}
          onChange={(event) => updateField('amount', event.target.value)}
          required
        />
        <select
          value={formData.category}
          onChange={(event) => updateField('category', event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select value={formData.type} onChange={(event) => updateField('type', event.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <input
        className="note-input"
        type="text"
        placeholder="Description"
        value={formData.note}
        onChange={(event) => updateField('note', event.target.value)}
        required
      />

      <div className="form-actions">
        <button type="submit">{editingTransaction ? 'Save Changes' : 'Add Transaction'}</button>
        {editingTransaction && (
          <button type="button" className="button-secondary" onClick={onCancel}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  )
}

export default TransactionForm
