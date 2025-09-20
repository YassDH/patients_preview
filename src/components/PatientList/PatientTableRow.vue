<template>
  <TableRow class="cursor-pointer hover:bg-muted/50" @click="$emit('click')">
    <TableCell>
      <div>
        <p class="font-medium text-foreground">{{ patient.name }}</p>
        <p class="text-sm text-muted-foreground">ID: {{ patient.id }}</p>
      </div>
    </TableCell>
    <TableCell>
      <p class="text-sm text-muted-foreground">{{ formatDate(patient.joinDate) }}</p>
    </TableCell>
    <TableCell>
      <Badge class="w-full" :variant="getStatusVariant(patient.status)">
        {{ getStatusText(patient.status) }}
      </Badge>
    </TableCell>
    <TableCell>
      <Button
        class="cursor-pointer w-full px-2"
        variant="outline"
        size="icon"
        @click="$emit('click')"
      >
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">View Details</span>
          <Eye class="h-4 w-4 text-muted-foreground" />
        </div>
      </Button>
    </TableCell>
  </TableRow>
</template>

<script setup lang="ts">
import { Eye } from 'lucide-vue-next'
import { TableCell, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getStatusText, getStatusVariant } from '@/lib/utils'
import type { Patient } from '@/types/Patient'

interface Props {
  patient: Patient
}

interface Emits {
  (e: 'click'): void
}

defineProps<Props>()
defineEmits<Emits>()

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
