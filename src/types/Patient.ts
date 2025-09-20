export enum PatientStatus {
  NEW = 0,
  PENDING = 1,
  DISQUALIFIED = 2,
  QUALIFIED = 3,
}

export interface Patient {
  id: number
  name: string
  joinDate: string
  status: PatientStatus
}

export interface PatientDetail extends Patient {
  weight: number
  height: number
  address: string
  phoneNumber: string
  [key: string]: string | number | undefined
}
export type PatientStatusText = 'New' | 'Pending' | 'Disqualified' | 'Qualified'

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'
