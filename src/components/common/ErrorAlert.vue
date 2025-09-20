<template>
  <div class="text-center py-12 border rounded-lg shadow-sm">
    <AlertCircle class="mx-auto h-12 w-12 text-muted-foreground" />
    <h3 class="mt-2 text-sm font-medium text-foreground">{{ title }}</h3>
    <p class="mt-1 text-sm text-muted-foreground">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'

interface Props {
  title?: string
  message: string
}

withDefaults(defineProps<Props>(), {
  title: 'Error',
})
</script>
