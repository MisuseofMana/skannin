<template>
  <div
    class="mt-2"
  >
    <p class="text-center text-red mb-2">
      There's no turning back, it's a fight or die...
    </p>
    <div class="d-flex justify-center flex-grow-1">
      <v-icon
        size="35"
        class="mr-2"
        color="red"
      >
        mdi-liquid-spot
      </v-icon>
      <h2 class="text-h4 mb-3 text-red mr-2">
        DEATHMATCH
      </h2>
      <v-icon
        size="35"
        class="mr-2"
        color="red"
      >
        mdi-liquid-spot
      </v-icon>
    </div>
    <pre v-if="false" class="text-body-2">{{ localDeathmatchData.opponent }}</pre>
    <div v-if="localDeathmatchData">
      <div class="d-flex align-center justify-space-between">
      <!-- you -->
      <v-card color="blue-grey-darken-4" class="pa-3">
        <p class="text-center text-white text-h6 mb-5">YOU</p>
        <v-img
          max-width="100px"
          min-width="100px"
          class="mx-auto"
          :src="useGetImage(localDeathmatchData?.monster)"
        />
        <p class="text-center text-white text-h5 mb-2">
          {{ localDeathmatchData.monster.stats.hp }} HP
        </p>
        <v-card>
          ???
        </v-card>
      </v-card>

      <div class="mx-4">
        <v-card
            color="blue-grey-darken-3"
            class="mb-4"
            @click="throwHand('rock')"
          >
            <v-img
              max-width="70px"
              min-width="70px"
              :src="useRPSImage('rock')"
            />
          </v-card>
          <v-card
          class="mb-4"
            color="blue-grey-darken-3" 
            @click="throwHand('paper')"
          >
            <v-img
              max-width="70px"
              min-width="70px"
              :src="useRPSImage('paper')"
            />
          </v-card>
          <v-card
            color="blue-grey-darken-3" 
            @click="throwHand('scissors')"
          >
            <v-img
              max-width="70px"
              min-width="70px"
              :src="useRPSImage('scissors')"
            />
          </v-card>
      </div>
      <v-card color="blue-grey-darken-4" class="pa-3">
        <p class="text-center text-white text-h6 mb-5">FOE</p>
        <v-img
          max-width="100px"
          min-width="100px"
          class="mx-auto"
          :src="useGetImage(localDeathmatchData?.opponent)"
        />
        <p class="text-center text-white text-h5 mb-2">
          {{ localDeathmatchData.opponent.stats.hp }} HP
        </p>
        <v-card>
          ???
        </v-card>
      </v-card>
    </div>
    </div>
  </div>
</template>

<script setup>
import { useGetImage, useRPSImage } from '@/composables/useImageRoute'
import { loadData } from '@/composables/useLocalStorage'
import { onMounted, ref } from 'vue'

const localDeathmatchData = ref(null)

onMounted(() => {
  const fightData = loadData('savedDeathmatchData')
  if (fightData) {
    localDeathmatchData.value = fightData
  }
})
</script>