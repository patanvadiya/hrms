<script setup lang="ts">
import { X } from '@lucide/vue'
import { notice } from './notice'

defineProps<{ title: string; description?: string }>()
</script>

<template>
  <div class="page-heading">
    <div><h1>{{ title }}</h1><p v-if="description">{{ description }}</p></div>
    <slot/>
  </div>
  <p v-if="notice" class="notice" role="status">
    {{ notice }}<button class="icon-button" aria-label="Dismiss message" @click="notice = ''"><X :size="17"/></button>
  </p>
</template>
