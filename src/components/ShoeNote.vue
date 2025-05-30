<template>
  <v-overlay
    v-model="isModalOpen"
    :model-value="isModalOpen"
    class="align-center justify-center"
    scrim="info"
  >
    <v-sheet
      max-width="600px"
      class="pa-10"
    >
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn
            variant="tonal"
            color="grey"
            prepend-icon="mdi-close"
            @click="isModalOpen = !isModalOpen"
          >
            Close
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mb-15">
        <v-col>
          <h2 class="text-h2 mb-3">
            Made for shoe,
          </h2>
          <p class="text-body-1 mb-3">
            Happy 30th birthday my treasured brother. I hope this game instills a childlike wonder and nostaligia for you.
          </p>
          <h3 class="text-h4">
            Love, Shoe.
          </h3>
        </v-col>
      </v-row>
    </v-sheet>
  </v-overlay>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const isModalOpen = ref(false)
const clearAllDataPrimed = ref(false)

const openModal = () => {
   isModalOpen.value = !isModalOpen.value
}

defineExpose({
   openModal
})
</script>