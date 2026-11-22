import { computed } from 'vue'
import { notice } from '../../shared/notice'
import { storedList } from '../../shared/storage'
import { requests, type Leave } from './data'

export const leave = storedList('people-studio-leave', requests)
export const pendingLeave = computed(() => leave.value.filter(item => item.status === 'Pending'))

export function decide(request: Leave, status: 'Approved' | 'Declined') {
  request.status = status
  notice.value = request.name + '’s request was ' + status.toLowerCase() + '.'
}
