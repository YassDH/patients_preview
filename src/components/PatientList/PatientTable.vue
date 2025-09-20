<template>
  <CardContent class="p-0 max-h-[500px] overflow-y-auto">
    <div v-if="patients.length === 0" class="text-center py-12">
      <Users class="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 class="mt-2 text-sm font-medium text-foreground">No patients found</h3>
      <p class="mt-1 text-sm text-muted-foreground">
        Try adjusting your search or filter criteria.
      </p>
    </div>

    <Table v-else>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead class="w-[100px]">Status</TableHead>
          <TableHead class="w-[150px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="px-4">
        <PatientTableRow
          v-for="patient in patients"
          :key="patient.id"
          :patient="patient"
          @click="$emit('patientClick', patient.id)"
        />
      </TableBody>
    </Table>
  </CardContent>
</template>

<script setup lang="ts">
import { Users } from 'lucide-vue-next'
import { CardContent } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PatientTableRow from './PatientTableRow.vue'
import type { Patient } from '@/types/Patient'

interface Props {
  patients: Patient[]
}

interface Emits {
  (e: 'patientClick', patientId: number): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
