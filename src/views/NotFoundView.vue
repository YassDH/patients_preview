<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-6">
    <div class="max-w-md w-full text-center space-y-6">
      <div class="space-y-2">
        <h1 class="text-6xl font-bold text-primary">404</h1>
        <h2 class="text-2xl font-semibold text-foreground">Page Not Found</h2>
      </div>
      <div class="space-y-2">
        <p class="text-muted-foreground">Sorry, we couldn't find the page you're looking for.</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <Button @click="goHome" variant="default" class="flex items-center gap-2">
          <Home class="h-4 w-4" />
          Go to Home
        </Button>
        <Button @click="goBack" variant="outline" class="flex items-center gap-2">
          <ArrowLeft class="h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Home, ArrowLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>
