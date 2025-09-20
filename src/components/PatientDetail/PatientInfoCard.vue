<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle class="text-xl">{{ patient.name }}</CardTitle>
        <div class="flex items-center gap-2">
          <Badge :variant="getStatusVariant(patient.status)">
            {{ getStatusText(patient.status) }}
          </Badge>
          <Button variant="outline" size="sm" @click="$emit('edit')">
            <Edit class="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <dl class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <dt class="text-sm font-medium text-muted-foreground">Patient ID</dt>
          <dd class="mt-1 text-sm text-foreground">{{ patient.id }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-muted-foreground">Status</dt>
          <dd class="mt-1">
            <Badge :variant="getStatusVariant(patient.status)" class="text-xs">
              {{ getStatusText(patient.status) }}
            </Badge>
          </dd>
        </div>
        <div v-for="(value, key) in formattedPatientData" :key="key">
          <dt class="text-sm font-medium text-muted-foreground">
            {{ value.name }}
          </dt>
          <dd class="mt-1 text-sm text-foreground">{{ value.value }}</dd>
        </div>
      </dl>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Edit } from 'lucide-vue-next'
import { getStatusText, getStatusVariant } from '@/lib/utils'
import type { PatientDetail } from '@/types/Patient'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Props {
  patient: PatientDetail
}

const props = defineProps<Props>()

defineEmits<{
  edit: []
}>()

const formattedPatientData = computed(() => {
  return Object.entries(props.patient)
    .filter(([key, value]) => {
      return key !== 'id' && key !== 'name' && key !== 'status' && value !== undefined
    })
    .map(([key, value]) => {
      return {
        name: convertCamelCaseToTitleCase(key),
        value: formatValueByType(key, value),
      }
    })
})

const convertCamelCaseToTitleCase = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

const formatValueByType = (key: string, value: string | number | Date | undefined): string => {
  if (value === undefined) {
    return ''
  }
  if (value instanceof Date) {
    return value.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  if (typeof value === 'string') {
    const date = new Date(value)
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }
  }
  if (typeof value === 'number') {
    if (key === 'weight') {
      return `${value} kg`
    }
    if (key === 'height') {
      return `${value} cm`
    }
    return value.toString()
  }
  return value.toString()
}
</script>
