export const money = (value: number) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value)
export const dateLabel = (value: string) => new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeZone:'UTC'}).format(new Date(value))

export function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map(word => word[0]).join('')
}

export function matchesSearch(query: string, ...fields: string[]) {
  return fields.join(' ').toLowerCase().includes(query.trim().toLowerCase())
}
