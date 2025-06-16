<template>
  <div class="mt-2" style="max-width: 400px;">
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
    <div class="d-flex justify-center flex-grow-1">
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
      v-if="timeLeft.total > 0"
      class="text-body-1 mb-3 text-center"
    >
      Restock in: {{ timeLeft.minutes }}m {{ timeLeft.seconds }}s
    </p>
    <p
      v-else-if="timeLeft.total <= 0"
      class="text-body-1 mb-3 text-center"
    >
      Go back to menu to restock.
    </p>
    <v-img
      min-width="400"
      :src="useEventImage({folderName: 'shop', fileName: sceneScript[sceneNumber].imagePath})"
    />
    <div class="text-body-1 text-center">
      <p
        class="py-3 px-8"
        style="minHeight:75px; min-width: 400px; backgroundColor: black;"
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
            <p class="text-h5 text-red">
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
            <p class="text-h5">
              Buy for {{ item.cost }} Frag
            </p>
            <p class="text-white text-right text-h6">
              {{ item.name }}
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

const updateCountdown = (endTime) => {
  const total = Date.parse(endTime) - Date.now();

  if (total > 0) {
    timeLeft.value = {
      total,
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / (1000 * 60)) % 60),
      seconds: Math.floor((total / 1000) % 60),
    };
  } else {
    timeLeft.value.total = 0;
    clearInterval(countdownInterval);
  }
}
    
const forSale = ref([])
const timeLeft = ref({
      total: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });


onMounted(() => {
  const savedDate = loadData('shopVisitTimestamp')
  const now = new Date()
  const last = savedDate ? new Date(savedDate) : now
  const difference = (now - last) / (1000 * 60 * 60)
  const endDate = new Date(last.getTime() + 60 * 60 * 1000)
  updateCountdown(endDate);
  countdownInterval = setInterval(() => updateCountdown(endDate), 1000);

  if (difference >= 1) {
    restockShop()
  }
  else if (difference < 1 && savedDate) {
    forSale.value = loadData('shopInventory')
    sayGreeting()
  }
  else {
    sayGreeting()
    restockShop()
  }
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

const sayRestockLine = () => {
  sceneNumber.value = useRandomNumber(1,2)
  playAudio()
}

const getAvailableStock = () => {
  return shuffle([...consumableDirectory.value, ...equipmentDirectory.value])
}

const restockShop = () => {
  saveData('shopVisitTimestamp', new Date())
  forSale.value = getAvailableStock().slice(0, 4)
  saveData('shopInventory', forSale.value)
  sayRestockLine()
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