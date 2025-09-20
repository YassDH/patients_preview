<template>
  <div class="min-h-screen bg-background p-6">
    <div class="max-w-4xl mx-auto">
      <PatientDetailHeader @back="goBack" />

      <LoadingCard v-if="loading" message="Loading patient details..." />

      <ErrorAlert v-else-if="error" title="Error loading patient details" :message="error" />

      <div v-else-if="patient" class="space-y-6">
        <PatientInfoCard :patient="patient" @edit="openEditDialog" />
      </div>

      <PatientEditDialog
        v-model:open="showEditDialog"
        :patient="patient"
        :is-submitting="isSubmittingEdit"
        @cancel="closeEditDialog"
        @submit="submitEdit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { patientApi, type UpdatePatientRequest } from '@/services/api'
import type { PatientDetail } from '@/types/Patient'

import PatientDetailHeader from '@/components/PatientDetail/PatientDetailHeader.vue'
import PatientInfoCard from '@/components/PatientDetail/PatientInfoCard.vue'
import PatientEditDialog from '@/components/PatientDetail/PatientEditDialog.vue'
import LoadingCard from '@/components/common/LoadingCard.vue'
import ErrorAlert from '@/components/common/ErrorAlert.vue'

const route = useRoute()
const router = useRouter()

const patient = ref<PatientDetail | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const showEditDialog = ref(false)
const isSubmittingEdit = ref(false)

const fetchPatientDetail = async () => {
  const patientId = parseInt(route.params.id as string)

  if (isNaN(patientId)) {
    error.value = 'Invalid patient ID'
    return
  }

  loading.value = true
  error.value = null

  try {
    patient.value = await patientApi.getPatientById(patientId)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unknown error occurred'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/')
}

const openEditDialog = () => {
  showEditDialog.value = true
}

const closeEditDialog = () => {
  showEditDialog.value = false
}

const submitEdit = async (updatePayload: UpdatePatientRequest) => {
  if (!patient.value) return

  isSubmittingEdit.value = true
  try {
    const updatedPatient = await patientApi.updatePatient(patient.value.id, updatePayload)

    patient.value = updatedPatient

    toast.success('Patient information updated successfully!')
    closeEditDialog()
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to update patient'
    toast.error('Failed to update patient information', {
      description: errorMessage,
    })
  } finally {
    isSubmittingEdit.value = false
  }
}

onMounted(() => {
  fetchPatientDetail()
})
</script>
