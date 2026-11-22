<script setup lang="ts">
import { ref, watch } from 'vue'
import { Menu } from '@lucide/vue'
import Sidebar from './Sidebar.vue'
import type { Page } from './routes'
import './workspace.css'

const props = defineProps<{ page: Page; routeKey: string }>()
const mobile = ref(false)
watch(() => props.routeKey, () => { mobile.value = false })
</script>

<template>
  <div class="shell">
    <Sidebar :page="page" :mobile="mobile" :route-key="routeKey" @navigate="mobile = false"/>
    <main>
      <header class="topbar">
        <button class="icon-button menu-toggle" aria-label="Toggle navigation" :aria-expanded="mobile" aria-controls="hr-sidebar" @click="mobile = !mobile"><Menu :size="20"/></button>
        <span>Workspace <span class="separator">/</span> <strong>{{ page === 'Employees' ? 'All employees' : page }}</strong></span>
        <span class="sample"><span></span>Demo workspace</span>
      </header>
      <div class="content"><slot/></div>
    </main>
  </div>
</template>
