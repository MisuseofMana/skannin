<template>
  <v-row
    justify="end"
    class="mb-5"
  >
    <v-col
      v-for="(item) in fragmentDirectory"
      :key="item.name"
    >
      <v-sheet
        class="pa-6 d-flex align-center justify-center"
        elevation="4"
        rounded
        color="blue-grey-darken-4"
      >
        <v-img
          min-width="50px"
          max-width="50px"
          :src="useGetImage(item)"
        />
        <h2
          class="text-h5"
        >
          x{{ item.quantity }}
        </h2>
      </v-sheet>
    </v-col>
  </v-row>
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