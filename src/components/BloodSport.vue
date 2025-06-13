<template>
  <div>
    <div class="d-flex my-4 justify-center text-red">
      <v-icon
        size="35"
        class="mr-2"
      >
        mdi-sword
      </v-icon>
      <h2 class="text-h4 mb-5">
        Bloodsport
      </h2>
    </div>
    <v-img 
      min-width="325"
      :src="useEventImage({folderName: 'shop', fileName: '1'})"
    />
  </div>
</template>

<script setup>
import { useEventImage } from '@/composables/useImageRoute'
</script>