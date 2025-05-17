<template>
  <v-row class="my-5">
    <v-col cols="12">
      <h1 class="text-amber text-center text-h5 mb-5">
        Scan a barcode.
      </h1>
      <p class="text-red">
        {{ scanStatus }}
      </p>
      <ScannerOutput :scanner-result="scannerResult" />
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

import { monsterDirectory } from '@/composables/useMonsterList.js'
import { useRandomNumber, useInterpretNumber } from '@/composables/useNumberInterpretor.js'

const successfulScan = ref(false)
const scannerResult = ref(null)
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
    saveData('savedSeed', useRandomNumber())
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

const sumDigits = (number) => {
  let sum = 0;
  const numStr = Math.abs(number).toString(); // Convert to string and handle negative numbers

  for (let i = 0; i < numStr.length; i++) {
    sum += parseInt(numStr[i]); // Parse each digit and add to sum
  }

  return sum;
}

const interpretScanResult = (result = useRandomNumber()) => {

	useInterpretNumber(result)
  priorScans.value.push(result)
  console.log('seed', seed.value)
  console.log('result', result)
  console.log('combined', result + seed.value)
  let sum = sumDigits(result + seed.value)
  console.log('sum', sum)


  if (sum > monsterDirectory.value.length) {
    sum = sum % monsterDirectory.value.length
  }

  if (monsterDirectory.value[sum].currentLevel < 3){
    monsterDirectory.value[sum].currentLevel += 1
  }

  scannerResult.value = monsterDirectory.value[sum]
  successfulScan.value = true
}

defineExpose({
  interpretScanResult,
})

watch(priorScans, (newValue) => {
  saveData('savedPriorScans', newValue);
}, { deep: true });
</script>