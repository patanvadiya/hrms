<script setup lang="ts">
import { initials } from '../../shared/format'

defineProps<{ name: string; detail: string }>()
</script>

<template>
  <div class="person">
    <span class="avatar" aria-hidden="true">{{ initials(name) }}</span>
    <div><strong>{{ name }}</strong><small>{{ detail }}</small></div>
  </div>
</template>
