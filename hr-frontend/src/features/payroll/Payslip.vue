<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { computed, ref } from 'vue'
import { money } from '../../shared/format'
import { people } from '../employees/store'

const props = defineProps<{ initialEmployee: string }>()
const employeeId = ref(people.value.find(person => person.id === props.initialEmployee)?.id ?? people.value[0]?.id ?? '')
const payslipEmployee = computed(() => people.value.find(person => person.id === employeeId.value))
</script>

<template>
  <PageHeading title="Payslip"/>
  <section class="card panel">
    <div class="section-heading">
      <div><h2>Monthly payslip preview</h2><p>Gross salary from the employee register</p></div>
      <a href="#employee-salary">Employee Salary</a>
    </div>
    <div v-if="payslipEmployee" class="payslip">
      <div class="payslip-picker">
        <label for="payslip-employee">Employee</label>
        <select id="payslip-employee" v-model="employeeId">
          <option v-for="person in people" :key="person.id" :value="person.id">{{ person.name }} · {{ person.id }}</option>
        </select>
      </div>
      <dl class="department-metrics">
        <div><dt>Employee ID</dt><dd>{{ payslipEmployee.id }}</dd></div>
        <div><dt>Department</dt><dd>{{ payslipEmployee.team }}</dd></div>
        <div><dt>Monthly gross pay</dt><dd>{{ money(payslipEmployee.salary) }}</dd></div>
      </dl>
    </div>
    <p v-else>Add an employee to preview a payslip.</p>
  </section>
</template>

<style scoped>
.payslip{margin-top:16px}
.payslip-picker{display:grid;justify-items:start;gap:6px;color:var(--sub);font-size:13px}
.payslip select{max-width:100%}
.payslip .department-metrics{grid-template-columns:repeat(auto-fit,minmax(130px,1fr));max-width:570px;margin-bottom:0}
</style>
