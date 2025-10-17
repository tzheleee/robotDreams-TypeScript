type TransactionType = 'debit' | 'credit' | 'refund'

type Transaction = {
    id: number,
    type: TransactionType,
    amount: number,
    createdAt: Date
}

type TransactionData = Omit<Transaction, 'id'|'createdAt'>

type SummaryItem = {count: number, totalAmount: number}
type TransctionSummary = Record<TransactionType, SummaryItem>

const transactions: Transaction[] = [
    { id: 1, type: 'debit', amount: 120.5, createdAt: new Date('2025-10-01') },
    { id: 2, type: 'credit', amount: 250.0, createdAt: new Date('2025-10-02') },
    { id: 3, type: 'refund', amount: 75.25, createdAt: new Date('2025-10-03') },
    { id: 4, type: 'debit', amount: 300.99, createdAt: new Date('2025-10-05') },
    { id: 5, type: 'credit', amount: 540.0, createdAt: new Date('2025-10-06') },
    { id: 6, type: 'debit', amount: 89.9, createdAt: new Date('2025-10-07') },
    { id: 7, type: 'refund', amount: 45.5, createdAt: new Date('2025-10-09') }
]