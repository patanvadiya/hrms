import { computed } from 'vue'
import { storedList } from '../../shared/storage'
import { employees } from './data'

export const people = storedList('people-studio-employees', employees)

export const teams = computed(() => [
  ...new Set(['Design', 'Engineering', 'People', 'Marketing', 'Operations', ...people.value.map(person => person.team)]),
].sort())

export const departments = computed(() => teams.value.map(team => {
  const members = people.value.filter(person => person.team === team)
  return { team, count: members.length, active: members.filter(person => person.status === 'Active').length }
}))
