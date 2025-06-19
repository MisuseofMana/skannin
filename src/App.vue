<template>
  <v-app>
    <v-app-bar>
      <div class="d-flex align-center justify-space-between flex-grow-1">
        <div class="ml-2">
          <Fragments />
        </div>
        <div>
          <v-btn
            class="mr-4"
            color="amber-accent-4"
            variant="tonal"
            @click="gameInfoComponent.openModal()"
          >
            <v-icon> mdi-information</v-icon>
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
        </div>
      </div>
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

const gameVersion = ref('0.1.0')

onMounted(() => {
  if (loadData('gameVersion') !== gameVersion.value) {
    localStorage.clear()
    saveData('gameVersion', gameVersion.value)
    location.reload()
  }
})
</script>