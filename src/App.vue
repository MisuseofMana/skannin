<template>
  <v-app>
    <v-main>
      <HelloWorld/>
    </v-main>

    <v-overlay
      :model-value="isSettingsOpen"
      v-model="isSettingsOpen"
      class="align-center justify-center"
      scrim="info"
    >
      <v-sheet class="pa-10">
        <v-row class="mb-15">
          <v-col>
            <h1>Made for a 30 year old shoe.</h1>
            <h2 class="mb-5">I hope this evokes childlike wonder and nostalgia.</h2>
            <h3>Love, Shoe</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-spacer/>
          <v-col align="end">
            <v-btn :color="clearAllDataButtonState.color" size="small" prepend-icon="mdi-alert-octagon-outline" @click="clearAllData">
              {{ clearAllDataButtonState.text }}
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-overlay>

    <v-footer>
      <v-btn color="grey" variant="tonal" size="small" icon="$info" @click="openSettings"/>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const isSettingsOpen = ref(false)
const clearAllDataPrimed = ref(false)

const openSettings = () => {
  isSettingsOpen.value = !isSettingsOpen.value
}

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
      text: 'Click again to clear all data.'
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