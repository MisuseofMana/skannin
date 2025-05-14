<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title />
      <v-btn
        class="mr-4"
        color="grey"
        variant="tonal"
        size="small"
        prepend-icon="mdi-information"
        @click="gameInfoComponent.openModal()"
      >
        Game Info
      </v-btn>
      <v-btn
        class="mr-4"
        color="grey"
        variant="tonal"
        size="small"
        @click="settingsComponent.openSettings()"
      >
        <v-icon>mdi-skull-scan</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <AllDirectories />
    </v-main>

    <Settings ref="settingsRef" />
    <GameInfo ref="gameInfoRef" />
  </v-app>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'
const settingsComponent = useTemplateRef('settingsRef')
const gameInfoComponent = useTemplateRef('gameInfoRef')
</script>