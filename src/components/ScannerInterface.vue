<template>
    <v-row v-if="!scannerReady && !scannedMonster" class="mb-3">
        <v-spacer/>
        <v-col cols="12">
            <v-btn color="secondary" width="100%" size="x-large" @click="bootUpScanner">
                Boot Up The Scanner
            </v-btn>
        </v-col>
        <v-spacer/>
    </v-row>

    <v-row v-if="scannerReady">
      <v-col cols="12">
        <p class="text-green">Scanner Active</p>
        <h1>Scan a barcode to find monsters or items.</h1>

        <p class="text-red">{{ scanStatus }}</p>
        <p class="text-green">{{ decodedText }}</p>

      </v-col>
      <v-col cols="12" md="12">
        <StreamBarcodeReader
          no-front-cameras
          @decode="onDecode"
          @loaded="onLoaded"
        />
        </v-col>
    </v-row>    
</template>

<script setup>

</script>