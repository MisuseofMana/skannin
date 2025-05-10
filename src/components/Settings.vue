<template>
     <v-overlay
      :model-value="isSettingsOpen"
      v-model="isSettingsOpen"
      class="align-center justify-center"
      scrim="info"
    >
      <v-sheet class="pa-10">
        <v-row>
            <v-col align="end">
                <v-btn variant="tonal" color="grey" prepend-icon="mdi-close">
                    Close
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
          <v-spacer/>
          <v-col align="end">
            <v-btn :color="clearAllDataButtonState.color" size="x-large" prepend-icon="mdi-alert-octagon-outline" @click="clearAllData">
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