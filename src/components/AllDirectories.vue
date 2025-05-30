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
      <ScannerOutput
        v-if="scannerResult !== null"
        :scanner-result="scannerResult"
        @clear-scan-result="scannerResult = null"
      />
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
            <Battle v-show="item.value === 'battle'" />
            <Monsters v-show="item.value === 'monsters'" />
            <Consumables v-show="item.value === 'consumable'" />
            <Equipment v-show="item.value === 'equipment'" />
            <!-- <Books v-show="item.value === 'books'" /> -->
          </v-tabs-window-item>
        </template>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script setup>
import {ref, computed, onMounted, watch, useTemplateRef} from 'vue'
import { useRandomNumber, useInterpretNumber } from '@/composables/useNumberInterpretor.js'
import { monsterDirectory } from '@/composables/useMonsterList.js'
import { loadData, saveData } from '@/composables/useLocalStorage.js'

const startedGame = ref(false)

const scannerComponent = useTemplateRef('scannerRef')
const scannerResult = ref(null)

const tabsList = ref([
  {
    icon: 'mdi-sword-cross',
    text: 'Battle',
    value: 'battle'
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
  // {
  //   icon: 'mdi-book',
  //   text: 'Books',
  //   value: 'books',
  // },
])
const activeTab = ref('scanner')

const decodedText = ref('')

const interpretScanResult = (result = useRandomNumber()) => {
	const {directory, index} = useInterpretNumber(result)
	directory[index].quantity += 1
  scannerResult.value = directory[index]
}

</script>
