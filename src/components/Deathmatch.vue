<template>
  <div v-if="localDeathmatchData">
    <p class="text-center text-red mb-2">
      There's no turning back, it's fight or die...
    </p>
    <div class="d-flex justify-center flex-grow-1">
      <v-icon
        size="35"
        class="mr-2"
        color="red"
      >
        mdi-liquid-spot
      </v-icon>
      <h2 class="text-h4 mb-3 text-red mr-2">
        DEATHMATCH
      </h2>
      <v-icon
        size="35"
        class="mr-2"
        color="red"
      >
        mdi-liquid-spot
      </v-icon>
    </div>

    <p class="text-center text-white text-h6 mb-3">Winner Takes All!</p>
      <div class="d-flex align-center justify-center mb-5">
        <v-img
          max-width="100px"
          :src="useGetImage(localDeathmatchData.winnings)"
        />
        <div class="d-flex align-center justify-center">
          <v-img
            max-width="100px"
            min-width="100px"
            :src="useGetImage(fragmentDirectory[0])"
          />
          <p class="text-h4">
            x {{ localDeathmatchData.frags }}
          </p>
        </div>
      </div>
    
    <div v-if="localDeathmatchData">
      <div class="d-flex align-center justify-space-between mb-4">
        <!-- you -->
        <v-card
          color="blue-grey-darken-4"
          class="pa-3 mr-2 w-50"
        >
          <p class="text-center text-white text-h6">
            YOU
          </p>
          <p class="text-center text-white text-body-2">
            lvl {{ localDeathmatchData.monster.quantity }}
          </p>
          <v-img
            aspect-ratio="1"
            :class="{'dead': youDied}"
            :src="useGetImage(localDeathmatchData?.monster)"
          />
          <v-icon
            id="yourBlood"
            color="red-darken-4"
            size="100"
            class="mb-2 position-absolute"
          >
            mdi-liquid-spot
          </v-icon>
          <p class="text-center text-white text-h5 mb-2">
            {{ localDeathmatchData.monster.stats.hp }} HP
          </p>
        </v-card>
        <v-card
          color="blue-grey-darken-4"
          class="pa-3 ml-2 w-50"
        >
          <p class="text-center text-white text-h6">
            FOE
          </p>
          <p class="text-center text-white text-body-2">
            lvl {{ localDeathmatchData.opponent.quantity }}
          </p>
          <v-img
            aspect-ratio="1"
            :class="{'dead': youWin}"
            :src="useGetImage(localDeathmatchData?.opponent)"
          />
          <v-icon
            id="opponentBlood"
            color="red-darken-4"
            size="100"
            class="mb-2 position-absolute"
          >
            mdi-liquid-spot
          </v-icon>
          <p class="text-center text-white text-h5 mb-2">
            {{ localDeathmatchData.opponent.stats.hp }} HP
          </p>
        </v-card>
      </div>

      <v-card
        color="blue-grey-darken-4"
        class="text-center py-5 mb-4"
      >
        <p class="text-center text-white text-body-1">
          {{ opponentReader }}
        </p>
      </v-card>

      <div class="d-flex justify-space-between mb-5">
        <v-card
          v-for="handType in handTypes"
          :key="handType"
          color="blue-grey-darken-2"
          :disabled="pause"
          @click="throwHand(handType)"
        >
          <v-img
            aspect-ratio="1"
            max-width="90px"
            min-width="90px"
            :src="useRPSImage(handType)"
          />
        </v-card>
      </div>
      <div
        v-if="turnLog.length > 0"
        class="text-center text-body-1"
      >
        <v-card
          v-for="turn in turnLog"
          :key="turn.id"
          color="blue-grey-darken-3 pa-3"
          class="mb-3"
        >
          <div class="d-flex align-center justify-space-between mb-3">
            <p>Hand {{ turn.roundNumber }} </p>
            <div class="d-flex align-center">
              <v-img
                aspect-ratio="1"
                max-width="60px"
                min-width="60px"
                :src="useRPSImage(turn.you)"
                :class="{'loseTint': turn.roundResult === 'Lose'}"
              />
              <p>vs.</p>
              <v-img
                aspect-ratio="1"
                max-width="60px"
                min-width="60px"
                :src="useRPSImage(turn.opponent)"
                :class="{'loseTint': turn.roundResult === 'Win'}"
              />
            </div>
            <p>{{ turn.roundResult }}</p>
          </div>
          <p
            v-if="turn.hint"
            class="text-center text-body-2"
          >
            {{ turn.hint }}
          </p>
          <p
            v-if="turn.defended && turn.roundResult != 'Win'"
            class="text-center text-body-2"
          >
            {{ turn.defended }}
          </p>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGetImage, useRPSImage } from '@/composables/useImageRoute'
import music from '../assets/bloodsport/music.wav'
import { loadData, saveData } from '@/composables/useLocalStorage'
import { onMounted, ref, watch } from 'vue'
import { useRandomNumber } from '@/composables/useNumberInterpretor'
import { monsterDirectory } from '@/composables/useMonsterList'
import { fragmentDirectory, equipmentDirectory, consumableDirectory } from '@/composables/useItemList'

import { animate } from 'animejs'

const props = defineProps({
  sceneName: {
    type: String,
    required: true,
  },
})

const localDeathmatchData = ref(null)
const pause = ref(false)
const youDied = ref(false)
const youWin = ref(false)

const emit = defineEmits(['leave-scene'])

const handTypes = ['Rock', 'Paper', 'Scissors']

const whichHandBeatsWhich = {
  Rock: 'Scissors',
  Paper: 'Rock',
  Scissors: 'Paper',
}

const opponentReaderLookup = {
  'Rock': [
    `Your foe is in a trance.`,
    `Your foe is bracing itself.`,
    `Your foe looks vacant.`,
    `Your foe is ignoring you.`,
    `Your foe is giving you the finger.`,
    `Your foe is glaring at you.`,
  ],
  'Paper': [
    `Your foe looks pale.`,
    `Your foe appears to radiate hate.`,
    `Your foe is wearing thin.`,
    `You foe seems a bit crumpled.`,
    `Your foe seems to be in a bad mood.`,
    `Your foe is wrinkling it's nose.`
  ],
  'Scissors': [
    `Your foe looks confused.`,
    `You foe is looking cross.`,
    `Your foe looks like it wants to fight.`,
    `Your foe looks hungry.`,
    `Your foe is yawning.`,
    `Your foe seems to be laughing.`,
  ],
}

const opponentsNextHand = ref(null)
const opponentReader = ref(null)

const readOpponent = () => {
  const opponentHand = handTypes[useRandomNumber(0, handTypes.length - 1)]
  opponentsNextHand.value = opponentHand

  if (turnLog.value.length <= 0) {
    opponentReader.value = `Have a good clean fight.`
    return
  }
  if (turnLog.value.length <= 1) {
    opponentReader.value = `...`
    return
  }
  const lastTwoTurnsResults = turnLog.value.slice(0, 2).map(turn => turn.roundResult)
  if (lastTwoTurnsResults.includes('Win')) {
    opponentReader.value = `...`
  }
  else {
    opponentReader.value = opponentReaderLookup[opponentHand][useRandomNumber(0, opponentReaderLookup[opponentHand].length - 1)]
    turnLog.value[0].hint = opponentReader.value
  }
}

const turnLog = ref([])

const sceneMusic = new Howl({
    src: [music],
    loop: true,
    volume: 0,
})

const playMusic = () => {
  if(props.sceneName != 'deathmatch') return
  const id = sceneMusic.play()
  sceneMusic.fade(0, 0.01, 1000, id);
}

onMounted(() => {
  playMusic()
  readOpponent()
  const fightData = loadData('savedDeathmatchData')
  if (fightData) {
    localDeathmatchData.value = fightData
  }
  const logData = loadData('savedDeathmatchLog')
  if (logData) {
    turnLog.value = logData
  }
})

const throwHand = (handType) => {
  const determineWinner = (handType) => {
    if (handType === opponentsNextHand.value) {
      divvyDamageUp('Tie')
      return 'Tie'
    }
    if (whichHandBeatsWhich[handType] === opponentsNextHand.value) {
      divvyDamageUp('Win')
      return 'Win'
    }
    divvyDamageUp('Lose')
    return 'Lose'
  }

  const handStatus = determineWinner(handType, opponentsNextHand.value)

  turnLog.value.unshift({
    roundNumber: turnLog.value.length + 1,
    you: handType,
    opponent: opponentsNextHand.value,
    roundResult: handStatus,
  })

  readOpponent()
} 

watch(turnLog, () => {
  saveData('savedDeathmatchLog', turnLog.value)
})

watch(localDeathmatchData, () => {
  saveData('savedDeathmatchData', localDeathmatchData.value)
})

const handleBloodAnimation = async (element) => {
    await animate(element, {
      opacity: [0,1,0],
      top: [60, 50, 70],
      left: [30, 30, 30],
      scale: [1, 1.2, 1],
      duration: 800,
    })
  }

const loseMatch = () => {
  youDied.value = true
  handleDeathAnimation('#yourBlood')
}

const winMatch = () => {
  youWin.value = true
  handleDeathAnimation('#opponentBlood')
}

const handleDeathAnimation = async(element) => {
  pause.value = true
  
  if (youDied.value) {
    const deadMonsterTarget = monsterDirectory.value.find(m => m.name == localDeathmatchData.value.monster.name)
    deadMonsterTarget.stats.hp = 0
    saveData('savedDeathmatchData', null)
    saveData('savedDeathmatchLog', null)
    saveData('savedBloodSportFight', null)
    saveData('deathmatchWon', false)
  }

  await animate(element, {
      opacity: [0,1],
      top: [60, 50],
      left: [30, 30],
      scale: [1, 10],
      duration: 3000,
  })

  if (youWin.value) {
    saveData('deathmatchWon', true)
    const monsterTarget = monsterDirectory.value.find(m => m.name == localDeathmatchData.value.monster.name)
    monsterTarget.stats.hp = localDeathmatchData.value.monster.stats.hp

    fragmentDirectory.value[0].quantity += localDeathmatchData.value.frags
    if (localDeathmatchData.value.winnings.classification === 'consumable') {
      const itemTarget = consumableDirectory.value.find(i => i.name == localDeathmatchData.value.winnings.name)
      itemTarget.quantity += 1
    }
    if (localDeathmatchData.value.winnings.classification === 'equipment') {
      const equipmentTarget = equipmentDirectory.value.find(i => i.name == localDeathmatchData.value.winnings.name)
      equipmentTarget.quantity += 1
    }
  }
  sceneMusic.stop()
  emit('leave-scene')
}

const divvyDamageUp = async(roundResult) => {
  const yourElement = localDeathmatchData.value.monster.type
  const opponentElement = localDeathmatchData.value.opponent.type
  const yourBaseDamage = localDeathmatchData.value.monster.quantity
  const opponentBaseDamage = localDeathmatchData.value.opponent.quantity

  const adjustForElement = (attackingElement, defendingElement) => {
    const elementStrongAgainst = {
      'fire': 'air',
      'water': 'fire',
      'earth': 'water',
      'air': 'earth',
    }

    const elementWeakAgainst = {
      'fire': 'water',
      'water': 'earth',
      'earth': 'air',
      'air': 'fire',
    }
    
    if (attackingElement === defendingElement) {
      return 0
    }
    if (elementStrongAgainst[attackingElement] === defendingElement) {
      return 1
    }
    if (elementWeakAgainst[attackingElement] === defendingElement) {
      return -1
    }
    return 0
}

  const adjustForEquipment = (equipment) => {
    if (!equipment) { 
      return 0
    }
    if (equipment.buffStat === 'attack') {
      return equipment.value
    } 
    return 0
  }

  const enemyAdjustedDamage = () => {
    return Math.max(1, adjustForElement(opponentElement, yourElement) + opponentBaseDamage)
  }

  const yourAdjustedDamage = () => {
    return Math.max(1, adjustForElement(yourElement, opponentElement) + adjustForEquipment(localDeathmatchData.value.monster.equipment) + yourBaseDamage)
  }

  const takeDamage = async (damage) => {
    let damageToTake = damage
    if (localDeathmatchData.value.monster.equipment?.buffStat === 'defense') {
      damageToTake = Math.max(1, damage - localDeathmatchData.value.monster.equipment.value)
    }
    for (let i = 0; i < damageToTake; i++) {
      localDeathmatchData.value.monster.stats.hp -= 1
      await handleBloodAnimation('#yourBlood')
      if (localDeathmatchData.value.monster.stats.hp <= 0) {
        i = damageToTake
        youDied.value = true
        handleDeathAnimation('#yourBlood')
      }
    }
  }

  const dealDamage = async (damage) => {
    pause.value = true
    for (let i = 0; i < damage; i++) {
      localDeathmatchData.value.opponent.stats.hp -= 1
      await handleBloodAnimation('#opponentBlood')
      if (localDeathmatchData.value.opponent.stats.hp <= 0) {
        i = damage
        youWin.value = true
        handleDeathAnimation('#opponentBlood')
      }
    }
    pause.value = false
  }

  
  if (roundResult === 'Tie') {
    const damage = Math.ceil(enemyAdjustedDamage() / 2)
    const damageToOpponent = Math.ceil(yourAdjustedDamage() / 2)
    takeDamage(damage)
    dealDamage(damageToOpponent)
  }
  if (roundResult === 'Win') {
    dealDamage(yourAdjustedDamage())
  }
  else {
    takeDamage(enemyAdjustedDamage())
  }
}
</script>

<style scoped>
#opponentBlood, #yourBlood {
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>