<template>
  <v-row style="max-width: 400px;">
    <v-col>
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="grey"
        class="mb-5"
        prepend-icon="mdi-arrow-left"
        text="Back To Menu"
        @click="emit('leave-scene')"
      />

      <div class="d-flex justify-center flex-grow-1">
      <v-icon
        size="35"
        class="mr-2"
      >
        mdi-hanger
      </v-icon>
      <h2 class="text-h4 mb-3">
        Equipment
      </h2>
    </div>
    </v-col>

    <v-col
      v-for="(item, index) in equipmentDirectory"
      :key="item.name"
      cols="12"
    >
      <v-sheet
        class="pa-6"
        elevation="4"
        color="blue-grey-darken-4"
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

const emit = defineEmits(['leave-scene'])

onMounted(() => {
  const savedEquipment = loadData('savedEquipment')

  if (savedEquipment) {
    equipmentDirectory.value = sortByQuantity(savedEquipment)
  }
})

</script>