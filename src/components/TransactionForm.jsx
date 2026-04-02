import { useState } from 'react'
import CustomSelect from './CustomSelect'

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

  const categoryOptions = categories.map((category) => ({ value: category, label: category }))
  const typeOptions = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ]

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
        <CustomSelect
          value={formData.category}
          options={categoryOptions}
          onChange={(value) => updateField('category', value)}
          ariaLabel="Choose transaction category"
        />
        <CustomSelect
          value={formData.type}
          options={typeOptions}
          onChange={(value) => updateField('type', value)}
          ariaLabel="Choose transaction type"
        />
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
