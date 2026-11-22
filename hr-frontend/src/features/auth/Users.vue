<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { ArrowUpRight } from '@lucide/vue'
</script>

<template>
  <PageHeading title="Users"/>
  <section class="card panel">
    <div class="section-heading"><h2>Demo account</h2><a href="#sign-in">Demo access <ArrowUpRight :size="15" aria-hidden="true"/></a></div>
    <div class="event-list"><div class="event"><span class="avatar" aria-hidden="true">HR</span><div><strong>HR Admin</strong><small>People operations</small></div></div></div>
  </section>
</template>
