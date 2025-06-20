<template>
  <v-overlay
    v-model="isModalOpen"
    :model-value="isModalOpen"
    class="align-center justify-center"
    opacity=".75"
    scrim="blue-grey-darken-4"
  >
    <v-sheet
      max-width="600px"
      class="pa-10"
      color="blue-grey-darken-4"
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
          <p class="text-body-2 text-grey-darken-1 mb-6">
            v.0.1.1
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
            Against the old man's advice, make your freaky little monster pets participate in blood sport death matches. Try your best to care for them, win fragments in the deathmatches and spend them on bits, baubels, and better gear to equip so you can become the ultimate monster fighter.
          </p>
          <p class="text-body-1 mb-5">"Gotta get most of em" just like in that popular japanese pocket monster game!"</p>
          
          <p class="text-body-2">Deathmatch music by <a href=" https://freesound.org/people/Mike_306/ ">Mike_360</a></p>
          <!-- <p class="text-body-1 mb-5">
            Equip your monsters with gear, feed them junkfood and level them up by scanning more barcodes.
          </p>
          <h2 class="text-h4 mb-2">
            Future Updates
          </h2>
          <p class="text-body-1">
            Coming soon you'll be able to play with friends and pit your monsters against one another in 1v1 mortal combat.
          </p> -->
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