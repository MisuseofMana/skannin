<template>
  <div style="max-width: 400px;">
    <v-btn
      class="mb-5"
      size="x-large"
      width="100%"
      elevation="0"
      color="grey"
      prepend-icon="mdi-arrow-left"
      text="Back To Menu"
      @click="sayGoodbye()"
    />

    <div class="d-flex justify-center align-center flex-grow-1 mb-5">
      <v-icon
        size="35"
        class="mr-2"
      >
        mdi-sword
      </v-icon>
      <h2 class="text-h4">
        Blood Sport
      </h2>
    </div>
    <v-img
      :src="useEventImage({folderName: 'bloodsport', fileName: sceneScript[sceneNumber].imagePath})"
    />
    <div class="text-body-1 text-center mb-5">
      <p
        class="py-3 px-8"
        style="minHeight:75px; min-width: 400px; backgroundColor: black;"
      >
        {{ sceneScript[sceneNumber].text }}
      </p>
    </div>

    <!-- <v-btn
    color="red"
    class="mb-5"
    rounded="xl"
      @click="clearBloodsportData()"
    >
    Clear Bloodsport Data
    </v-btn> -->
    <v-card
      v-if="currentOpponent"
      color="blue-grey-darken-4"
      class="pa-5 mb-5"
    >
      <div class="text-center mb-5">
        <p class="text-body-2">
          New foe available in {{ timeUntilNextFight }}
        </p>
        <p class="text-h5 text-center">
          Currently Up Against...
        </p>
      </div>
      <div
        class="d-flex align-start justify-space-around mb-5"
      >
        <v-img
          max-width="150px"
          :src="useGetImage(currentOpponent)"
        />
        <div>
          <p class="text-h5">
            {{ currentOpponent.name }}
          </p>
          <p class="text-body-1 mb-2">
            Level {{ currentOpponent.quantity }}
          </p>
          <p class="text-h4">
            {{ currentOpponent.stats.hp }} HP
          </p>
        </div>
      </div>
      <div class="text-center mb-3">
        <p class="text-h5 text-center">
          Winnings
        </p>
      </div>
      <div class="d-flex align-center justify-center">
        <v-img
          max-width="100px"
          :src="useGetImage(currentWinnings)"
        />
        <div class="d-flex align-center justify-center">
          <v-img
            max-width="100px"
            min-width="100px"
            :src="useGetImage(fragmentDirectory[0])"
          />
          <p class="text-h4">
            x {{ currentFrags }}
          </p>
        </div>
      </div>
    </v-card>
    <v-card
      color="blue-grey-darken-4"
      class="pa-5 mb-5"
    >
      Choose Your Fighter
    </v-card>
    <v-btn
      class="mb-5"
      size="x-large"
      width="100%"
      elevation="0"
      color="red"
      prepend-icon="mdi-sword"
      append-icon="mdi-sword"
      text="Start Deathmatch"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import audio from '../assets/bloodsport/audio.wav'
import { useEventImage, useGetImage } from '@/composables/useImageRoute'
import { fragmentDirectory } from '@/composables/useItemList'
import { monsterDirectory } from '@/composables/useMonsterList'
import { equipmentDirectory, consumableDirectory } from '@/composables/useItemList'
import { useRandomNumber } from '@/composables/useNumberInterpretor'
import { loadData, saveData } from '@/composables/useLocalStorage'

const props = defineProps({
  sceneName: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['leave-scene'])

const currentOpponent = ref(null)
const currentWinnings = ref(null)
const currentFrags = ref(null)

const generateFight = () => {
  const savedFight = loadData('savedBloodSportFight')
  if (savedFight) {
    currentOpponent.value = savedFight.opponent
    currentWinnings.value = savedFight.winnings
    currentFrags.value = savedFight.frags
    return
  }

  const randomOpponent = monsterDirectory.value[useRandomNumber(0, monsterDirectory.value.length - 1)]
  const cloneOpponent = JSON.parse(JSON.stringify(randomOpponent))

  cloneOpponent.quantity = useRandomNumber(1, 3)
  cloneOpponent.stats.hp = cloneOpponent.stats.hp * cloneOpponent.quantity
  cloneOpponent.stats.maxhp = cloneOpponent.stats.hp
  
  const itemsAndEquipment = [...consumableDirectory.value, ...equipmentDirectory.value]
  const randomItemOrEquipment = itemsAndEquipment[useRandomNumber(0, itemsAndEquipment.length - 1)]
  const cloneWinning = JSON.parse(JSON.stringify(randomItemOrEquipment))
  
  currentOpponent.value = cloneOpponent
  currentWinnings.value = cloneWinning
  currentFrags.value = Math.ceil(cloneOpponent.stats.hp * 1.75)
  
  saveData('savedBloodSportFight', {
    opponent: cloneOpponent,
    winnings: cloneWinning,
    frags: Math.ceil(cloneOpponent.stats.hp * 1.75),
  })
}

const sceneNumber = ref(0)

const sceneScript = ref([
  {
    imagePath: `hand`,
    text: `Hey.`,
    audioTrack: 'hey',
  },
  {
    imagePath: `knife`,
    text: `You know this is a fight to the death, right?`,
    audioTrack: 'deathFight',
  },
  {
    imagePath: `hand`,
    text: `This isn't for the faint of heart.`,
    audioTrack: 'faintOfHeart',
  },
  {
    imagePath: `knife`,
    text: `Money up front.`,
    audioTrack: 'moneyFront',
  },
  {
    imagePath: `hand`,
    text: `Nice fight.`,
    audioTrack: 'niceFight',
  },
  {
    imagePath: `hand`,
    text: `Here's your winnings.`,
    audioTrack: 'winnings',
  },
  {
    imagePath: `hand`,
    text: `Oof, that was brutal.`,
    audioTrack: 'brutal',
  },
  {
    imagePath: `hand`,
    text: `You'll be back.`,
    audioTrack: 'beBack',
  },
])

let countdownInterval = null;

onMounted(() => {
  sayGreeting()
})

const narration = new Howl({
  src: [audio],
  sprite: {
    'hey': [35,455],
    'deathFight': [8587,2626],
    'faintOfHeart': [6030,2298],
    'moneyFront': [1826,996],
    'niceFight': [2954,870],
    'brutal': [3933,1866],
    'winnings': [680,1002],
    'beBack': [11311,1351],
  }
});

const playAudio = () => {
  narration.stop()
  if(props.sceneName != 'bloodsport') return
  narration.play(sceneScript.value[sceneNumber.value].audioTrack)
}

const sayGreeting = () => {
  generateFight()
  sceneNumber.value = useRandomNumber(0, 2)
  playAudio()
}

const playCantBuy = () => {
  sceneNumber.value = 3
  playAudio()
}

const sayWonFight = () => {
  sceneNumber.value = useRandomNumber(4, 5)
  playAudio()
}

const sayLostFight = () => {
  sceneNumber.value = 6
  playAudio()
}

const sayGoodbye = () => {
  sceneNumber.value = 7
  playAudio()
  emit('leave-scene')
}

const clearBloodsportData = () => {
  saveData('savedBloodSportFight', null)
  generateFight()
}
</script>