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
        mdi-egg
      </v-icon>
      <h2 class="text-h4">
        Nursery
      </h2>
    </div>
    <v-img
      aspect-ratio="1.5"
      min-width="300px"
      :src="useEventImage({folderName: 'nursery', fileName: sceneScript[sceneNumber].imagePath})"
    />
    <div class="text-body-1 text-center mb-5">
      <p
        class="py-3 px-8"
        style="minHeight:75px; backgroundColor: black;"
      >
        {{ sceneScript[sceneNumber].text }}
      </p>
    </div>
    
    <div v-if="monstersInNursery.length > 0">
      <div
        v-for="(monster, index) in monstersInNursery"
        :key="monster.name"
      >
        <v-card
          :color="monster.nurseryData.isInNursery ? 'teal-darken-2' : 'blue-grey-darken-2'"
          width="100%"
          class="pa-5 d-flex align-center justify-space-between"
          rounded
          @click="giveOrRetrieveMonster(monster)"
        >
          <div class="text-white text-h6 text-center">
            <p>
              {{ monster.name }} <span class="text-blue-grey-darken-4">{{ monster.stats.hp > 0 ? '' : '(Dead)' }}</span>
            </p>
            <v-img 
              min-width="100px"
              max-width="100px"
              :src="useGetImage(monster)"
              :class="monster.stats.hp <= 0 ? 'dead' : ''"
            />
          </div>
          <div class="mr-5 text-right">
            <p
              v-if="!monster.nurseryData.isInNursery"
              class="text-h5"
            >
              <span class="text-red font-weight-bold">HP {{ monster.stats.hp }}</span> / {{ monster.stats.maxhp }}
            </p>
            <p v-else>
              Available in <span class="font-weight-black text-pink-lighten-3">{{ monsterTimes[index]?.readableTime }}</span>
            </p>
            <div>
              <p
                v-if="!monster.nurseryData.isInNursery"
                class="text-body-1"
              >
                {{ getFragToHeal(monster) }} Frag to Heal
              </p>
            </div>
          </div>
        </v-card>
      </div>
    </div>
    <div v-else>
      <v-card
        class="text-body-1 text-center pa-5"
        color="teal"
      >
      <p>
        All your monsters are healthy.
      </p>
      <p>
        Come back if they get hurt.
      </p>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import audio from '../assets/nursery/audio.wav'
import { useEventImage, useGetImage } from '@/composables/useImageRoute'
import { fragmentDirectory } from '@/composables/useItemList'
import { monsterDirectory } from '@/composables/useMonsterList'
import { useRandomNumber } from '@/composables/useNumberInterpretor'
import { sortMonsterByHP } from '@/composables/useSorting'

const props = defineProps({
  sceneName: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['leave-scene'])

const monsterTimes = ref([])
const sceneNumber = ref(0)
const sceneScript = ref([
  {
    imagePath: `wave`,
    text: `Hi!`,
    audioTrack: 'hi',
  },
  {
    imagePath: `hug`,
    text: `Bring more monsters whenever.`,
    audioTrack: 'bringMore',
  },
  {
    imagePath: `ask`,
    text: `You can pick this one up later.`,
    audioTrack: 'pickupLater',
  },
  {
    imagePath: `hug`,
    text: `We'll have lots of fun.`,
    audioTrack: 'lotsOfFun',
  },
  {
    imagePath: `ask`,
    text: `Take care.`,
    audioTrack: 'takeCare',
  },
  {
    imagePath: `wave`,
    text: `See you soon.`,
    audioTrack: 'seeYouSoon',
  },
])

let countdownInterval = null;

const getFragToHeal = (monster) => {
  if (monster.stats.hp > 0) {
    return (monster.stats.maxhp - monster.stats.hp) * 3
  }
  else {
    return monster.stats.maxhp * 5
  }
}

const getTimeToHealed = (monster) => {
  if (monster.stats.hp > 0) {
    return (monster.stats.maxhp - monster.stats.hp) * 2
  }
  else {
    return monster.stats.maxhp * 4
  }
}

const monstersInNursery = computed(() => {
  const filteredForInNursery = monsterDirectory.value.filter(m => {
    if (m.quantity > 0) {
      if (m.stats.hp < m.stats.maxhp) {
        return m
      }
    }
  })
  return sortMonsterByHP(filteredForInNursery)
})

const calculateTimeLeft = (monster) => {
  if (monster.nurseryData.releaseDate) {
    const timeLeft = new Date(monster.nurseryData.releaseDate) - new Date()
    const m = Math.floor(timeLeft / 60000)
    const s = Math.floor((timeLeft % 60000) / 1000).toString().padStart(2, '0')
    const readableTime = m > 0 ? `${m}m ${s}s` : `${s}s`

    return {
      timeLeft,
      readableTime,
    }
  }
  else {
    return {}
  }
}

const updateCountdowns = () => {
  let areThereMonstersInTheNursery = false

  monsterTimes.value = []

  monstersInNursery.value.forEach((monster, index) => {
    if (monster.nurseryData.isInNursery) {
      areThereMonstersInTheNursery = true
    }
    monsterTimes.value[index] = calculateTimeLeft(monster)
    if (monsterTimes.value[index]?.timeLeft <= 0) {
      monster.nurseryData.isInNursery = false
      monster.nurseryData.releaseDate = null
      monster.stats.hp = monster.stats.maxhp
      monsterTimes.value.pop(index)
    }
  })

  if (!areThereMonstersInTheNursery) {
    clearInterval(countdownInterval);
  }
}

const startTimers = () => {
  updateCountdowns();
  countdownInterval = setInterval(() => updateCountdowns(), 1000);
}

onBeforeMount(() => {
  startTimers()
  sayGreeting()
})

const narration = new Howl({
  src: [audio],
  sprite: {
    'hi': [8595, 717],
    'bringMore': [2267, 1667],
    'pickupLater': [3992, 1657],
    'lotsOfFun': [5639, 1599],
    'takeCare': [0, 620],
    'seeYouSoon': [7393, 1182],
  }
});

const playAudio = () => {
  narration.stop()
  if(props.sceneName != 'nursery') return
  narration.play(sceneScript.value[sceneNumber.value].audioTrack)
}

const playCantBuy = () => {
  sceneNumber.value = 0
  playAudio()
}

const sayGreeting = () => {
  sceneNumber.value = 0
  playAudio()
}

const sayNotReady = () => {
  console.log('not ready')
  sceneNumber.value = 0
  playAudio()
}

const sayGoodPurchase = () => {
  sceneNumber.value = useRandomNumber(1,3)
  playAudio()
}

const sayGoodbye = () => {
  sceneNumber.value = useRandomNumber(4, 5)
  playAudio()
  emit('leave-scene')
  clearInterval(countdownInterval);
}

const _spoofMonsterData = () => {
  monsterDirectory.value.forEach(m => {
    m.quantity = useRandomNumber(0, 1)
    m.nurseryData.isInNursery = false
    m.stats.hp = useRandomNumber(0, 10)
    m.stats.maxhp = 10
  })
  fragmentDirectory.value[0].quantity = 100
}

const putMonsterInNursery = (monster) => {
  const haveEnoughFragToHeal = fragmentDirectory.value[0].quantity >= getFragToHeal(monster)

  if (haveEnoughFragToHeal) {
    monster.nurseryData.isInNursery = true
    monster.nurseryData.releaseDate = new Date(Date.now() + getTimeToHealed(monster) * 60 * 1000)
    console.log(monster.nurseryData.releaseDate)
    fragmentDirectory.value[0].quantity -= getFragToHeal(monster)
    startTimers()
  }
  else {
    playCantBuy()
  }
}

const removeMonsterFromNursery = (monster) => {
  if (Date.parse(monster.nurseryData.releaseDate) < Date.now()) {
    monster.nurseryData.isInNursery = false
    monster.nurseryData.releaseDate = null
    monster.stats.hp = monster.stats.maxhp
  }
}

const giveOrRetrieveMonster = (monster) => {
  const {
    nurseryData: {
      isInNursery,
    },
  } = monster
  
  // if monster is in the nursery being healed
  if ( !isInNursery ) {
    putMonsterInNursery(monster)
  }
  else {
    removeMonsterFromNursery(monster)
  }
}
</script>