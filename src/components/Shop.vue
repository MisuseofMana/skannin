<template>
  <div class="mt-5">
    <div class="d-flex justify-center text-amber-darken-2">
      <v-icon
        size="35"
        class="mr-2"
      >
        mdi-cart-outline
      </v-icon>
      <h2 class="text-h4">
        Shop
      </h2>
    </div>
    <p class="text-body-1 text-center mb-5">
      Buy things with your fragments
    </p>
    <v-img 
      min-width="325"
      :src="useEventImage({folderName: 'shop', fileName: sceneScript[sceneNumber].imagePath})"
    />
    <div class="text-body-1 text-center">
      <p
        class="pa-3"
        style="minHeight:55px; backgroundColor: black;"
      >
        {{ sceneScript[sceneNumber].text }}
      </p>
    </div>

    <div
      v-for="n in 3"
      :key="n"
      class="d-flex align-center my-5"
    >
      <v-img 
        min-width="100px"
        max-width="100px"
        class="mr-2"
        :src="useEventImage({folderName: 'shop', fileName: sceneScript[sceneNumber].imagePath})"
      />
      <v-btn
        size="x-large"
        color="amber-darken-2"
        @click="advanceScene"
      >
        20 fragments.
      </v-btn>
    </div>

    <v-btn
      @click="advanceScene"
    >
      Advance Scene
    </v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import audio from '../assets/shop/audio.wav'
import { useEventImage } from '@/composables/useImageRoute'

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
    imagePath: `eager`,
    text: `Come back soon.`,
    audioTrack: 'comeback',
  },
  {
    imagePath: `eager`,
    text: `Half off today, hehehe! Just joking, full price.`,
    audioTrack: 'half',
  },
  {
    imagePath: `pleased`,
    text: `Enjoy my wares!`,
    audioTrack: 'wares',
  },
  {
    imagePath: `pleased`,
    text: `Good luck out there!`,
    audioTrack: 'goodluck',
  },
])

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
    'goodluck': [28747, 1874],
  }
});

const advanceScene = () => {
  if (sceneNumber.value < sceneScript.value.length - 1) {
    sceneNumber.value += 1
    narration.stop()
    narration.play(sceneScript.value[sceneNumber.value].audioTrack)
  }
}
</script>