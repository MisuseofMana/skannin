<template>
  <v-row>
    <v-col
      v-for="(item, index) in gemDirectory"
      :key="item.name"
      cols="12"
      md="4"
    >
      <v-sheet
        class="pa-6"
        elevation="4"
        rounded
      >
        <div class="d-flex justify-space-around mb-5">
          <h2
            v-if="item.quantity > 0"
            class="text-h5"
          >
            {{ item.name }}
          </h2>
        </div>

        <span class="d-flex justify-space-around align-center">
          <v-img
            :class="item.quantity > 0 ? '' : 'shadow'"
            min-width="100px"
            max-width="100px"
            :src="getGemImage(item)"
          />
          <p v-if="item.quantity > 0">{{ item.description }}</p>
          <p v-else>???</p>
        </span>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { gemDirectory } from '@/composables/useItemList.js'
import { loadData, saveData } from '@/composables/useLocalStorage.js'
import { onMounted, watch } from 'vue'

onMounted(() => {
  const savedGems = loadData('savedGems')

  if (savedGems) {
    gemDirectory.value = savedGems
  }
})

watch(gemDirectory, (newValue) => {
    saveData('savedGems', newValue);
  }, { deep: true });

const getGemImage = ({path}) => {
  return new URL(`../assets/items/gem/${path}.png`, import.meta.url).href
}
</script>