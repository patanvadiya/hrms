<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, Banknote, ChartNoAxesCombined, Clock3, Users } from '@lucide/vue'
import PageHeading from '../../shared/PageHeading.vue'
import { money } from '../../shared/format'
import AddEmployee from '../employees/AddEmployee.vue'
import { people } from '../employees/store'
import { pendingLeave } from '../leave/store'
import { grossPayroll } from '../payroll/store'
import HrTasks from '../workspace/HrTasks.vue'
import DashboardChart from './DashboardChart.vue'
import './dashboard.css'

const metrics = computed(() => [
  {label:'Total employees',value:people.value.length,icon:Users,to:'#employees'},
  {label:'Pending leave',value:pendingLeave.value.length,icon:Clock3,to:'#leave-requests'},
  {label:'Monthly payroll',value:money(grossPayroll.value),icon:Banknote,to:'#payroll'},
  {label:'Average salary',value:money(people.value.length ? grossPayroll.value / people.value.length : 0),icon:ChartNoAxesCombined,to:'#payroll'},
])

const channels = [{name:'Design',share:48,color:'#5855db'},{name:'Dev',share:34,color:'#148c83'},{name:'SEO',share:18,color:'#edaa67'}]
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const series = [
  {name:'Engineering',color:'#5855db',values:[116,122,109,132,127,142,131,148,155,146,156,170]},
  {name:'Design',color:'#148c83',values:[65,70,68,66,74,79,74,84,87,91,95,103]},
  {name:'Operations',color:'#edaa67',values:[40,48,43,55,50,52,58,61,57,62,65,70]},
]
const monthCount = ref(12)
const chartMonths = computed(() => months.slice(-monthCount.value))
const salarySeries = computed(() => series.map(unit => ({
  label: unit.name, color: unit.color, values: unit.values.slice(-monthCount.value),
})))
const incomeSeries = [{label:'Revenue share', color:channels.map(channel => channel.color), values:channels.map(channel => channel.share)}]
const performance = [
  {name:'Priya Shah',role:'Product Designer',rating:'Excellent',score:94},
  {name:'Rohan Mehta',role:'Backend Engineer',rating:'Good',score:86},
  {name:'Aisha Khan',role:'People Partner',rating:'Good',score:83},
  {name:'Axay Patanvadiya-2',role:'Growth Lead',rating:'Developing',score:72},
]
const active = computed(() => people.value.filter(person => person.status === 'Active').length)
const structureSeries = computed(() => [{label:'Employees', color:['#5855db','#80c9b7'], values:[active.value, people.value.length - active.value]}])
</script>

<template>
  <PageHeading title="People overview" description="Track your workforce, leave requests, and payroll in one place.">
    <AddEmployee/>
  </PageHeading>
  <div class="dashboard-grid">
    <section class="card dashboard-panel kpis" aria-label="HR summary">
      <a v-for="metric in metrics" :key="metric.label" class="metric-row" :href="metric.to">
        <span class="tile-icon"><component :is="metric.icon" :size="17"/></span>
        <span><small>{{ metric.label }}</small><strong>{{ metric.value }}</strong></span>
        <ArrowUpRight :size="15" class="metric-arrow"/>
      </a>
    </section>

    <section class="card dashboard-panel income">
      <div><h2>Income analysis</h2><p>Sample revenue mix</p></div>
      <DashboardChart kind="doughnut" label="Revenue share by service" :labels="channels.map(channel => channel.name)" :series="incomeSeries" unit="%"/>
    </section>

    <section class="card dashboard-panel salary-bars">
      <div class="section-heading"><div><h2>Salary statistics</h2><p>Sample monthly payroll · ₹ thousands</p></div>
        <select v-model.number="monthCount" aria-label="Salary reporting period"><option :value="12">12 months</option><option :value="6">6 months</option></select>
      </div>
      <DashboardChart kind="bar" label="Monthly payroll by unit" :labels="chartMonths" :series="salarySeries" unit="INR"/>
    </section>

    <section class="card dashboard-panel salary-units">
      <div><h2>Total salary by unit</h2><p>Sample payroll trends · ₹ thousands</p></div>
      <DashboardChart kind="line" label="Monthly salary trends by unit" :labels="chartMonths" :series="salarySeries" unit="INR"/>
    </section>

    <HrTasks/>

    <section class="card dashboard-panel performance">
      <div class="section-heading"><div><h2>Employee performance</h2><p>Sample review scores</p></div><a href="#employees">Directory <ArrowUpRight :size="15"/></a></div>
      <div class="table-scroll"><table><thead><tr><th scope="col">Employee</th><th scope="col">Role</th><th scope="col">Rating</th><th scope="col">Score</th></tr></thead>
        <tbody><tr v-for="person in performance" :key="person.name">
          <td><div class="person"><span class="avatar">{{ person.name.split(' ').map(name => name[0]).join('') }}</span><strong>{{ person.name }}</strong></div></td>
          <td>{{ person.role }}</td><td><span class="badge" :class="{muted:person.rating === 'Developing'}">{{ person.rating }}</span></td><td>{{ person.score }}/100</td>
        </tr></tbody></table></div>
    </section>

    <section class="card dashboard-panel structure">
      <div><h2>Employee structure</h2><p>Current employment status</p></div>
      <DashboardChart kind="doughnut" label="Employees by status" :labels="['Active','On leave']" :series="structureSeries"/>
    </section>
  </div>
</template>
