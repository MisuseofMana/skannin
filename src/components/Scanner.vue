<template>
  <v-container max-width="900px" class="pa-10">
    <!-- try this one instead -->
    <!-- https://www.npmjs.com/package/@teckel/vue-barcode-reader -->
    <ScannerInterface />
<div v-if="scanned<Monster" class="mb-10">
  <h1 class="text-h2">You summoned a {{scannedMonster.type}} type named {{ scannedMonster.name }}.</h1>
  <img width="300" min-width="300px" :src="getMonsterImage(scannedMonster)"/>
  <v-btn color="secondary" @click="bootUpScanner">
    Scan Another Barcode!
  </v-btn>
</div>

<v-card>
  <v-tabs
      v-model="activeTab"
      :items="tabsList"
      align-tabs="center"
      bg-color="grey-darken-4"
      slider-color="secondary"
      stacked
    >
      <template v-slot:tab="{ item }">
        <v-tab
          :prepend-icon="item.icon"
          :text="item.text"
          :value="item.value"
          class="text-none"
        ></v-tab>
      </template>

      <template v-slot:item="{ item }">
        <v-tabs-window-item :value="item.value" class="pa-4">
          <Monsters v-show="item.value === 'monsters'"/>
          <Consumables v-show="item.value === 'consumable'"/>
          <Equipment v-show="item.value === 'equipment'"/>
          <Books v-show="item.value === 'books'"/>
          <Gems v-show="item.value === 'gems'"/>
        </v-tabs-window-item>
      </template>
    </v-tabs>
</v-card>

<v-row>
  <v-col v-for="(item, index) in bookDirectory" :key="item.name" cols="12" md="6">
    <v-sheet class="pa-6"
    elevation="4"
    rounded>
      <div class="d-flex justify-space-between mb-5">
        <h2 v-if="item.quantity >= 0" class="text-h4">{{ item.name }}</h2>
        <h2 class="text-h4" v-else>???</h2>
      </div>

      <span v-if="item.quantity >= 0">
        <v-row class="d-flex justify-space-between mb-5">
          <v-col>
            <v-img min-width="200px" :src="getBookImage(item)"/>
          </v-col>
          <v-col>
            <p>{{ item.description }}</p>
          </v-col>
        </v-row>
      </span>
      <span v-else>
        ???
      </span>
    </v-sheet>
  </v-col>
</v-row>
  </v-container>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue'

import { monsterDirectory } from '@/composables/useMonsterList.js'

import { StreamBarcodeReader } from '@teckel/vue-barcode-reader'

const scanStatus = ref('')
const scannedMonster = ref(null)
const successfulScan = ref(false)
const priorScans = ref([])
const scannerActive = ref(false)
const seed = ref(0)

const tabsList = ref([
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
const activeTab = ref('monsters')

const decodedText = ref('')

const scannerReady = computed(() => {
return scannerActive.value && scannedMonster.value === null
})

onMounted(() => {
  const savedMonsters = loadData('savedMonsterDirectory')
  const savedScans = loadData('savedPriorScans')
  const savedSeed = loadData('savedSeed')
  if (savedMonsters) {
    monsterLookup.value = savedMonsters
  }
  if (savedScans) {
    priorScans.value = savedScans
  }
  if (savedSeed) { 
    seed.value = savedSeed
  }
  else {
    saveData('savedSeed', Math.floor(Math.random() * (25 - 0 + 1)) + 0)
  }
})

const bootUpScanner = () => {
  scannerActive.value = true
  scannedMonster.value = null
  successfulScan.value = false
}

const onDecode = (result) => {
if (successfulScan.value === true) {
  console.log('good scan')
  return
}
if (priorScans.value.includes(result)) {
  scanStatus.value = "You already scanned that. Try something else."
  return
}
generateMonster(result)
}

const onLoaded = (result) => {
  console.log('scanner is activated')
  scannerActive.value = true
}

watch(monsterDirectory, (newValue) => {
    saveData('monsterDirectory', newValue);
  }, { deep: true });

const onError = (error) => {
  console.log('failed scan')
  scanStatus.value = error
}

const generateMonster = (result) => {
console.log('generating monster')
priorScans.value.push(result)
localStorage.savedPriorScans = priorScans.value
let sum = sumDigits(result + seed.value)

if (sum > monsterDirectory.value.length) {
  sum = sum % monsterDirectory.value.length
}

if (monsterDirectory.value[sum].currentLevel < 3){
  monsterDirectory.value[sum].currentLevel += 1
}

scannedMonster.value = monsterDirectory.value[sum]
successfulScan.value = true
}

const sumDigits = (number) => {
let sum = 0;
const numStr = Math.abs(number).toString(); // Convert to string and handle negative numbers

for (let i = 0; i < numStr.length; i++) {
  sum += parseInt(numStr[i]); // Parse each digit and add to sum
}

return sum;
}

watch(priorScans, (newValue) => {
  saveData('priorScans', newValue);
}, { deep: true });

const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadData = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};
</script>
