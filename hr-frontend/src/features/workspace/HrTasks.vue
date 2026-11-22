<script setup lang="ts">
import { ref, watch } from 'vue'

const tasks = [
  { id: 'intro', label: 'New employee introduction', detail: '24 Nov · Onboarding' },
  { id: 'payroll', label: 'Review the payroll register', detail: '25 Nov · Payroll' },
  { id: 'welcome', label: 'Prepare a welcome kit', detail: '27 Nov · Onboarding' },
  { id: 'leave', label: 'Review pending leave requests', detail: '30 Nov · People operations' },
]
const completed = ref<string[]>([])
try {
  const saved: unknown = JSON.parse(localStorage.getItem('people-studio-tasks') ?? '[]')
  if (Array.isArray(saved)) completed.value = saved.filter((id): id is string => typeof id === 'string' && tasks.some(task => task.id === id))
} catch { /* Start with an empty checklist if the saved value cannot be read. */ }
watch(completed, value => localStorage.setItem('people-studio-tasks', JSON.stringify(value)))
</script>

<template>
  <section class="card dashboard-panel">
    <div class="section-heading"><h2>To-do list</h2><span class="badge">{{ completed.length }}/{{ tasks.length }} done</span></div>
    <label v-for="task in tasks" :key="task.id" class="task-row">
      <input v-model="completed" type="checkbox" :value="task.id"/>
      <span><strong>{{ task.label }}</strong><small>{{ task.detail }}</small></span>
    </label>
  </section>
</template>

<style scoped>
.task-row{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);font-size:13px;cursor:pointer}
.task-row:first-of-type{margin-top:8px}
.task-row:last-child{border-bottom:0}
.task-row input{accent-color:var(--teal);width:16px;height:16px;margin:1px 0 0}
.task-row input:checked + span strong{text-decoration:line-through;color:var(--sub)}
</style>
