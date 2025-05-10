<template>
<v-row>
  <v-col v-for="(item, index) in equipmentDirectory" :key="item.name" cols="12" md="4">
    <v-sheet class="pa-6"
    elevation="4"
    rounded>
      <div class="d-flex justify-space-between mb-5">
        <h2 class="text-h5" v-if="item.quantity > 0" :class="item.quantity <= 0 ">{{ item.name }} - {{ item.quantity }} owned</h2>
      </div>

      <span class="d-flex justify-space-around align-center">
        <v-img :class="item.quantity > 0 ? '' : 'shadow'" min-width="100px" max-width="100px" :src="getEquipmentImage(item)"/>
        <p v-if="item.quantity > 0">{{ item.description }}</p>
        <p v-else>???</p>
      </span>
    </v-sheet>
  </v-col>
</v-row>
</template>

<script setup>
import { equipmentDirectory } from '@/composables/useItemList.js'

const getEquipmentImage = ({path}) => {
  return new URL(`../assets/items/equipment/${path}.png`, import.meta.url).href
}

</script>