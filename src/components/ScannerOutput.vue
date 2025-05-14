<template>
  <div
    v-if="scannedMonster"
    class="mb-10"
  >
    <v-sheet class="pa-10">
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
            A new monster!
          </h1>
          <p class="text-body-1 mb-2">
            It's an {{ scannedMonster.type }} type monster named "{{ scannedMonster.name }}".
          </p>
          <p class="text-body-1 ml-4 mb-10">
            + "{{ scannedMonster.name }}" was added to the monster tab.
          </p>
        </div>
        <img
          width="200"
          min-width="300px"
          :src="getMonsterImage(scannedMonster)"
        >
      </div>
    </v-sheet>
  </div>
</template>

<script setup> 
import { defineProps } from 'vue';
const props = defineProps({
    scannedMonster: null,
})
</script>