<script setup lang="ts">
import { computed } from 'vue'
import PageHeading from '../../shared/PageHeading.vue'
import { dateLabel, money } from '../../shared/format'
import { expenses, invoices, payments, type FinancePage } from './data'

const props = defineProps<{ page: FinancePage }>()
const views = {
  Payments: { rows: payments, partyLabel: 'Payee', related: { href: '#accounts', label: 'Payroll expenses' } },
  Expenses: { rows: expenses, partyLabel: 'Category', related: { href: '#expense-report', label: 'Expense Report' } },
  Invoices: { rows: invoices, partyLabel: 'Supplier', related: { href: '#invoice-report', label: 'Invoice Report' } },
  'Expense Report': { rows: expenses, partyLabel: 'Category', related: { href: '#expenses', label: 'View expenses' } },
  'Invoice Report': { rows: invoices, partyLabel: 'Supplier', related: { href: '#invoices', label: 'View invoices' } },
}
const view = computed(() => views[props.page])
const total = computed(() => view.value.rows.reduce((sum, row) => sum + row.amount, 0))
const totalsByStatus = computed(() => {
  const totals = new Map<string, number>()
  for (const { status, amount } of view.value.rows) totals.set(status, (totals.get(status) ?? 0) + amount)
  return [...totals]
})
</script>

<template>
  <PageHeading :title="page"/>
  <section class="card table-card">
    <div class="section-heading">
      <div><h2>{{ page.endsWith('Report') ? 'Status breakdown' : 'November 2026 records' }}</h2><p>Sample data · {{ money(total) }} total</p></div>
      <a :href="view.related.href">{{ view.related.label }}</a>
    </div>
    <div v-if="page.endsWith('Report')" class="table-scroll">
      <table>
        <thead><tr><th scope="col">Status</th><th scope="col">Amount</th></tr></thead>
        <tbody><tr v-for="[status, amount] in totalsByStatus" :key="status"><td>{{ status }}</td><td>{{ money(amount) }}</td></tr></tbody>
      </table>
    </div>
    <div v-else class="table-scroll">
      <table>
        <thead><tr><th scope="col">Reference</th><th scope="col">Date</th><th scope="col">{{ view.partyLabel }}</th><th scope="col">Amount</th><th scope="col">Status</th></tr></thead>
        <tbody>
          <tr v-for="row in view.rows" :key="row.id">
            <td>{{ row.id }}</td><td>{{ dateLabel(row.date) }}</td><td>{{ row.party }}</td><td>{{ money(row.amount) }}</td>
            <td><span class="badge" :class="{ muted: row.status !== 'Paid' && row.status !== 'Approved' }">{{ row.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
