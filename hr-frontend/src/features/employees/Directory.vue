<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { computed, ref } from 'vue'
import { Search } from '@lucide/vue'
import { matchesSearch } from '../../shared/format'
import AddEmployee from './AddEmployee.vue'
import EmployeeIdentity from './EmployeeIdentity.vue'
import { people, teams } from './store'

const props = defineProps<{ initialDepartment: string }>()
const department = ref(teams.value.includes(props.initialDepartment) ? props.initialDepartment : '')
const query = ref('')
const visiblePeople = computed(() => people.value.filter(person =>
  (!department.value || person.team === department.value) &&
  matchesSearch(query.value, person.name, person.role, person.team, person.id),
))
</script>

<template>
  <PageHeading title="All employees" description="Find and add people in your employee directory.">
    <AddEmployee :department="department"/>
  </PageHeading>
  <section class="card table-card">
    <div class="section-heading"><div><h2>Employee directory</h2><p>{{ visiblePeople.length }} of {{ people.length }} employees</p></div></div>
    <div class="filters">
      <label class="search"><Search :size="16"/><input v-model="query" type="search" aria-label="Search employees" placeholder="Search employees"/></label>
      <select v-model="department" aria-label="Filter by department"><option value="">All departments</option><option v-for="team in teams" :key="team">{{ team }}</option></select>
    </div>
    <div class="table-scroll">
      <table>
        <thead><tr><th scope="col">Employee</th><th scope="col">Employee ID</th><th scope="col">Department</th><th scope="col">Status</th></tr></thead>
        <tbody>
          <tr v-for="person in visiblePeople" :key="person.id">
          <td><EmployeeIdentity :name="person.name" :detail="person.role"/></td>
            <td>{{ person.id }}</td>
            <td>{{ person.team }}</td>
            <td><span class="badge" :class="{ muted: person.status !== 'Active' }">{{ person.status }}</span></td>
          </tr>
          <tr v-if="!visiblePeople.length"><td colspan="4">No employees match your filters.</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
