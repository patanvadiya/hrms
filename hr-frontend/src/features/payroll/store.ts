import { computed } from 'vue'
import { people } from '../employees/store'

export const grossPayroll = computed(() => people.value.reduce((total, person) => total + person.salary, 0))

export function payslipLink(employeeId: string) {
  return '#payslip?' + new URLSearchParams({ employee: employeeId })
}
