<script lang="ts">
import { ref } from 'vue'

const period = ref('6 months')
</script>

<script setup lang="ts">
import PageHeading from '../../shared/PageHeading.vue'
import { computed } from 'vue'
import { money } from '../../shared/format'
import { departments } from '../employees/store'

const chart = [
  { label: 'June', value: 245000 }, { label: 'July', value: 265000 }, { label: 'Aug', value: 254000 },
  { label: 'Sept', value: 291000 }, { label: 'Oct', value: 308000 }, { label: 'Nov', value: 330000 },
]
const chartRows = computed(() => period.value === '3 months' ? chart.slice(-3) : chart)
</script>

<template>
  <PageHeading title="Reports" description="Review headcount by department and sample payroll history."/>
  <div class="panels">
    <section class="card panel">
      <div class="section-heading"><div><h2>Salary statistics</h2><p>Historical gross payroll · Sample data</p></div><select aria-label="Payroll history period" v-model="period"><option>6 months</option><option>3 months</option></select></div>
      <div class="chart" aria-label="Gross payroll by month">
        <div v-for="month in chartRows" :key="month.label" class="plot-column">
          <div class="bar-track"><div class="bar" :style="{height: (month.value / 360000 * 100) + '%'}"><span>{{ money(month.value) }}</span></div></div><span>{{ month.label }}</span>
        </div>
      </div>
    </section>
    <section class="card panel">
      <div class="section-heading"><div><h2>Headcount by department</h2><p>All employees in the directory</p></div></div>
      <div class="event-list"><div v-for="item in departments" :key="item.team" class="event department"><strong>{{ item.team }}</strong><span>{{ item.count }}</span></div></div>
    </section>
  </div>
</template>

<style scoped>
.panels{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:16px;margin-bottom:18px}
.chart{height:200px;margin-top:18px;display:flex;gap:5%;justify-content:space-around}
.plot-column{display:grid;grid-template-rows:minmax(0,1fr) auto;gap:8px;text-align:center;flex:1;min-width:0;color:var(--sub);font-size:11px}
.bar-track{display:flex;align-items:flex-end;background:#edf5f5;border-radius:8px 8px 3px 3px}
.bar{width:100%;background:linear-gradient(180deg,#82dac5,#118578);border-radius:8px 8px 3px 3px;display:grid;place-items:start center;padding-top:6px}
.bar span{color:#12382f;font-weight:700;font-size:clamp(8px,.9vw,11px)}
.department{justify-content:space-between}
@media(max-width:1050px){.panels{grid-template-columns:1fr}}
@media(max-width:720px){.chart{gap:3.5%}}
</style>
