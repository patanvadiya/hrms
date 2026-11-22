<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { ArrowUpRight, Building2 } from '@lucide/vue'
import { departments } from './store'

function departmentLink(team: string) {
  return '#employees?' + new URLSearchParams({ department: team })
}
</script>

<template>
  <PageHeading title="Departments"/>
  <section aria-label="Department directory" class="department-grid">
    <article v-for="item in departments" :key="item.team" class="card panel department-card">
      <div class="department-heading"><span class="tile-icon"><Building2 :size="18" aria-hidden="true"/></span><h2>{{ item.team }}</h2></div>
      <dl class="department-metrics">
        <div><dt>Employees</dt><dd>{{ item.count }}</dd></div>
        <div><dt>Active</dt><dd>{{ item.active }}</dd></div>
        <div><dt>On leave</dt><dd>{{ item.count - item.active }}</dd></div>
      </dl>
      <a :href="departmentLink(item.team)" :aria-label="'View employees in ' + item.team">View employees <ArrowUpRight :size="15" aria-hidden="true"/></a>
    </article>
  </section>
</template>

<style scoped>
.department-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:16px}
.department-heading{display:flex;align-items:center;gap:10px}
.department-heading .tile-icon{color:var(--teal)}
.department-card a{display:flex;align-items:center;justify-content:space-between;gap:6px;padding-top:12px;border-top:1px solid var(--line);color:var(--teal);font-size:13px;font-weight:650}
.department-card a:hover{text-decoration:underline}
</style>
