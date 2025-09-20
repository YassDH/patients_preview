import axios from 'axios'
import type { Patient, PatientDetail, PatientStatus } from '@/types/Patient'

const BASE_URL = 'https://patiro-developer.azurewebsites.net/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export interface UpdatePatientRequest {
  name?: string
  status?: PatientStatus
  weight?: number
  height?: number
  address?: string
  phoneNumber?: string
}

export const patientApi = {
  async getPatients(): Promise<Patient[]> {
    try {
      const response = await api.get<Patient[]>('/Member')
      return response.data
    } catch (error) {
      console.error('Error fetching patients:', error)
      throw new Error('Failed to fetch patients')
    }
  },

  async getPatientById(id: number): Promise<PatientDetail> {
    try {
      const response = await api.get<PatientDetail>(`/Member/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching patient ${id}:`, error)
      throw new Error(`Failed to fetch patient with ID ${id}`)
    }
  },

  async updatePatient(id: number, updates: UpdatePatientRequest): Promise<PatientDetail> {
    try {
      const response = await api.post<PatientDetail>(`/Member/${id}`, updates)
      return response.data
    } catch (error) {
      console.error(`Error updating patient ${id}:`, error)
      throw new Error(`Failed to update patient with ID ${id}`)
    }
  },
}
