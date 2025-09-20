<template>
  <Card>
    <CardHeader>
      <CardTitle>Patients ({{ patientCount }})</CardTitle>
    </CardHeader>
    <hr />
    <div class="px-4">
      <slot />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle } from '../../../components/ui/card'

interface Props {
  patientCount: number
}

defineProps<Props>()
</script>
