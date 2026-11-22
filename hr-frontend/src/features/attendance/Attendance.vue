<script lang="ts">
import { ref } from 'vue'
import { attendance } from './data'

const attendanceDate = ref(attendance.at(-1)?.date ?? '')
</script>

<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { computed } from 'vue'
import { Search } from '@lucide/vue'
import { matchesSearch } from '../../shared/format'
import EmployeeIdentity from '../employees/EmployeeIdentity.vue'
import { people, teams } from '../employees/store'

const props = defineProps<{ initialDepartment: string }>()
const query = ref('')
const department = ref(teams.value.includes(props.initialDepartment) ? props.initialDepartment : '')
const attendanceStatuses = ['Present', 'On leave', 'Absent', 'Unrecorded'] as const

const dailyAttendance = computed(() => {
  const records = new Map(attendance.filter(record => record.date === attendanceDate.value).map(record => [record.employeeId, record]))
  return people.value
    .filter(person => (!department.value || person.team === department.value) &&
      matchesSearch(query.value, person.name, person.role, person.team, person.id))
    .map(person => {
      const record = records.get(person.id)
      return { person, record, status: record?.status ?? 'Unrecorded' }
    })
})

const attendanceSummary = computed(() => attendanceStatuses.map(status => ({
  status,
  count: dailyAttendance.value.filter(row => row.status === status).length,
})))
</script>

<template>
  <PageHeading title="Attendance"/>
  <section class="card table-card">
    <div class="section-heading"><div><h2>Daily attendance</h2><p>Sample records · Check-in and check-out in IST</p></div></div>
    <div class="filters">
      <label class="date-filter">Date <input v-model="attendanceDate" type="date"/></label>
      <label class="search"><Search :size="16"/><input v-model="query" type="search" aria-label="Search attendance" placeholder="Search employees"/></label>
      <select v-model="department" aria-label="Filter attendance by department"><option value="">All departments</option><option v-for="team in teams" :key="team">{{ team }}</option></select>
    </div>
    <dl v-if="attendanceDate" class="attendance-summary">
      <div v-for="item in attendanceSummary" :key="item.status">
        <dt>{{ item.status }}</dt><dd>{{ item.count }}</dd>
      </div>
    </dl>
    <div class="table-scroll"><table>
      <thead><tr><th scope="col">Employee</th><th scope="col">Department</th><th scope="col">Check-in</th><th scope="col">Check-out</th><th scope="col">Status</th></tr></thead>
      <tbody>
        <tr v-for="{ person, record, status } in (attendanceDate ? dailyAttendance : [])" :key="person.id">
          <td><EmployeeIdentity :name="person.name" :detail="person.id"/></td>
          <td>{{ person.team }}</td><td>{{ record?.checkIn ?? '—' }}</td><td>{{ record?.checkOut ?? '—' }}</td>
          <td><span class="badge" :class="{muted:status === 'On leave', 'badge-negative':status === 'Absent', 'badge-neutral':status === 'Unrecorded'}">{{ status }}</span></td>
        </tr>
        <tr v-if="!attendanceDate"><td colspan="5">Choose a date to view attendance.</td></tr>
        <tr v-else-if="!dailyAttendance.length"><td colspan="5">No employees match your filters.</td></tr>
      </tbody>
    </table></div>
  </section>
</template>

<style scoped>
.date-filter{display:inline-flex;align-items:center;gap:8px;color:var(--sub);font-size:13px}
.attendance-summary{display:grid;grid-template-columns:repeat(auto-fit,minmax(105px,1fr));gap:10px;margin:0;padding:0 18px 17px}
.attendance-summary div{padding:10px 12px;border:1px solid var(--line);border-radius:8px;background:#f8f9fd}
.attendance-summary dt{color:var(--sub);font-size:12px}
.attendance-summary dd{margin:4px 0 0;font-size:20px;font-weight:700}
</style>
