<template>
  <v-container
    max-width="900px"
    class="pa-10"
  >
    <!-- try this one instead -->
    <!-- https://www.npmjs.com/package/@teckel/vue-barcode-reader -->
    <v-btn
      v-if="debugMode"
      size="large"
      color="amber-accent-4"
      class="mb-5"
      @click="scannerComponent.interpretScanResult(getRandom13DigitNumber())"
    >
      Simulate Scanner Generation
    </v-btn>

    <v-card>
      <v-tabs
        v-model="activeTab"
        :items="tabsList"
        align-tabs="center"
        bg-color="grey-darken-4"
        slider-color="secondary"
        stacked
      >
        <template #tab="{ item }">
          <v-tab
            :prepend-icon="item.icon"
            :text="item.text"
            :value="item.value"
            class="text-none"
          />
        </template>

        <template #item="{ item }">
          <v-tabs-window-item
            :value="item.value"
            class="pa-4"
          >
            <ScannerInterface
              v-if="item.value == 'scanner'"
              ref="scannerRef"
            />
            <Monsters v-if="item.value === 'monsters'" />
            <Consumables v-if="item.value === 'consumable'" />
            <Equipment v-if="item.value === 'equipment'" />
            <Books v-if="item.value === 'books'" />
            <Gems v-if="item.value === 'gems'" />
          </v-tabs-window-item>
        </template>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script setup>
import { useMagicKeys, whenever} from '@vueuse/core'
import {ref, computed, onMounted, watch, useTemplateRef} from 'vue'
const scannerComponent = useTemplateRef('scannerRef')

import { monsterDirectory } from '@/composables/useMonsterList.js'
const keys = useMagicKeys()

const shiftSpace = keys['Shift+space']
const debugMode = ref(true)

watch(shiftSpace, (v) => {
  if (v)
  debugMode.value = !debugMode.value  
})

const tabsList = ref([
  {
    icon: 'mdi-barcode-scan',
    text: 'Scanner',
    value: 'scanner'
  },
  {
    icon: 'mdi-emoticon-devil',
    text: 'Monsters',
    value: 'monsters',
  },
  {
    icon: 'mdi-food-drumstick',
    text: 'Consumable',
    value: 'consumable',
  },
  {
    icon: 'mdi-sword',
    text: 'Equipment',
    value: 'equipment',
  },
  {
    icon: 'mdi-book',
    text: 'Books',
    value: 'books',
  },
  {
    icon: 'mdi-diamond-stone',
    text: 'Gems',
    value: 'gems',
  },
])
const activeTab = ref('scanner')

const decodedText = ref('')

const getMonsterImage = ({type, name}) => {
  return new URL(`../assets/monsters/${type}/${name}.png`, import.meta.url).href
}

const sumDigits = (number) => {
let sum = 0;
const numStr = Math.abs(number).toString(); // Convert to string and handle negative numbers

for (let i = 0; i < numStr.length; i++) {
  sum += parseInt(numStr[i]); // Parse each digit and add to sum
}

return sum;
}

</script>
