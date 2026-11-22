<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { computed, ref } from 'vue'
import { Search } from '@lucide/vue'
import { dateLabel, matchesSearch } from '../../shared/format'
import { decide, leave, pendingLeave } from './store'

const query = ref('')
const leaveStatus = ref('')
const visibleLeave = computed(() => leave.value.filter(request =>
  (!leaveStatus.value || request.status === leaveStatus.value) &&
  matchesSearch(query.value, request.name, request.type),
))
</script>

<template>
  <PageHeading title="Leave requests"/>
  <section class="card table-card">
    <div class="section-heading"><div><h2>Leave request queue</h2><p>{{ pendingLeave.length }} pending</p></div></div>
    <div class="filters">
      <label class="search"><Search :size="16"/><input v-model="query" type="search" aria-label="Search leave requests" placeholder="Search leave requests"/></label>
      <select v-model="leaveStatus" aria-label="Filter by leave status"><option value="">All statuses</option><option>Pending</option><option>Approved</option><option>Declined</option></select>
    </div>
    <div class="table-scroll"><table>
      <thead><tr><th scope="col">Employee</th><th scope="col">Leave type</th><th scope="col">Date</th><th scope="col">Status</th><th scope="col">Action</th></tr></thead>
      <tbody><tr v-for="request in visibleLeave" :key="request.id"><td><strong>{{ request.name }}</strong></td><td>{{ request.type }}</td><td>{{ dateLabel(request.date) }}</td>
        <td><span class="badge" :class="{muted:request.status === 'Pending', 'badge-negative':request.status === 'Declined'}">{{ request.status }}</span></td>
        <td><div v-if="request.status === 'Pending'" class="actions"><button :aria-label="'Approve leave for ' + request.name" @click="decide(request,'Approved')">Approve</button><button :aria-label="'Decline leave for ' + request.name" @click="decide(request,'Declined')">Decline</button></div><span v-else>Reviewed</span></td></tr>
        <tr v-if="!visibleLeave.length"><td colspan="5">No leave requests match your filters.</td></tr></tbody>
    </table></div>
  </section>
</template>
