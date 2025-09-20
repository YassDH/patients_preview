<template>
  <div class="bg-background p-6">
    <div class="max-w-4xl mx-auto max-h-screen">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground mb-2">Patient Management</h1>
      </div>

      <PatientSearchFilter
        v-model:search-term="searchTerm"
        v-model:status-filter="statusFilter"
        @clear-filters="clearFilters"
      />

      <LoadingCard v-if="loading" message="Loading patients..." />

      <ErrorAlert v-else-if="error" title="Error loading patients" :message="error" />

      <PatientTableHeader v-else :patient-count="filteredPatients.length">
        <PatientTable :patients="filteredPatients" @patient-click="viewPatientDetail" />
      </PatientTableHeader>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { patientApi } from '@/services/api'
import type { Patient } from '@/types/Patient'

import PatientSearchFilter from '@/components/PatientList/PatientSearchFilter.vue'
import PatientTableHeader from '@/components/PatientList/PatientTableHeader.vue'
import PatientTable from '@/components/PatientList/PatientTable.vue'
import LoadingCard from '@/components/common/LoadingCard.vue'
import ErrorAlert from '@/components/common/ErrorAlert.vue'

const router = useRouter()

const patients = ref<Patient[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searchTerm = ref('')
const statusFilter = ref('')

const filteredPatients = computed(() => {
  let filtered = patients.value

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(
      (patient) =>
        patient.name.toLowerCase().includes(term) || patient.id.toString().includes(term),
    )
  }

  if (statusFilter.value !== '') {
    filtered = filtered.filter((patient) => patient.status === parseInt(statusFilter.value))
  }

  return filtered
})

const fetchPatients = async () => {
  loading.value = true
  error.value = null

  try {
    patients.value = await patientApi.getPatients()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unknown error occurred'
  } finally {
    loading.value = false
  }
}

const viewPatientDetail = (patientId: number) => {
  router.push(`/patient/${patientId}`)
}

const clearFilters = () => {
  searchTerm.value = ''
  statusFilter.value = ''
}

onMounted(() => {
  fetchPatients()
})
</script>
