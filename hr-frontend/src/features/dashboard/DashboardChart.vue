<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ArcElement, BarController, BarElement, CategoryScale, Chart, DoughnutController, LinearScale, LineController, LineElement, PointElement, Tooltip, type ChartConfiguration } from 'chart.js'

type Kind = 'bar' | 'line' | 'doughnut'
interface Series { label: string; values: number[]; color: string | string[] }

const props = defineProps<{ kind: Kind; label: string; labels: string[]; series: Series[]; unit?: string }>()
const canvas = ref<HTMLCanvasElement>()
const hidden = ref<number[]>([])
let chart: Chart<Kind, number[], string> | undefined

Chart.register(ArcElement, BarController, BarElement, CategoryScale, DoughnutController, LinearScale, LineController, LineElement, PointElement, Tooltip)

const legend = computed(() => props.kind === 'doughnut'
  ? props.labels.map((label, index) => {
      const dataset = props.series[0]
      const color = Array.isArray(dataset?.color) ? dataset.color[index] : dataset?.color
      return { label, color, value: dataset?.values[index] }
    })
  : props.series.map(dataset => ({ label: dataset.label, color: dataset.color, value: undefined })))

function format(value: number) {
  return props.unit === '%' ? value + '%' : props.unit === 'INR'
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value * 1000)
    : value.toLocaleString('en-IN')
}

function data(): ChartConfiguration<Kind, number[], string>['data'] {
  return {
    labels: [...props.labels],
    datasets: props.series.map(series => ({
      label: series.label,
      data: [...series.values],
      backgroundColor: series.color,
      borderColor: props.kind === 'doughnut' ? '#fff' : series.color,
      borderWidth: props.kind === 'bar' ? 0 : 2,
      borderRadius: props.kind === 'bar' ? 3 : 0,
      tension: 0.35,
      pointRadius: 2,
      pointHoverRadius: 5,
    })),
  }
}

function toggle(index: number) {
  if (!chart) return
  const wasHidden = hidden.value.includes(index)
  hidden.value = wasHidden ? hidden.value.filter(item => item !== index) : [...hidden.value, index]
  if (props.kind === 'doughnut') chart.toggleDataVisibility(index)
  else chart.setDatasetVisibility(index, wasHidden)
  chart.update()
}

onMounted(() => {
  const context = canvas.value?.getContext('2d')
  if (!context) return
  const radial = props.kind === 'doughnut'
  const stacked = props.kind === 'bar'
  chart = new Chart<Kind, number[], string>(context, {
    type: props.kind,
    data: data(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: radial ? 'nearest' : 'index', intersect: radial },
      ...(radial ? {} : {
        scales: {
          x: { stacked, grid: { display: false }, ticks: { maxRotation: 0 } },
          y: { stacked, beginAtZero: true, grid: { color: '#e8ebf2' } },
        },
      }),
      plugins: {
        tooltip: {
          callbacks: {
            label: item => {
              const value = radial ? Number(item.parsed) : (item.parsed as {y:number}).y
              return (radial ? item.label : item.dataset.label) + ' · ' + format(value)
            },
          },
        },
      },
    },
  })
})

watch(() => [props.labels, props.series], () => {
  if (!chart) return
  chart.data = data()
  if (props.kind !== 'doughnut') {
    chart.data.datasets.forEach((_, index) => chart?.setDatasetVisibility(index, !hidden.value.includes(index)))
  }
  chart.update()
})

onBeforeUnmount(() => chart?.destroy())
</script>

<template>
  <div class="dashboard-chart">
    <div class="chart-canvas" :class="{ 'chart-canvas-ring': kind === 'doughnut' }">
      <canvas ref="canvas" role="img" :aria-label="label"></canvas>
    </div>
    <ul class="chart-legend" :aria-label="label + ' legend'">
      <li v-for="(item,index) in legend" :key="item.label">
        <button type="button" :aria-pressed="!hidden.includes(index)" @click="toggle(index)">
          <i :style="{ background: String(item.color ?? '') }"></i>{{ item.label }}
          <strong v-if="item.value !== undefined">{{ format(item.value) }}</strong>
        </button>
      </li>
    </ul>
    <details v-if="kind !== 'doughnut'" class="chart-data">
      <summary>View chart data</summary>
      <div class="table-scroll"><table>
        <thead><tr><th scope="col">Month</th><th v-for="dataset in series" :key="dataset.label" scope="col">{{ dataset.label }}</th></tr></thead>
        <tbody><tr v-for="(month,index) in labels" :key="month"><th scope="row">{{ month }}</th><td v-for="dataset in series" :key="dataset.label">{{ format(dataset.values[index]) }}</td></tr></tbody>
      </table></div>
    </details>
  </div>
</template>
