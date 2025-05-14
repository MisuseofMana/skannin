<template>
  <v-row>
    <v-col
      v-for="(item, index) in bookDirectory"
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
            :src="getBookImage(item)"
          />
          <p v-if="item.quantity > 0">{{ item.description }}</p>
          <p v-else>???</p>
        </span>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { bookDirectory } from '@/composables/useItemList.js'
import { loadData, saveData } from '@/composables/useLocalStorage.js'
import { onMounted, watch } from 'vue'

onMounted(() => {
  const bookData = loadData('savedBooks')

  if (bookData) {
    bookDirectory.value = bookData
  }
})

watch(bookDirectory, (newValue) => {
    saveData('savedBooks', newValue);
  }, { deep: true });

const getBookImage = ({path}) => {
  return new URL(`../assets/items/book/${path}.png`, import.meta.url).href
}
</script>