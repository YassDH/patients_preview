import { PatientStatus, type BadgeVariant, type PatientStatusText } from '@/types/Patient'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
