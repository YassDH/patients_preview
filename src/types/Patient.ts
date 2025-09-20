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

export const getStatusText = (status: PatientStatus): PatientStatusText => {
  switch (status) {
    case PatientStatus.NEW:
      return 'New'
    case PatientStatus.PENDING:
      return 'Pending'
    case PatientStatus.DISQUALIFIED:
      return 'Disqualified'
    case PatientStatus.QUALIFIED:
      return 'Qualified'
    default: {
      const _exhaustiveCheck: never = status
      throw new Error(`Wrong status: ${_exhaustiveCheck}`)
    }
  }
}

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

export const getStatusVariant = (status: PatientStatus): BadgeVariant => {
  switch (status) {
    case PatientStatus.NEW:
      return 'outline'
    case PatientStatus.PENDING:
      return 'secondary'
    case PatientStatus.DISQUALIFIED:
      return 'destructive'
    case PatientStatus.QUALIFIED:
      return 'default'
    default:
      return 'outline'
  }
}

export const getAllStatusOptions = () => {
  return Object.values(PatientStatus)
    .filter((value) => typeof value === 'number')
    .map((status) => ({
      value: status as PatientStatus,
      label: getStatusText(status as PatientStatus),
    }))
}
