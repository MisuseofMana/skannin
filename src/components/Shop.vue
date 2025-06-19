<template>
  <div>
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
    <div class="d-flex justify-center align-center flex-grow-1">
      <v-icon
        size="35"
        class="mr-2"
      >
        mdi-cart-outline
      </v-icon>
      <h2 class="text-h4 mb-3">
        Shop
      </h2>
    </div>
    <p
      class="text-body-1 mb-3 text-center"
    >
      Restock in: {{ timeLeft.minutes }}m {{ timeLeft.seconds }}s
    </p>
    <v-img
      aspect-ratio="1.5"
      min-width="300px"
      :src="useEventImage({folderName: 'shop', fileName: sceneScript[sceneNumber].imagePath})"
    />
    <div class="text-body-1 text-center">
      <p
        class="py-3 px-8"
        style="minHeight:75px; backgroundColor: black;"
      >
        {{ sceneScript[sceneNumber].text }}
      </p>
    </div>
    
    <div
      v-for="item in forSale"
      :key="item.name"
      class="d-flex align-center my-5"
    >
      <v-card
        color="amber-darken-2"
        width="100%"
        class="pa-5"
        rounded
        @click="attemptPurchase(item)"
      >
        <div
          v-if="item.bought"
          class="d-flex
          align-center justify-space-between"
        > 
          <v-img 
            min-width="100px"
            max-width="100px"
            :src="useGetImage(item)"
          />
          <div class="mr-5">
            <p class="text-white font-weight-black">
              SOLD OUT
            </p>
          </div>
        </div>
        <div
          v-else
          class="d-flex align-center justify-space-between"
        >
          <v-img 
            min-width="100px"
            max-width="100px"
            :src="useGetImage(item)"
          />
          <div class="mr-5">
            <p class="text-h6 text-right">
              {{ item.cost }} Frag
            </p>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import audio from '../assets/shop/audio.wav'
import { useEventImage, useGetImage } from '@/composables/useImageRoute'
import { consumableDirectory, equipmentDirectory, fragmentDirectory } from '@/composables/useItemList'
import { monsterDirectory } from '@/composables/useMonsterList'
import { shuffle } from '@/composables/useSorting'
import { useRandomNumber } from '@/composables/useNumberInterpretor'
import { loadData, saveData } from '@/composables/useLocalStorage.js'

const props = defineProps({
  sceneName: {
    type: String,
    required: true,
  }
})
const emit = defineEmits(['leave-scene'])

const sceneNumber = ref(0)
const sceneScript = ref([
  {
    imagePath: `eager`,
    text: `Welcome!`,
    audioTrack: 'welcome',
  },
  {
    imagePath: `eager`,
    text: `Got some really good stuff for you today!`,
    audioTrack: 'goodStuff',
  },
  {
    imagePath: `pleased`,
    text: `We've got discounts galore, ah well nevermind no we don't.`,
    audioTrack: 'discount',
  },
  {
    imagePath: `eager`,
    text: `Half off today, hehehe! Just joking, full price.`,
    audioTrack: 'half',
  },
  {
    imagePath: `dismissive`,
    text: `No freebies!!`,
    audioTrack: 'freebie',
  },
  {
    imagePath: `pleased`,
    text: `It's yours!`,
    audioTrack: 'yours',
  },
  {
    imagePath: `pleased`,
    text: `Enjoy my wares!`,
    audioTrack: 'wares',
  },
  {
    imagePath: `eager`,
    text: `Come back soon.`,
    audioTrack: 'comeback',
  },
  {
    imagePath: `pleased`,
    text: `Good luck out there!`,
    audioTrack: 'goodluck',
  },
])

let countdownInterval = null;

const localRefreshDate = ref(null)

const updateCountdown = () => {
  const totalTimeLeft = new Date(localRefreshDate.value) - Date.now();

  if (totalTimeLeft > 0) {
    timeLeft.value = {
      minutes: Math.floor((totalTimeLeft / (1000 * 60)) % 60),
      seconds: Math.floor((totalTimeLeft / 1000) % 60),
    };
  } else {
    restockShop()
  }
}
    
const forSale = ref([])
const timeLeft = ref({
  minutes: 0,
  seconds: 0,
});


onMounted(() => {
  sayGreeting()

  const now = new Date()
  const shopStock = loadData('shopInventory')
  const shopRefreshDate = loadData('shopRefreshDate')

  if (shopStock && shopRefreshDate) {
    forSale.value = shopStock
    localRefreshDate.value = shopRefreshDate
  }

  if (shopRefreshDate && now > shopRefreshDate) {
    restockShop()
  }
  
  updateCountdown();
  countdownInterval = setInterval(() => updateCountdown(), 1000);
})

const playAudio = () => {
  narration.stop()
  if(props.sceneName != 'shop') return
  narration.play(sceneScript.value[sceneNumber.value].audioTrack)
}

const sayGreeting = () => {
  sceneNumber.value = useRandomNumber(0,3)
  playAudio()
}

const sayNoPurchase = () => {
  sceneNumber.value = 4
  playAudio()
}

const sayGoodPurchase = () => {
  sceneNumber.value = useRandomNumber(5,6)
  playAudio()
}

const sayGoodbye = () => {
  sceneNumber.value = useRandomNumber(7, 8)
  playAudio()
  emit('leave-scene')
  clearInterval(countdownInterval);
}

const getAvailableStock = () => {
  return shuffle([...consumableDirectory.value, ...equipmentDirectory.value])
}

const getAvailableMonster = () => {
  const copyOfMonsters = [...monsterDirectory.value]
  const unOwnedMonsters = copyOfMonsters.filter(m => m.quantity <= 0)
  return shuffle(unOwnedMonsters)[0]
}

const restockShop = () => {
  const now = new Date()
  const stock = getAvailableStock().slice(0, 4)
  stock.push(getAvailableMonster())
  forSale.value = stock
  const newRestockDate = new Date(now.getTime() + 60 * 30 * 1000)
  saveData('shopInventory', forSale.value)
  saveData('shopRefreshDate', newRestockDate)
  localRefreshDate.value = newRestockDate
}

const attemptPurchase = (item) => {
  if (item.cost > fragmentDirectory.value[0].quantity) {
    sayNoPurchase()
  }
  else if (item.cost <= fragmentDirectory.value[0].quantity && !item.bought) {
    sayGoodPurchase()
    item.bought = true
    fragmentDirectory.value[0].quantity -= item.cost
    if (item.classification === 'equipment') {
      getEquipment(item).quantity += 1
    }
    if (item.classification === 'consumable') {
      getItem(item).quantity += 1
    }
    saveData('shopInventory', forSale.value)
  }
}

const getItem = (which) => {
  return consumableDirectory.value.find(i => i.name == which.name)
}

const getEquipment = (which) => {
  return equipmentDirectory.value.find(e => e.name == which.name)
}

const narration = new Howl({
  src: [audio],
  sprite: {
    'welcome': [0,1589],
    'half': [1862, 4195],
    'goodStuff': [6330, 3649],
    'discount': [10327, 3885],
    'yours': [14398, 1651],
    'freebie': [19351, 1911],
    'fave': [21620, 2098],
    'comeback': [23819, 1849],
    'wares': [25991, 2321],
    'goodluck': [28747, 1900],
  }
});
</script>