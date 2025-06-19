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

    <div class="d-flex justify-center align-center mb-2">
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
    <p class="text-body-2 text-center mb-5">
      New foe available in {{ timeLeft.minutes }}m {{ timeLeft.seconds }}s
    </p>
    <v-img
      aspect-ratio="1.5"
      :src="useEventImage({folderName: 'bloodsport', fileName: sceneScript[sceneNumber].imagePath})"
    />
    <div class="text-body-1 text-center mb-5">
      <p
        class="py-3 px-8"
        style="minHeight:75px; backgroundColor: black;"
      >
        {{ sceneScript[sceneNumber].text }}
      </p>
    </div>

    <p v-if="!currentOpponent" class="text-body-2 text-center mb-5 text-red-lighten-2">
      No opponent available right now.
    </p>

    <v-card
      v-if="currentOpponent"
      color="blue-grey-darken-4"
      class="pa-5 mb-5"
    >
      <div class="text-center mb-5">
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
      v-if="currentOpponent"
      color="blue-grey-darken-4"
      class="pa-5 mb-5"
    >
      <p class="text-h6 mb-3">
        Choose Your Fighter
      </p>
      <p
        v-if="monstersAbleToFight.length <= 0"
        class="text-body-2 text-center mb-5 text-red-lighten-2"
      >
        You have no monsters able to fight.
        <br>
        Visit the nursery to patch them up.
      </p>
      <v-select
        v-model="selectedMonster"
        :items="monstersAbleToFight"
        :disabled="monstersAbleToFight.length <= 0"
        :item-props="coerceMonstersDataForSelect"
        :menu-props="{
          scrim: true,
        }"
      >
        <template #item="{ props: itemProps, item }">
          <v-list-item
            v-bind="itemProps"
            title=""
            subtitle=""
          >
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="d-flex align-center text-body-1">
                  <p class="text-h6 mr-3">
                    {{ item.title }}
                  </p>
                  <p> Lvl {{ item.value.quantity }}</p>
                </div>
                <p>{{ item.value.stats.hp }} HP</p>
              </div>
              <v-img
                min-width="100px"
                max-width="100px"
                :src="useGetImage(item.value)"
              />
            </div>
          </v-list-item>
        </template>

        <template #selection="{ item, index }">
          <div class="d-flex align-center justify-space-between">
            <div class="mr-5">
              <div class="d-flex align-center">
                <p class="text-h6 mr-3">
                  {{ item.title }}
                </p>
                <p class="mr-3">
                  Lvl {{ item.value.quantity }}
                </p>
              </div>
              <p>{{ item.value.stats.hp }} HP</p>
            </div>
            <v-img
              min-width="75px"
              max-width="75px"
              class="mr-3"
              :src="useGetImage(item.value)"
            />
          </div>
        </template>
      </v-select>
    </v-card>

    <div
      v-if="currentOpponent"
      class="d-flex align-center justify-center"
    >
      <div>
        <p class="text-body-2 text-center mb-5 text-red-lighten-2">
          Choose your fighter to start the Bloodsport.
        </p>
        
        <v-btn
          class="mb-5"
          size="x-large"
          elevation="0"
          color="red"
          prepend-icon="mdi-sword"
          append-icon="mdi-sword"
          text="Begin Bloodsport"
          :variant="!selectedMonster ? 'outlined' : 'elevated'"
          :disabled="!selectedMonster"
          @click="startDeathmatch()"
        />
      </div>
    </div>
    
    <v-card
      color="blue-grey-darken-4"
      class="pa-5 mb-5 text-body-2"
      max-width="400px"
    >
      <p class="text-h5 mb-3">
        Surviving the Bloodsport
      </p>
      <div class="d-flex align-center justify-center">
        <v-img
          class="mr-5"
          max-width="150px"
          min-width="150px"
          src="@/assets/bloodsport/rps-wheel.png"
        />
        <p class="mb-3">
          Play rounds of rock, paper, scissors against your opponent to determine which monster gets hurt and by how much until one of the monsters is dead.
        </p>
      </div>
      <p class="mb-3">
        If you win a round, you'll deal damage to your opponent.
      </p>
      <p class="mb-3">
        If you tie a round, you'll both deal reduced damage to each other.
      </p>
      <p>
        If you lose a round, your monster will take damage.
      </p>
      <div class="d-flex align-center justify-center">
        <p class="mb-3">
          Monsters have different elemental strengths and weaknesses. If a monster takes damage from an element it's weak to, it will take extra damage. The level of a monster and it's equipment also determine how much damage it can deal and take.
        </p>
        <v-img
          class="mx-auto mb-3"
          max-width="150px"
          min-width="150px"
          src="@/assets/bloodsport/monster-type-wheel.png"
        />
      </div>
      <p class="mb-3">
        If your monster comes out alive, even just with one HP, you'll claim the winnings. If your monster dies, the winnings are lost and it will cost a hefty fee to bring your monster back from the brink of death.
      </p>
      <p class="mb-3">
        And you'll probably lose the little guys respect too.
      </p>
      <div />
    </v-card>
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

const localRefreshDate = ref(null)

const timeLeft = ref({
  minutes: 0,
  seconds: 0,
});

const selectedMonster = ref(null)

const coerceMonstersDataForSelect = (monster) => {
  return {
    title: monster.name,
    subtitle: monster.stats.hp
  }
}

const emit = defineEmits(['leave-scene', 'start-deathmatch'])

const currentOpponent = ref(null)
const currentWinnings = ref(null)
const currentFrags = ref(null)

const monstersAbleToFight = computed(() => {
  return monsterDirectory.value.filter(monster => 
    !monster.nurseryData?.isInNursery && monster.stats.hp > 0 &&  monster.quantity > 0
  )
})

const generateFight = () => {
  const randomOpponent = monsterDirectory.value[useRandomNumber(0, monsterDirectory.value.length - 1)]
  const cloneOpponent = JSON.parse(JSON.stringify(randomOpponent))

  cloneOpponent.quantity = useRandomNumber(1, 3)
  cloneOpponent.stats.hp = cloneOpponent.stats.hp * cloneOpponent.quantity
  cloneOpponent.stats.maxhp = cloneOpponent.stats.hp
  
  const itemsAndEquipment = [...consumableDirectory.value, ...equipmentDirectory.value]
  const randomItemOrEquipment = itemsAndEquipment[useRandomNumber(0, itemsAndEquipment.length - 1)]
  const cloneWinning = JSON.parse(JSON.stringify(randomItemOrEquipment))
  
  const playerLevel = calculatePlayerLevel()
  const calculatedFrags = Math.floor(cloneOpponent.stats.hp + playerLevel * 1.15)

  currentOpponent.value = cloneOpponent
  currentWinnings.value = cloneWinning
  currentFrags.value = calculatedFrags
  
  saveData('savedBloodSportFight', {
    opponent: cloneOpponent,
    winnings: cloneWinning,
    frags: calculatedFrags
  })

  const now = new Date()
  const newFightDate = new Date(now.getTime() + 60 * 30 * 1000)
  localRefreshDate.value = newFightDate
  saveData('bloodSportRefreshDate', newFightDate)
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
  window.scrollTo(0,0)
  const deathmatchWon = loadData('deathmatchWon')
  if (deathmatchWon === true) {
    sayWonFight()
  }
  else if (deathmatchWon === false) {
    sayLostFight()
  }
  else {
    sayGreeting()
  }

  saveData('deathmatchWon', null)
  const now = new Date()
  const savedFight = loadData('savedBloodSportFight')
  const fightRefreshDate = loadData('bloodSportRefreshDate')

  if (fightRefreshDate) {
    localRefreshDate.value = fightRefreshDate
  }

  updateCountdown();
  countdownInterval = setInterval(() => updateCountdown(), 1000);

  if (savedFight != null) {
    currentOpponent.value = savedFight.opponent
    currentWinnings.value = savedFight.winnings
    currentFrags.value = savedFight.frags
  }
  else {
    currentOpponent.value = null
    currentWinnings.value = null
    currentFrags.value = null
  }

  if ((fightRefreshDate && now > fightRefreshDate) || !fightRefreshDate) {
    generateFight()
  }
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

const calculatePlayerLevel = () => {
  let playerLevel = 0
  monsterDirectory.value.forEach(monster => {
    playerLevel += monster.quantity
  })
  return playerLevel
}

const startDeathmatch = () => {
  if (!selectedMonster.value) return
  emit('start-deathmatch', {
    monster: selectedMonster.value,
    opponent: currentOpponent.value,
    winnings: currentWinnings.value,
    frags: currentFrags.value,
  })
}

const sayGreeting = () => {
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

const updateCountdown = () => {
  const totalTimeLeft = new Date(localRefreshDate.value) - Date.now();

  if (totalTimeLeft > 0) {
    timeLeft.value = {
      minutes: Math.floor((totalTimeLeft / (1000 * 60)) % 60),
      seconds: Math.floor((totalTimeLeft / 1000) % 60),
    };
  } else {
    generateFight()
  }
}

</script>