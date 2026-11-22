import type { Component } from 'vue'
import AccessPreview from '../features/auth/AccessPreview.vue'
import Login from '../features/auth/Login.vue'
import Signup from '../features/auth/Signup.vue'
import Users from '../features/auth/Users.vue'
import Attendance from '../features/attendance/Attendance.vue'
import Overview from '../features/dashboard/Overview.vue'
import Departments from '../features/employees/Departments.vue'
import Directory from '../features/employees/Directory.vue'
import FinanceRecords from '../features/finance/FinanceRecords.vue'
import LeaveRequests from '../features/leave/LeaveRequests.vue'
import EmployeeSalary from '../features/payroll/EmployeeSalary.vue'
import PayrollReport from '../features/payroll/PayrollReport.vue'
import Payslip from '../features/payroll/Payslip.vue'
import SalaryExpenses from '../features/payroll/SalaryExpenses.vue'
import Activities from '../features/workspace/Activities.vue'
import Announcements from '../features/workspace/Announcements.vue'
import Calendar from '../features/workspace/Calendar.vue'
import { accessPreviews, type AccessPage } from '../features/auth/previews'
import { financePages } from '../features/finance/data'

interface RouteDefinition {
  component: Component
  props?: (query: URLSearchParams) => Record<string, string>
  standalone?: boolean
}

const departmentProps = (query: URLSearchParams) => ({ initialDepartment: query.get('department') ?? '' })

const staticRoutes = {
  Overview: { component: Overview },
  Holidays: { component: Calendar, props: () => ({ page: 'Holidays' }) },
  Events: { component: Calendar, props: () => ({ page: 'Events' }) },
  Activities: { component: Activities },
  'HR Social': { component: Announcements },
  Employees: { component: Directory, props: departmentProps },
  'Leave requests': { component: LeaveRequests },
  Attendance: { component: Attendance, props: departmentProps },
  Departments: { component: Departments },
  Calendar: { component: Calendar, props: () => ({ page: 'Calendar' }) },
  Accounts: { component: SalaryExpenses },
  Payslip: { component: Payslip, props: query => ({ initialEmployee: query.get('employee') ?? '' }) },
  'Employee Salary': { component: EmployeeSalary },
  Reports: { component: PayrollReport },
  Users: { component: Users },
  'Sign In': { component: Login, standalone: true },
  'Sign Up': { component: Signup, standalone: true },
} satisfies Record<string, RouteDefinition>

export const accessPages = Object.keys(accessPreviews) as AccessPage[]
export type Page = keyof typeof staticRoutes | typeof financePages[number] | AccessPage

export function slug(page: Page) {
  return '#' + page.toLowerCase().replaceAll(' ', '-')
}

const routes = new Map<string, RouteDefinition & { page: Page }>()
for (const page of Object.keys(staticRoutes) as (keyof typeof staticRoutes)[]) {
  routes.set(slug(page), { page, ...staticRoutes[page] })
}
for (const page of financePages) routes.set(slug(page), { page, component: FinanceRecords, props: () => ({ page }) })
for (const page of accessPages) routes.set(slug(page), { page, component: AccessPreview, props: () => ({ page }) })

const aliases = new Map([['#payroll', '#employee-salary'], ['#authentication', '#sign-in']])
const fallback: RouteDefinition & { page: Page } = { page: 'Overview', ...staticRoutes.Overview }

export function resolveRoute(hash: string) {
  const [path, query] = hash.split('?')
  const { page, component, standalone, props } = routes.get(aliases.get(path) ?? path) ?? fallback
  return { page, component, standalone, props: props?.(new URLSearchParams(query)) ?? {} }
}
