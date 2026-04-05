import { useTranslation } from 'react-i18next'

const downloadFile = (content, fileName, type) => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(url)
}

const toCsv = (rows) => {
  const header = ['id', 'date', 'category', 'type', 'amount', 'note']
  const csvRows = rows.map((tx) =>
    [tx.id, tx.date, tx.category, tx.type, tx.amount, `"${tx.note.replaceAll('"', '""')}"`].join(','),
  )

  return [header.join(','), ...csvRows].join('\n')
}

const ExportActions = ({ rows }) => {
  const hasRows = rows.length > 0
  const { t } = useTranslation()

  const exportCsv = () => {
    if (!hasRows) {
      return
    }

    downloadFile(toCsv(rows), 'transactions.csv', 'text/csv;charset=utf-8')
  }

  const exportJson = () => {
    if (!hasRows) {
      return
    }

    downloadFile(JSON.stringify(rows, null, 2), 'transactions.json', 'application/json')
  }

  return (
    <div className="export-actions">
      <button
        type="button"
        className="button-secondary"
        onClick={exportCsv}
        disabled={!hasRows}
        title={hasRows ? t('export.csvTitle') : t('export.noRows')}
      >
        {t('export.csv')}
      </button>
      <button
        type="button"
        className="button-secondary"
        onClick={exportJson}
        disabled={!hasRows}
        title={hasRows ? t('export.jsonTitle') : t('export.noRows')}
      >
        {t('export.json')}
      </button>
    </div>
  )
}

export default ExportActions
