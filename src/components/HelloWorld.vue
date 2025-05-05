<template>
  <v-container max-width="900px" class="pa-10">
    <!-- try this one instead -->
    <!-- https://www.npmjs.com/package/@teckel/vue-barcode-reader -->
    <v-row v-if="!scannerReady" class="mb-3">
      <v-col cols="12">
        <v-btn @click="bootUpScanner">
          Boot Up Scanner
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="scannerReady">
      <v-col cols="12" md="6">
        <p class="text-green">Scanner Active</p>
        <h1>SCAN A BARCODE</h1>

        <p class="text-green">{{ decodedText }}</p>

      </v-col>
      <v-col cols="12" md="6">
        <StreamBarcodeReader
          torch
          no-front-cameras
          @decode="onDecode"
          @loaded="onLoaded"
        />
        </v-col>
    </v-row>

<div v-if="scannedMonster" class="mb-10">
  <h1>YOU SUMMONED...</h1>
  <img :src="scannedMonster?.images[scannedMonster.level]"/>
  <h2>{{ scannedMonster.name }}</h2>
  <p>Monster Level: {{scannedMonster.currentLevel}}</p>
  <div style="display:flex;">
    <p style="margin-right:10px;">ATTACK: {{ scannedMonster.attack }}</p>
    <p>DEFENSE: {{ scannedMonster.defense }}</p>
  </div>
  <p>{{ scannedMonster.specialInfo }}</p>
</div>

<v-row>
  <v-col v-for="(monster, index) in monsterLookup" :key="monster.name" cols="4">
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
    elevation="4"
    height="250"
    max-width="800"
    width="100%"
    rounded>
      <span v-if="monster.currentLevel > 0">    
        <h3># {{ index + 1 }} {{ monster.name }}</h3>
        <p>Attack: {{ monster.attack }}</p>
        <p>Defense: {{ monster.defense }}</p>
      </span>
      <span v-else class="text-h1">
        ?
      </span>
    </v-sheet>
  </v-col>
</v-row>
  </v-container>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue'

import { StreamBarcodeReader } from '@teckel/vue-barcode-reader'

const scanStatus = ref('')
const scannedMonster = ref(null)
const successfulScan = ref(false)
const priorScanCatalogue = ref([])
const scannerActive = ref(false)
const gameSeed = ref(0)

const decodedText = ref('')

const scannerReady = computed(() => {
return scannerActive.value && scannedMonster.value === null
})

const monsterLookup = ref([
{
  currentLevel: 0,
  name: "Falco",
  images: ["", "", ""],
  attack: 5,
  defense: 3,
  specialInfo: "Can summon a wind vortex to disorient foes."
},
{
  currentLevel: 0,
  name: "Gargoyle",
  images: ["", "", ""],
  attack: 4,
  defense: 3,
  specialInfo: "Petrifies enemies with a stone gaze."
},
{
  currentLevel: 0,
  name: "Octeye",
  images: ["", "", ""],
  attack: 8,
  defense: 2,
  specialInfo: "Shoots venomous projectiles from its multiple eyes."
},
{
  currentLevel: 0,
  name: "Vortex",
  images: ["", "", ""],
  attack: 10,
  defense: 3,
  specialInfo: "Creates a powerful windstorm to knock back opponents."
},
{
  currentLevel: 0,
  name: "Magi",
  images: ["", "", ""],
  attack: 2,
  defense: 1,
  specialInfo: "Casts illusions to confuse enemies."
},
{
  currentLevel: 0,
  name: "Grendel",
  images: ["", "", ""],
  attack: 8,
  defense: 3,
  specialInfo: "Unleashes a blade storm with its sharp claws."
},
{
  currentLevel: 0,
  name: "Junkyard",
  images: ["", "", ""],
  attack: 6,
  defense: 1,
  specialInfo: "Disassembles enemy weapons with a magnetic pulse."
},
{
  currentLevel: 0,
  name: "Aprina",
  images: ["", "", ""],
  attack: 4,
  defense: 1,
  specialInfo: "Welds metal together to form protective barriers."
},
{
  currentLevel: 0,
  name: "Gearhead",
  images: ["", "", ""],
  attack: 7,
  defense: 1,
  specialInfo: "Throws grenades with pinpoint accuracy."
},
{
  currentLevel: 0,
  name: "Cyball",
  images: ["", "", ""],
  attack: 8,
  defense: 3,
  specialInfo: "Disintegrates obstacles with a focused laser beam."
},
{
  currentLevel: 0,
  name: "Webhog",
  images: ["", "", ""],
  attack: 1,
  defense: 1,
  specialInfo: "Lashes out with a sticky tongue to trap foes."
},
{
  currentLevel: 0,
  name: "Spyticus",
  images: ["", "", ""],
  attack: 5,
  defense: 2,
  specialInfo: "Envelops enemies in a web of acidic strands."
},
{
  currentLevel: 0,
  name: "Bog",
  images: ["", "", ""],
  attack: 3,
  defense: 2,
  specialInfo: "Emits a toxic grip to immobilize adversaries."
},
{
  currentLevel: 0,
  name: "Spike",
  images: ["", "", ""],
  attack: 6,
  defense: 1,
  specialInfo: "Impales enemies with sharp, retractable spikes."
},
{
  currentLevel: 0,
  name: "Minotaur",
  images: ["", "", ""],
  attack: 5,
  defense: 1,
  specialInfo: "Tramples opponents with its massive hooves."
},
{
  currentLevel: 0,
  name: "Screech",
  images: ["", "", ""],
  attack: 6,
  defense: 3,
  specialInfo: "Emits a high-pitched scream to disorient foes."
},
{
  currentLevel: 0,
  name: "Grizzler",
  images: ["", "", ""],
  attack: 7,
  defense: 2,
  specialInfo: "Snare enemies with its powerful jaws."
},
{
  currentLevel: 0,
  name: "Sherpa",
  images: ["", "", ""],
  attack: 2,
  defense: 3,
  specialInfo: "Spins a shield to deflect incoming attacks."
},
{
  currentLevel: 0,
  name: "Thugly",
  images: ["", "", ""],
  attack: 4,
  defense: 1,
  specialInfo: "Backstabs enemies with a hidden blade."
},
{
  currentLevel: 0,
  name: "Frenzy",
  images: ["", "", ""],
  attack: 5,
  defense: 3,
  specialInfo: "Engages in a feeding frenzy to overwhelm opponents."
},
{
  currentLevel: 0,
  name: "Cataclysm",
  images: ["", "", ""],
  attack: 7,
  defense: 2,
  specialInfo: "Drains life force with a devastating headlock."
},
{
  currentLevel: 0,
  name: "Yeti",
  images: ["", "", ""],
  attack: 4,
  defense: 1,
  specialInfo: "Crushes enemies with a massive snowball."
},
{
  currentLevel: 0,
  name: "Ogriff",
  images: ["", "", ""],
  attack: 6,
  defense: 3,
  specialInfo: "Unleashes a sonic boom to shatter defenses."
},
{
  currentLevel: 0,
  name: "Megapede",
  images: ["", "", ""],
  attack: 6,
  defense: 1,
  specialInfo: "Skewers foes with its segmented body."
},
{
  currentLevel: 0,
  name: "Zolar",
  images: ["", "", ""],
  attack: 6,
  defense: 2,
  specialInfo: "Blinds enemies with a solar flare."
},
])

onMounted(() => {
  const savedMonsters = loadData('monsterLookup')
  const oldScans = loadData('priorScanCatalogue')
  const seed = loadData('seed')
  if (savedMonsters) {
    monsterLookup.value = savedMonsters
  }
  if (oldScans) {
    priorScanCatalogue.value = oldScans
  }
  if (seed) { 
    gameSeed.value = seed
  }
  else {
    saveData('seed', Math.floor(Math.random() * (25 - 0 + 1)) + 0)
  }
})

const bootUpScanner = () => {
  scannerActive.value = true
  scannedMonster.value = null
  successfulScan.value = false
}

const onDecode = (result) => {
if (successfulScan.value === true) {
  return
}
if (priorScanCatalogue.value.includes(result)) {
  console.log('already scanned')
  scanStatus.value = "You already scanned that. Try something else."
  return
}
generateMonster(result)
}

const onLoaded = (result) => {
  scannerActive.value = true
}

const onError = (error) => {
  scanStatus.value = error
}

const generateMonster = (result) => {
priorScanCatalogue.value.push(result)
localStorage.priorScanCatalogue = priorScanCatalogue.value
let sum = sumDigits(result + gameSeed.value)

if (sum > monsterLookup.value.length) {
  sum = sum % monsterLookup.value.length
}

if (monsterLookup.value[sum].currentLevel < 3){
  monsterLookup.value[sum].currentLevel += 1
}

scannedMonster.value = monsterLookup.value[sum]
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

watch(monsterLookup, (newValue) => {
  saveData('monsterLookup', newValue);
}, { deep: true });

watch(priorScanCatalogue, (newValue) => {
  saveData('priorScanCatalogue', newValue);
}, { deep: true });

const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadData = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};
</script>
