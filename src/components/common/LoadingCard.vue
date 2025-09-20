<template>
  <Card class="p-12">
    <div class="flex justify-center items-center space-x-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span class="text-muted-foreground">{{ message }}</span>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'

interface Props {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Loading...',
})
</script>
