import { PatientStatus } from '@/types/Patient'
import type { Patient, PatientDetail } from '@/types/Patient'

export const mockPatient: Patient = {
  id: 1,
  name: 'John Doe',
  joinDate: '2023-01-15T10:30:00Z',
  status: PatientStatus.NEW,
}

export const mockPatientDetail: PatientDetail = {
  ...mockPatient,
  weight: 70,
  height: 175,
  address: '123 Main St',
  phoneNumber: '+1-555-0123',
}

export const mockPatients: Patient[] = [
  mockPatient,
  { id: 2, name: 'Jane Smith', joinDate: '2023-02-20T14:15:00Z', status: PatientStatus.PENDING },
  { id: 3, name: 'Bob Johnson', joinDate: '2023-03-10T09:45:00Z', status: PatientStatus.QUALIFIED },
]
