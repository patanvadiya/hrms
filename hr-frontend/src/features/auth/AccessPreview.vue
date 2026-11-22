<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { computed } from 'vue'
import { accessPreviews, type AccessPage } from './previews'

const props = defineProps<{ page: AccessPage }>()
const accessPreview = computed(() => accessPreviews[props.page])
</script>

<template>
  <PageHeading :title="page"/>
  <section class="card panel access-preview">
    <template v-if="'title' in accessPreview">
      <h2>{{ accessPreview.title }}</h2>
      <p>{{ accessPreview.message }}</p>
      <a class="primary" href="#overview">Back to HR Dashboard</a>
    </template>
    <template v-else>
      <h2>Demo access</h2>
      <p>{{ accessPreview.message }}</p>
      <a class="primary" :href="accessPreview.link">{{ accessPreview.action }}</a>
    </template>
  </section>
</template>

<style scoped>
.access-preview .primary{margin-top:14px;border-radius:8px;padding:8px 12px;font-size:13px}
</style>
