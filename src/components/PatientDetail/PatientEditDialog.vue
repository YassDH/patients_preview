<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Edit Patient Information</DialogTitle>
        <DialogDescription>
          Update the patient's information below. All fields are optional.
        </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="name" class="text-right text-sm font-medium"> Name </label>
          <Input
            id="name"
            v-model="localForm.name"
            class="col-span-3"
            placeholder="Enter patient name"
          />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="status" class="text-right text-sm font-medium"> Status </label>
          <Select v-model="localForm.status">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in statusOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="weight" class="text-right text-sm font-medium"> Weight (kg) </label>
          <Input
            id="weight"
            v-model.number="localForm.weight"
            type="number"
            class="col-span-3"
            placeholder="Enter weight in kg"
            min="0"
            step="0.1"
          />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="height" class="text-right text-sm font-medium"> Height (cm) </label>
          <Input
            id="height"
            v-model.number="localForm.height"
            type="number"
            class="col-span-3"
            placeholder="Enter height in cm"
            min="0"
            step="0.1"
          />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="address" class="text-right text-sm font-medium"> Address </label>
          <Input
            id="address"
            v-model="localForm.address"
            class="col-span-3"
            placeholder="Enter address"
          />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <label for="phone" class="text-right text-sm font-medium"> Phone </label>
          <Input
            id="phone"
            v-model="localForm.phoneNumber"
            class="col-span-3"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="$emit('cancel')" :disabled="isSubmitting">
          Cancel
        </Button>
        <Button @click="handleSubmit" :disabled="isSubmitting">
          <div
            v-if="isSubmitting"
            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
          ></div>
          {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { getAllStatusOptions, PatientStatus, type PatientDetail } from '@/types/Patient'
import type { UpdatePatientRequest } from '@/services/api'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Button } from '../../../components/ui/button'

interface Props {
  open: boolean
  patient: PatientDetail | null
  isSubmitting: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'cancel'): void
  (e: 'submit', formData: UpdatePatientRequest): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const statusOptions = getAllStatusOptions()

const localForm = reactive({
  name: '',
  status: PatientStatus.NEW,
  weight: 0,
  height: 0,
  address: '',
  phoneNumber: '',
})

watch(
  () => [props.patient, props.open],
  ([patient, isOpen]) => {
    //Here we check if the patient is of type object because the array destructuring
    //of both patient and isOpen is of type PatientDetail | null | boolean
    //boolean is the type of the open prop and this confuses the type checker
    if (patient && isOpen && typeof patient === 'object') {
      localForm.name = patient.name || ''
      localForm.status = patient.status
      localForm.weight = patient.weight || 0
      localForm.height = patient.height || 0
      localForm.address = patient.address || ''
      localForm.phoneNumber = patient.phoneNumber || ''
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  const updatePayload: UpdatePatientRequest = {}

  if (localForm.name.trim()) updatePayload.name = localForm.name.trim()
  if (localForm.status !== undefined) updatePayload.status = localForm.status
  if (localForm.weight > 0) updatePayload.weight = localForm.weight
  if (localForm.height > 0) updatePayload.height = localForm.height
  if (localForm.address.trim()) updatePayload.address = localForm.address.trim()
  if (localForm.phoneNumber.trim()) updatePayload.phoneNumber = localForm.phoneNumber.trim()

  emit('submit', updatePayload)
}
</script>
