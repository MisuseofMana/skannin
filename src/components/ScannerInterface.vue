<template>
  <v-row class="my-5">
    <v-col cols="12">
      <h1 class="text-amber text-center text-h5 mb-5">
        Scan a barcode.
      </h1>
      <p class="text-red">
        {{ scanStatus }}
      </p>
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
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { StreamBarcodeReader } from '@teckel/vue-barcode-reader'
import { loadData, saveData } from '@/composables/useLocalStorage.js'

import { monsterDirectory } from '@/composables/useMonsterList.js'
import { bookDirectory, consumableDirectory, equipmentDirectory, fragmentDirectory } from "@/composables/useItemList";

const successfulScan = ref(false)
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

const checkOffset = (index) => {
  if (index === 0) return 'offset-2'
  else if (index % 4 === 0) return 'offset-2'
  return index === 0 || index % 4 === 0
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

defineExpose({
  interpretScanResult,
})

watch(priorScans, (newValue) => {
  saveData('savedPriorScans', newValue);
}, { deep: true });
</script>