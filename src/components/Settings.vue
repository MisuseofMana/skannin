<template>
  <v-overlay
    v-model="isSettingsOpen"
    :model-value="isSettingsOpen"
    class="align-center justify-center"
    opacity=".75"
    scrim="red"
  >
    <v-sheet
      class="pa-10"
      color="blue-grey-darken-4"
      max-width="650px"
    >
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn
            variant="tonal"
            color="grey"
            prepend-icon="mdi-close"
            @click="isSettingsOpen = !isSettingsOpen"
          >
            Close
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          align="center"
          class="text-body-1"
        >
          <h2 class="text-red text-h3 mb-5">
            Woah, hold on!
          </h2>
          <p class="text-red text-h5 mb-3">
            This will delete <strong>all</strong> your game data.
          </p>
          <p class="mb-5 text-red text-h5">
            Click the below button two times to clear all your data and start the game over from scratch.
          </p>
          <p class="text-h3 text-red mb-10">
            This action is irreversible.
          </p>
          <v-btn
            :color="clearAllDataButtonState.color"
            size="x-large"
            class="mb-5"
            append-icon="mdi-skull"
            prepend-icon="mdi-skull"
            @click="clearAllData"
          >
            {{ clearAllDataButtonState.text }}
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-overlay>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const isSettingsOpen = ref(false)
const clearAllDataPrimed = ref(false)

const openSettings = () => {
    isSettingsOpen.value = !isSettingsOpen.value
}

defineExpose({
    openSettings
})

const clearAllData = () => {
  if (clearAllDataPrimed.value === true) {
    localStorage.clear()
    location.reload()
  }
  clearAllDataPrimed.value = true 
}

watch(isSettingsOpen, (newVal) => {
  if (newVal === false) {
    clearAllDataPrimed.value = false
  }
})

const clearAllDataButtonState = computed(() => {
  if (clearAllDataPrimed.value) {
    return {
      color: 'red',
      text: 'Are You Sure?'
    }
  }
  else {
    return {
      color: 'warning',
      text: "Clear all data?"
    }
  }
})
</script>