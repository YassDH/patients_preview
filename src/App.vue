<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div class="max-h-screen bg-background">
    <main>
      <RouterView />
    </main>
  </div>
  <Toaster class="pointer-events-auto" />
</template>
