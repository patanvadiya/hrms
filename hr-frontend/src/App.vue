<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import WorkspaceLayout from './app/WorkspaceLayout.vue'
import { resolveRoute } from './app/routes'

const hash = ref(location.hash)
const route = computed(() => resolveRoute(hash.value))

function updateRoute() {
  hash.value = location.hash
}

onMounted(() => window.addEventListener('hashchange', updateRoute))
onUnmounted(() => window.removeEventListener('hashchange', updateRoute))
</script>

<template>
  <component v-if="route.standalone" :is="route.component" :key="hash" v-bind="route.props"/>
  <WorkspaceLayout v-else :page="route.page" :route-key="hash">
    <component :is="route.component" :key="hash" v-bind="route.props"/>
  </WorkspaceLayout>
</template>
