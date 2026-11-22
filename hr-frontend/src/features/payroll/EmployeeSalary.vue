<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { ArrowDownToLine } from '@lucide/vue'
import { money } from '../../shared/format'
import EmployeeIdentity from '../employees/EmployeeIdentity.vue'
import { people } from '../employees/store'
import { grossPayroll, payslipLink } from './store'

function downloadPayroll() {
  const escape = (value: string) => '"' + value.replaceAll('"','""') + '"'
  const rows = people.value.map(person => [person.id,person.name,person.team,String(person.salary)].map(value => escape(/^[=+@\-\t\r]/.test(value) ? "'" + value : value)).join(','))
  const url = URL.createObjectURL(new Blob([['Employee ID,Name,Department,Monthly salary (INR)',...rows].join('\r\n')],{type:'text/csv'}))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'monthly-payroll.csv'
  anchor.click()
  setTimeout(() => URL.revokeObjectURL(url),1000)
}
</script>

<template>
  <PageHeading title="Employee Salary" description="Review and export gross monthly salary amounts.">
    <button class="primary" @click="downloadPayroll"><ArrowDownToLine :size="18"/> Export CSV</button>
  </PageHeading>
  <section class="card table-card">
    <div class="section-heading">
      <div><h2>Salary register</h2><p>{{ money(grossPayroll) }} total per month</p></div>
      <a href="#reports">Payroll and headcount</a>
    </div>
    <div class="table-scroll">
      <table>
        <thead><tr><th scope="col">Employee</th><th scope="col">Department</th><th scope="col">Monthly salary</th><th scope="col">Payslip</th></tr></thead>
        <tbody>
          <tr v-for="person in people" :key="person.id">
          <td><EmployeeIdentity :name="person.name" :detail="person.role"/></td>
            <td>{{ person.team }}</td>
            <td>{{ money(person.salary) }}</td>
            <td><a class="table-link" :href="payslipLink(person.id)" :aria-label="'View payslip for ' + person.name">View payslip</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.table-link{color:var(--teal);font-weight:650}
.table-link:hover{text-decoration:underline}
</style>
