export interface Employee { id: string; name: string; role: string; team: string; status: 'Active' | 'On leave'; salary: number }

export const employees: Employee[] = [
  {id:'EMP-101',name:'Priya Shah',role:'Product Designer',team:'Design',status:'Active',salary:78000},
  {id:'EMP-102',name:'Rohan Mehta',role:'Backend Engineer',team:'Engineering',status:'Active',salary:96000},
  {id:'EMP-103',name:'Aisha Khan',role:'People Partner',team:'People',status:'On leave',salary:72000},
  {id:'EMP-104',name:'Axay Patanvadiya',role:'Growth Lead',team:'Marketing',status:'Active',salary:84000},
]
