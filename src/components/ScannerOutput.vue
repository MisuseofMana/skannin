<template>
  <div
    v-if="scannerResult"
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
        />
      </div>
      <div class="d-flex justify-space-around align-center">
        <div>
          <h1 class="text-h2 mb-4">
            A new {{ scannerResult.classification }}!
          </h1>
          <p class="text-body-1 mb-2">
            {{ resultTextFormatter(scannerResult) }}".
          </p>
          <p class="text-body-1 ml-4 mb-10">
            + "{{ scannerResult.name }}" was added to the {{ scannerResult.classification }} tab.
          </p>
        </div>
        <img
          width="200"
          min-width="300px"
          :src="getMonsterImage(scannerResult)"
        >
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import { DiscoverableTypes as DT } from '@/composables/useDiscoverableTypes'
import { defineProps } from 'vue';
const props = defineProps({
    scannerResult: null,
})

const getMonsterImage = ({type, name}) => {
  return new URL(`../assets/monsters/${type}/${name}.png`, import.meta.url).href
}

const resultTextFormatter = (input) => {
    switch (input.classification) {
        case DT.MONSTER:
            return `You got the ${input.type} type monster "${ input.name }`
            break;
        case DT.CONSUUMABLE:
            return `You got a ${input.type} - "${input.name}"`
        default:
            break;
    }
}
</script>