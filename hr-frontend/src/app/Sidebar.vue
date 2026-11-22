<script lang="ts">
import { ref } from 'vue'

const expanded = ref(new Set<string>())
</script>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { ChevronDown, Users } from '@lucide/vue'
import { pendingLeave } from '../features/leave/store'
import { navigation } from './navigation'
import { slug, type Page } from './routes'

const props = defineProps<{ page: Page; mobile: boolean; routeKey: string }>()
const emit = defineEmits<{ navigate: [] }>()
const activeGroup = computed(() => {
  if (props.page === 'Accounts') return 'Accounts'
  if (props.page === 'Reports') return 'Report'
  return navigation.find(item => item.links?.some(link => link.page === props.page))?.title
})

watch(() => props.routeKey, () => {
  if (activeGroup.value) expanded.value.add(activeGroup.value)
}, { immediate: true })

function toggleGroup(title: string) {
  if (expanded.value.has(title)) expanded.value.delete(title)
  else expanded.value.add(title)
}
</script>

<template>
  <aside id="hr-sidebar" class="sidebar" :class="{open: mobile}">
    <a class="brand" href="#overview"><span class="brand-mark"><Users :size="19"/></span><span>People Studio<small>HR workspace</small></span></a>
    <nav aria-label="HR navigation">
      <div v-for="item in navigation" :key="item.title" class="nav-item">
        <template v-if="item.links">
          <button type="button" class="nav-toggle" :class="{ 'active-group': activeGroup === item.title }"
            :aria-expanded="expanded.has(item.title)" :aria-controls="'nav-' + item.title.toLowerCase()" @click="toggleGroup(item.title)">
            <component :is="item.icon" :size="18" class="nav-icon" aria-hidden="true"/>{{ item.title }}<ChevronDown class="nav-chevron" :size="15" aria-hidden="true"/>
          </button>
          <ul v-show="expanded.has(item.title)" :id="'nav-' + item.title.toLowerCase()" class="nav-submenu">
            <li v-for="link in item.links" :key="link.page">
              <a :href="slug(link.page)" :aria-current="page === link.page ? 'page' : undefined" @click="emit('navigate')">
                <span class="nav-dash" aria-hidden="true">–</span>
                {{ link.label }}<span v-if="link.page === 'Leave requests' && pendingLeave.length" class="count">{{ pendingLeave.length }}</span>
              </a>
            </li>
          </ul>
        </template>
        <a v-else-if="item.page" class="nav-link" :href="slug(item.page)" :aria-current="page === item.page || (item.page === 'Events' && page === 'Calendar') ? 'page' : undefined" @click="emit('navigate')">
          <component :is="item.icon" :size="18" class="nav-icon" aria-hidden="true"/>{{ item.title }}
        </a>
      </div>
    </nav>
    <div class="sidebar-footer"><span class="avatar">HR</span><span>HR Admin<small>People operations</small></span></div>
  </aside>
</template>
