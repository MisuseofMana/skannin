<template>
  <div
    class="mb-10"
  >
    <v-sheet
      color="blue-grey-darken-4"
      class="pa-10"
    >
      <div class="d-flex justify-end mb-5">
        <v-btn
          size="large"
          variant="plain"
          icon="mdi-close"
          color="red"
          @click="$emit('clear-scan-result')"
        />
      </div>
      <div class="d-flex justify-space-around align-center">
        <div>
          <h1 class="text-h2 mb-4">
            Found {{ scannerResult.classification }}!
          </h1>
          <!-- Display if this is the first instance of discovery. -->
          <span v-if="scannerResult.quantity <= 1">
            <p
              class="text-body-1 ml-4 mb-2"
            >
              + "{{ scannerResult.name }}" was added to the {{ scannerResult.classification }} tab.
            </p>

            <!-- if not a monster show discovery added text -->
            <span v-if="scannerResult.classification !== DT.MONSTER">
              <p
                class="text-body-1 ml-4"
              >
                - you have {{ scannerResult.quantity }} available.
              </p>
            </span>

            <!-- if a monster, display it's new level -->
            <span v-else>
              <p
                class="text-body-1 ml-4"
              >
                - {{ scannerResult.name }} is level {{ scannerResult.quantity }}.
              </p>
            </span>
          </span>

          <!-- display if this is not the first discovery -->
          <span v-else>
            <!-- if not a monster show discovery added text -->
            <span v-if="scannerResult.classification !== DT.MONSTER">
              <p
                class="text-body-1 ml-4 mb-4"
              >
                + another "{{ scannerResult.name }}" was added to the {{ scannerResult.classification }} tab.
              </p>
              <p
                class="text-body-1 ml-4"
              >
                - you have {{ scannerResult.quantity }} available.
              </p>
            </span>

            <!-- if a monster, display it's new level -->
            <span v-else>
              <p
                class="text-body-1 ml-4 mb-10"
              >
                + You found "{{ scannerResult.name }}" again, it leveled up!
              </p>
              <p
                class="text-body-1 ml-4"
              >
                - {{ scannerResult.name }} is now level {{ scannerResult.quantity }}.
              </p>
            </span>
          </span>
        </div>
        <img
          width="200"
          min-width="300px"
          :src="useGetImage(scannerResult)"
        >
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import { DiscoverableTypes as DT } from '@/composables/useDiscoverableTypes.js'
import { defineProps } from 'vue';
import { useGetImage } from '@/composables/useImageRoute.js'
const props = defineProps({
    scannerResult: null,
})
</script>