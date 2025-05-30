<template>
  <v-row>
    <v-col
      v-for="(item, index) in equipmentDirectory"
      :key="item.name"
      cols="12"
      md="6"
    >
      <v-sheet
        class="pa-6"
        elevation="4"
        height="100%"
        rounded
      >
        <div class="d-flex justify-space-between mb-5">
          <h2
            v-if="item.quantity > 0"
            class="text-h5"
          >
            {{ item.name }}
          </h2>
          <h2
            v-if="item.quantity > 0"
            class="text-h5"
          >
            x{{ item.quantity }} owned
          </h2>
        </div>

        <span class="d-flex justify-space-around align-center">
          <v-img
            :class="item.quantity > 0 ? '' : 'shadow'"
            min-width="100px"
            max-width="100px"
            :src="useGetImage(item)"
          />
          <p v-if="item.quantity > 0">{{ item.description }}</p>
          <p v-else>???</p>
        </span>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { equipmentDirectory } from '@/composables/useItemList.js'
import { loadData, saveData } from '@/composables/useLocalStorage.js'
import { onMounted } from 'vue'
import { useGetImage } from '@/composables/useImageRoute.js'
import { sortByQuantity } from '@/composables/useSorting.js'

onMounted(() => {
  const savedEquipment = loadData('savedEquipment')

  if (savedEquipment) {
    equipmentDirectory.value = sortByQuantity(savedEquipment)
  }
})

</script>