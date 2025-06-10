<template>
  <div
    v-for="(item) in fragmentDirectory"
    :key="item.name"
    class="d-flex align-center"
  >
    <v-img
      min-width="40px"
      max-width="40px"
      :src="useGetImage(item)"
    />
    <h2
      class="text-h5"
    >
      {{ item.quantity }}
    </h2>
  </div>
</template>

<script setup>
import { fragmentDirectory } from '@/composables/useItemList.js'
import { loadData, saveData } from '@/composables/useLocalStorage.js'
import { onMounted, watch } from 'vue'
import { useGetImage } from '@/composables/useImageRoute.js'

onMounted(() => {
  const savedFragments = loadData('savedFragments')

  if (savedFragments) {
    fragmentDirectory.value = savedFragments
  }
})
</script>