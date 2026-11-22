export interface Leave { id: string; name: string; type: string; date: string; status: 'Pending' | 'Approved' | 'Declined' }

export const requests: Leave[] = [
  {id:'L1',name:'Aisha Khan',type:'Annual leave',date:'2026-11-23',status:'Pending'},
  {id:'L2',name:'Axay Patanvadiya-1',type:'Personal leave',date:'2026-11-26',status:'Pending'},
]
