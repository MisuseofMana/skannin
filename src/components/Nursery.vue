<template>
  <div class="mt-5">
    <div class="d-flex justify-center text-teal">
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
    <p class="text-body-1 text-center mb-5">
      Leave monsters here to rest and heal.
    </p>
    <v-img 
      min-width="325"
      :src="useEventImage({folderName: 'nursery', fileName: sceneScript[sceneNumber].imagePath})"
    />
    <div class="text-body-1 text-center">
      <p
        class="mb-8 pa-3"
        style="minHeight:55px; backgroundColor: black;"
      >
        {{ sceneScript[sceneNumber].text }}
      </p>
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
import audio from '../assets/nursery/audio.wav'
import { useEventImage } from '@/composables/useImageRoute'

const sceneNumber = ref(0)
const sceneScript = ref([
  {
    imagePath: `wave`,
    text: `Hi!`,
    audioTrack: 'welcome',
  },
  {
    imagePath: `wave`,
    text: `Take care.`,
    audioTrack: 'care',
  },
  {
    imagePath: `wave`,
    text: `See you again soon.`,
    audioTrack: 'seeyou',
  },
  {
    imagePath: `hug`,
    text: `We'll have lots of fun.`,
    audioTrack: 'fun',
  },
  {
    imagePath: `hug`,
    text: `You can pick this one up later`,
    audioTrack: 'pickup',
  },
  {
    imagePath: `ask`,
    text: `Bring more monsters whenever.`,
    audioTrack: 'bringmore',
  },
])

const narration = new Howl({
  src: [audio],
  sprite: {
    'hi': [8636,591],
    'care': [69, 496],
    'seeyou': [700, 1410],
    'fun': [5700, 1413],
    'pickup': [4032, 1552],
    'bringmore': [2259, 1618],
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