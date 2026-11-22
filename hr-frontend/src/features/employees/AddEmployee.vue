<script setup lang="ts">
import { ref } from 'vue'
import { Plus, X } from '@lucide/vue'
import { notice } from '../../shared/notice'
import { type Employee } from './data'
import { people, teams } from './store'

const props = defineProps<{ department?: string }>()
const dialog = ref<HTMLDialogElement>()
const form = ref({ name: '', role: '', team: 'Design', salary: 0 })

function openEmployee() {
  form.value = { name: '', role: '', team: props.department || 'Design', salary: 0 }
  dialog.value?.showModal()
}

function saveEmployee() {
  const { name, role, team, salary } = form.value
  if (!name.trim() || !role.trim()) return

  const employee: Employee = {
    id: 'EMP-' + crypto.randomUUID().slice(0, 8),
    name: name.trim(),
    role: role.trim(),
    team,
    salary,
    status: 'Active',
  }
  people.value.push(employee)
  dialog.value?.close()
  notice.value = employee.name + ' added to the directory.'
}
</script>

<template>
  <button class="primary" @click="openEmployee"><Plus :size="18"/> Add employee</button>
  <dialog ref="dialog" aria-labelledby="employee-dialog-title">
    <form @submit.prevent="saveEmployee">
      <div class="section-heading"><h2 id="employee-dialog-title">Add employee</h2><button type="button" class="icon-button" aria-label="Close" @click="dialog?.close()"><X :size="20"/></button></div>
      <label>Full name<input v-model.trim="form.name" required maxlength="100" autofocus/></label>
      <label>Job title<input v-model.trim="form.role" required maxlength="100"/></label>
      <label>Department<select v-model="form.team"><option v-for="team in teams" :key="team">{{ team }}</option></select></label>
      <label>Monthly salary (INR)<input v-model.number="form.salary" required type="number" min="0" max="100000000" step="1"/></label>
      <div class="actions"><button type="button" @click="dialog?.close()">Cancel</button><button class="primary">Save employee</button></div>
    </form>
  </dialog>
</template>
