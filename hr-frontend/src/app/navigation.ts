import { Briefcase, CalendarDays, ChartColumn, ClipboardList, CreditCard, Gauge, List, MessageCircle, Shield, UserRound, Users } from '@lucide/vue'
import { accessPages, type Page } from './routes'

export const navigation = [
  { title: 'HR Dashboard', icon: Gauge, page: 'Overview' },
  { title: 'Holidays', icon: List, page: 'Holidays' },
  { title: 'Events', icon: CalendarDays, page: 'Events' },
  { title: 'Activities', icon: ClipboardList, page: 'Activities' },
  { title: 'HR Social', icon: MessageCircle, page: 'HR Social' },
  { title: 'Employees', icon: Users, links: [
    { label: 'All Employees', page: 'Employees' },
    { label: 'Leave Requests', page: 'Leave requests' },
    { label: 'Attendance', page: 'Attendance' },
    { label: 'Departments', page: 'Departments' },
  ] },
  { title: 'Accounts', icon: Briefcase, links: [
    { label: 'Payments', page: 'Payments' },
    { label: 'Expenses', page: 'Expenses' },
    { label: 'Invoices', page: 'Invoices' },
  ] },
  { title: 'Payroll', icon: CreditCard, links: [
    { label: 'Payslip', page: 'Payslip' },
    { label: 'Employee Salary', page: 'Employee Salary' },
  ] },
  { title: 'Report', icon: ChartColumn, links: [
    { label: 'Expense Report', page: 'Expense Report' },
    { label: 'Invoice Report', page: 'Invoice Report' },
  ] },
  { title: 'Users', icon: UserRound, page: 'Users' },
  { title: 'Authentication', icon: Shield, links: [
    { label: 'Sign In', page: 'Sign In' },
    { label: 'Sign Up', page: 'Sign Up' },
    ...accessPages.map(page => ({ label: page, page })),
  ] },
] satisfies Array<{ title: string; icon: typeof Gauge; page?: Page; links?: Array<{ label: string; page: Page }> }>
