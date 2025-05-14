<template>
  <v-row class="my-5">
    <v-col cols="12">
      <h1 class="text-amber text-center text-h5">
        Scan a barcode.
      </h1>
      <p class="text-red">
        {{ scanStatus }}
      </p>
      <ScannerOutput :scanned-monster="scannedMonster" />
    </v-col>
    <v-col
      cols="12"
      md="12"
      class="mb-10"
      align="center"
    >
      <v-progress-circular
        v-if="!scannerReady"
        indeterminate
      />
      <StreamBarcodeReader
        no-front-cameras
        @decode="onDecode"
        @loaded="onLoaded"
      />
    </v-col>
  </v-row>    
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { StreamBarcodeReader } from '@teckel/vue-barcode-reader'
import { loadData, saveData } from '@/composables/useLocalStorage.js'

const successfulScan = ref(false)
const scannedMonster = ref(null)
const scannerReady = ref(false)
const scanStatus = ref('')
const priorScans = ref([])
const seed = ref(0)

onMounted(() => {
  const savedScans = loadData('savedPriorScans')
  const savedSeed = loadData('savedSeed')
  if (savedScans) {
    priorScans.value = savedScans
  }
  if (savedSeed) { 
    seed.value = savedSeed
  }
  else {
    saveData('savedSeed', getRandom13DigitNumber())
  }
})

const onLoaded = () => {
  scannerReady.value = true
}

const onDecode = (result) => {
if (successfulScan.value === true) {
  console.log('scan already decoding')
  return
}
if (priorScans.value.includes(result)) {
  scanStatus.value = "That barcode has already been scanned. Try another one."
  return
}
interpretScanResult(result)
}

const interpretScanResult = (result) => {
priorScans.value.push(result)
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

defineExpose({
  interpretScanResult,
})

const getRandom13DigitNumber = () => {
  const min = 1000000000000; // Minimum 13-digit number
  const max = 9999999999999; // Maximum 13-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

watch(priorScans, (newValue) => {
  saveData('savedPriorScans', newValue);
}, { deep: true });
</script>