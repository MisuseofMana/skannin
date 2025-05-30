<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title />
      <v-btn
        class="mr-4"
        color="amber-accent-4"
        variant="tonal"
        prepend-icon="mdi-information"
        @click="gameInfoComponent.openModal()"
      >
        Game Info
      </v-btn>
      <v-btn
        class="mr-4"
        color="amber-accent-4"
        variant="tonal"
        @click="settingsComponent.openSettings()"
      >
        <v-icon>mdi-skull-scan</v-icon>
      </v-btn>
      <v-btn
        class="mr-4"
        color="amber-accent-4"
        variant="tonal"
        @click="shoeNoteComponent.openModal()"
      >
        <v-icon>mdi-shoe-print</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <AllDirectories />
    </v-main>

    <Settings ref="settingsRef" />
    <GameInfo ref="gameInfoRef" />
    <ShoeNote ref="shoeNoteRef" />
  </v-app>
</template>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'
import { loadData, saveData } from '@/composables/useLocalStorage.js'

const settingsComponent = useTemplateRef('settingsRef')
const gameInfoComponent = useTemplateRef('gameInfoRef')
const shoeNoteComponent = useTemplateRef('shoeNoteRef')

const gameVersion = ref('0.0.3')

onMounted(() => {
  if (loadData('gameVersion') !== gameVersion.value) {
    localStorage.clear()
    saveData('gameVersion', gameVersion.value)
    location.reload()
  }
})
</script>