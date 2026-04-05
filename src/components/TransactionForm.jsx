import { useState } from 'react'
import CustomSelect from './CustomSelect'
import { motion } from 'framer-motion'
import { PlusCircle, RotateCcw, XCircle, Save } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const emptyTransaction = {
  date: '',
  amount: '',
  category: 'Groceries',
  type: 'expense',
  note: '',
}

const TransactionForm = ({ categories, editingTransaction, onSave, onCancel }) => {
  const { t } = useTranslation()

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
    { value: 'income', label: t('controls.income') },
    { value: 'expense', label: t('controls.expense') },
  ]

  const inputClass = "w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all shadow-sm"

  return (
    <motion.form 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-teal-500/20 dark:border-teal-400/20 relative shadow-inner overflow-hidden mb-6" 
      onSubmit={handleSubmit}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full"></div>
      
      <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 mb-6 relative z-10">
        {editingTransaction ? <RotateCcw className="text-amber-500 w-5 h-5"/> : <PlusCircle className="text-teal-500 w-5 h-5" />} 
        {editingTransaction ? t('form.edit') : t('form.addNew')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 mb-4">
        <input type="date" className={inputClass} value={formData.date} onChange={(e) => updateField('date', e.target.value)} required />
        <input type="number" min="1" step="1" placeholder={t('form.amountPlaceholder')} className={inputClass} value={formData.amount} onChange={(e) => updateField('amount', e.target.value)} required />
        <CustomSelect value={formData.category} options={categoryOptions} onChange={(v) => updateField('category', v)} ariaLabel="Choose trans category" />
        <CustomSelect value={formData.type} options={typeOptions} onChange={(v) => updateField('type', v)} ariaLabel="Choose trans type" />
      </div>

      <input
        className={`${inputClass} mb-6 relative z-10 w-full`}
        type="text"
        placeholder={t('form.notePlaceholder')}
        value={formData.note}
        onChange={(event) => updateField('note', event.target.value)}
        required
      />

      <div className="flex gap-4 relative z-10">
        <button 
          type="submit" 
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          {editingTransaction ? <><Save className="w-4 h-4"/> {t('form.save')}</> : <><PlusCircle className="w-4 h-4"/> {t('transactions.add_new')}</>}
        </button>
        {editingTransaction && (
          <button 
            type="button" 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 py-2.5 rounded-xl font-bold transition-all border border-slate-200 dark:border-slate-700" 
            onClick={onCancel}
          >
            <XCircle className="w-4 h-4" /> {t('form.cancel')}
          </button>
        )}
      </div>
    </motion.form>
  )
}

export default TransactionForm
