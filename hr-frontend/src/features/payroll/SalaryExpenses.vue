<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { money } from '../../shared/format'
import { people } from '../employees/store'
import { grossPayroll } from './store'
</script>

<template>
  <PageHeading title="Accounts"/>
  <section class="card panel">
    <div class="section-heading">
      <div><h2>Monthly salary expenses</h2><p>Gross payroll for {{ people.length }} employees</p></div>
      <strong>{{ money(grossPayroll) }}</strong>
    </div>
    <p><a href="#employee-salary">Open salary register</a></p>
  </section>
</template>
