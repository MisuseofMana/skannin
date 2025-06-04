<template>
  <v-container
    max-width="900px"
    class="pa-10"
  >
    <WelcomeCard
      v-if="!startedGame"
      @bypass-start="startedGame = true"
    />
    <v-card
      v-else
      class="pa-10"
    >
      <Fragments />

      <MenuButtons />

      <Battle v-show="currentScene === 'battle'" />
      <Shop v-show="currentScene === 'shop'" />
      <Nursery v-show="currentScene === 'nursery'" />
      <BloodSport v-show="currentScene === 'bloodsport'" />
      <Monsters v-show="currentScene === 'monsters'" />
      <Consumables v-show="currentScene === 'consumable'" />
      <Equipment v-show="currentScene === 'equipment'" />
    </v-card>
  </v-container>
</template>

<script setup>
import {ref, computed, onMounted, watch, useTemplateRef} from 'vue'
import { useRandomNumber, useInterpretNumber } from '@/composables/useNumberInterpretor.js'
import { monsterDirectory } from '@/composables/useMonsterList.js'
import { loadData, saveData } from '@/composables/useLocalStorage.js'

const startedGame = ref(false)

const currentScene = ref('')
const scannerComponent = useTemplateRef('scannerRef')
const scannerResult = ref(null)
const activeTab = ref('scanner')

const decodedText = ref('')

const interpretScanResult = (result = useRandomNumber()) => {
	const {directory, index} = useInterpretNumber(result)
	directory[index].quantity += 1
  scannerResult.value = directory[index]
}

</script>
