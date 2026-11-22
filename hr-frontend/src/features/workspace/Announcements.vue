<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { MessageCircle } from '@lucide/vue'
import { dateLabel } from '../../shared/format'

const announcements = [
  { title: 'New hire orientation', message: 'The People team will introduce new hires to the HR workspace and answer onboarding questions.', date: '2026-11-20' },
  { title: 'Holiday calendar', message: 'Check the holiday schedule when planning team coverage and time off.', date: '2026-11-19' },
]
</script>

<template>
  <PageHeading title="HR Social"/>
  <section class="card panel">
    <h2>Sample HR announcements</h2>
    <div class="event-list">
      <article v-for="post in announcements" :key="post.title" class="event">
        <span class="tile-icon"><MessageCircle :size="18" aria-hidden="true"/></span>
        <div><strong>{{ post.title }}</strong><p>{{ post.message }}</p><small>{{ dateLabel(post.date) }}</small></div>
      </article>
    </div>
  </section>
</template>
