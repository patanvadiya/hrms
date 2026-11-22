export const financePages = ['Payments', 'Expenses', 'Invoices', 'Expense Report', 'Invoice Report'] as const
export type FinancePage = typeof financePages[number]

export const payments = [
  { id: 'PAY-001', date: '2026-11-10', party: 'Office Supplies Co.', amount: 4800, status: 'Paid' },
  { id: 'PAY-002', date: '2026-11-16', party: 'Studio Training', amount: 12000, status: 'Scheduled' },
]
export const expenses = [
  { id: 'EXP-001', date: '2026-11-10', party: 'Office supplies', amount: 4800, status: 'Approved' },
  { id: 'EXP-002', date: '2026-11-16', party: 'Training', amount: 12000, status: 'Approved' },
  { id: 'EXP-003', date: '2026-11-19', party: 'Travel', amount: 6200, status: 'Pending' },
]
export const invoices = [
  { id: 'INV-001', date: '2026-11-10', party: 'Office Supplies Co.', amount: 4800, status: 'Paid' },
  { id: 'INV-002', date: '2026-11-16', party: 'Studio Training', amount: 12000, status: 'Open' },
  { id: 'INV-003', date: '2026-11-19', party: 'Office Services', amount: 8600, status: 'Open' },
]
