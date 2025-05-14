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
        <v-col align="end">
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
          <p class="text-body-2 text-grey-darken-1 mb-6">
            v.0.0.2
          </p>
          <h2 class="text-h4 mb-2">
            About
          </h2>
          <p class="text-body-1 mb-5">
            This is a game inspired by a barcode scanning toy from the early 2000s produced by Radica called Skannerz.
          </p>
          <h2 class="text-h4 mb-2">
            How To Play
          </h2>
          <p class="text-body-1 mb-2">
            Use a phone to access this website and allow camera access. Use the scanner tab to scan barcodes to discover different monsters, items, and equipment.
          </p>
          <p class="text-body-1 mb-5">
            Equip your monsters with gear, feed them junkfood and level them up by scanning more barcodes.
          </p>
          <h2 class="text-h4 mb-2">
            Future Updates
          </h2>
          <p class="text-body-1">
            Coming soon you'll be able to play with friends and pit your monsters against one another in 1v1 mortal combat.
          </p>
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