export type AttendanceRecord = {
  employeeId: string
  date: string
} & (
  | { status: 'Present'; checkIn: string; checkOut: string }
  | { status: 'Absent' | 'On leave'; checkIn?: never; checkOut?: never }
)

export const attendance: AttendanceRecord[] = [
  { employeeId: 'EMP-101', date: '2026-11-19', status: 'Present', checkIn: '09:04', checkOut: '17:24' },
  { employeeId: 'EMP-102', date: '2026-11-19', status: 'Present', checkIn: '08:54', checkOut: '17:15' },
  { employeeId: 'EMP-103', date: '2026-11-19', status: 'On leave' },
  { employeeId: 'EMP-104', date: '2026-11-19', status: 'Present', checkIn: '09:01', checkOut: '17:10' },
  { employeeId: 'EMP-101', date: '2026-11-20', status: 'Present', checkIn: '09:02', checkOut: '17:18' },
  { employeeId: 'EMP-102', date: '2026-11-20', status: 'Present', checkIn: '08:58', checkOut: '17:12' },
  { employeeId: 'EMP-103', date: '2026-11-20', status: 'On leave' },
  { employeeId: 'EMP-104', date: '2026-11-20', status: 'Absent' },
]
