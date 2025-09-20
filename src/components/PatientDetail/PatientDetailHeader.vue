<template>
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-foreground">Patient Details</h1>
    <Button variant="ghost" @click="$emit('back')" class="mt-4 px-0 h-auto">
      <ArrowLeft class="h-4 w-4 mr-2" />
      Back to Patient List
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

defineEmits<{
  back: []
}>()
</script>
