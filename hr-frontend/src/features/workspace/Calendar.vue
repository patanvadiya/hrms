<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { computed } from 'vue'
import { CalendarDays } from '@lucide/vue'
import { dateLabel } from '../../shared/format'
import { calendar } from './calendar'

const props = defineProps<{ page: 'Calendar' | 'Events' | 'Holidays' }>()
const calendarEntries = computed(() => {
  if (props.page === 'Holidays') return calendar.filter(event => event.kind === 'Holiday')
  if (props.page === 'Events') return calendar.filter(event => event.kind === 'Event')
  return calendar
})
</script>

<template>
  <PageHeading :title="page"/>
  <section class="card panel">
    <h2>{{ page === 'Calendar' ? 'Events and holidays' : 'Scheduled dates' }}</h2>
    <div class="event-list"><div v-for="event in calendarEntries" :key="event.title" class="event"><span class="tile-icon"><CalendarDays :size="18"/></span><div><strong>{{ event.title }}</strong><small>{{ dateLabel(event.date) }} · {{ event.kind }}</small></div></div></div>
  </section>
</template>
