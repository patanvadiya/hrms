import { ref, watch } from 'vue'

export function storedList<T>(key: string, defaults: T[]) {
  const items = ref<T[]>(defaults)
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(key) ?? 'null')
    if (Array.isArray(saved)) items.value = saved
  } catch {
    // Use the demo defaults when storage is unavailable or invalid.
  }

  watch(items, value => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Keep the current changes available in memory.
    }
  }, { deep: true })

  return items
}
