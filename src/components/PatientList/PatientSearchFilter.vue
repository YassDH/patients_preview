<template>
  <Card class="mb-6">
    <CardContent class="px-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <Input
            :model-value="searchTerm"
            @update:model-value="$emit('update:searchTerm', $event.toString())"
            type="text"
            placeholder="Search patients by name or ID..."
            class="w-full"
          />
        </div>
        <div class="md:w-48">
          <select
            :value="statusFilter"
            @change="$emit('update:statusFilter', ($event.target as HTMLSelectElement).value)"
            class="flex h-9 w-full items-center cursor-pointer justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All Statuses</option>
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <Button
          class="flex items-center gap-2 cursor-pointer"
          variant="default"
          @click="$emit('clearFilters')"
        >
          Clear Filters <X class="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { getAllStatusOptions } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const statusOptions = getAllStatusOptions()

interface Props {
  searchTerm: string
  statusFilter: string
}

interface Emits {
  (e: 'update:searchTerm', value: string): void
  (e: 'update:statusFilter', value: string): void
  (e: 'clearFilters'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
