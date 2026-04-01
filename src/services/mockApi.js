import { initialTransactions } from '../data/transactions'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchTransactions = async () => {
  await delay(650)
  return initialTransactions
}
