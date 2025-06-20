<template>
  <v-card class="text-center text-body-1 pa-10">
    <div class="d-flex justify-center mb-3">
      <v-img 
        aspect-ratio="2/1"
        max-width="325"
        min-width="325"
        :src="useEventImage({folderName: 'intro', fileName: sceneScript[sceneNumber].imagePath})"
      />
    </div>
    <p
      class="mb-8"
      style="minHeight:55px;"
    >
      {{ sceneScript[sceneNumber].text }}
    </p>
    <v-btn
      v-if="sceneNumber < sceneScript.length - 1"
      size="x-large"
      elevation="0"
      color="primary"
      :text="sceneScript[sceneNumber].response"
      @click="advanceScene()"
    />

    <v-sheet
      v-if="sceneNumber == sceneScript.length - 1"
      color="blue-grey-darken-4"
      class="pa-5 mb-10"
    >
      <p class="mb-5">
        The old man gave you a monster!
      </p>
      <p class="text-h4">
        {{ monsterPicked.name }}
      </p>
      <div class="d-flex justify-center mb-3">
        <v-img 
          aspect-ratio="2/1"
          max-width="200"
          :src="useGetImage(monsterPicked)"
        />
      </div>

      <p class="mb-5">
        and some starting items and fragments too!
      </p>
      <div class="mb-5 d-flex justify-center align-center">
          <v-img 
            aspect-ratio="2/1"
            max-width="100"
            min-width="100"
            :src="useGetImage(itemPicked)"
          />
          <v-img 
          class="mt-5"
            aspect-ratio="2/1"
            max-width="100"
            min-width="100"
            :src="useGetImage(equipPicked)"
          />
      </div>

      <div class="d-flex flex-column justify-space-around align-center">
        <v-img 
        aspect-ratio="2/1"
        max-width="100"
        min-width="100"
        :src="useGetImage(fragmentDirectory[0])"
        />
        <p class="text-h5">
          100 Fragments
        </p>
      </div>
    </v-sheet>

    <div
      v-if="sceneNumber == sceneScript.length - 1"
      class="d-flex justify-space-around"
    >
      <v-btn
        size="x-large"
        color="teal"
        text="Thanks Old Man!"
        append-icon="mdi-thumb-up"
        @click="emit('bypassStart')"
      />
    </div>
  </v-card>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { monsterDirectory } from '@/composables/useMonsterList.js'
import { consumableDirectory, equipmentDirectory, fragmentDirectory } from '@/composables/useItemList.js'
import { useRandomNumber } from '@/composables/useNumberInterpretor.js'
import { loadData, saveData } from '@/composables/useLocalStorage.js'

import { Howl } from 'howler'
import audio from '../assets/intro/audio.wav'
import { useGetImage, useEventImage } from '@/composables/useImageRoute.js'

const monsterPicked = ref({})
const itemPicked = ref({})
const equipPicked = ref({})
const emit = defineEmits(['bypassStart'])

const sceneNumber = ref(0)

const sceneScript = ref([
  {
    imagePath: `door`,
    text: `...`,
    response: `Enter the lab.`,
    audioTrack: null,
  },
  {
    imagePath: `unaware`,
    text: `...`,
    response: `"Uhh... excuse me.""`,
    audioTrack: 'door',
  },
  {
    imagePath: `shrug`,
    text: `What!? Who are you?`,
    response: `"No, who are YOU?!""`,
    audioTrack: 'what',
  },
  {
    imagePath: `pointing`,
    text: `How'd you even get into my lab, kiddo?`,
    response: `"The door was open..."`,
    audioTrack: 'how',
  },
  {
    imagePath: `shrug`,
    text: `No matter, since you're here you can take this off my hands.`,
    response: `"Take what now?""`,
    audioTrack: 'matter',
  },
  {
    imagePath: `hatch1`,
    text: `Look it's hatching.`,
    response: `???`,
    audioTrack: 'look',
  },
  {
    imagePath: `hatch2`,
    text: `Keep 'em safe now, understand?`,
    response: `"Whatever you say."`,
    audioTrack: 'care',
  },
  {
    imagePath: `wagFinger`,
    text: `If they kick the bucket, that's on you alright?`,
    response: `"Okay dude."`,
    audioTrack: 'bucket',
  },
  {
    imagePath: `pointing`,
    text: `And DON'T USE THE LIL THING FOR BLOOD SPORTS, OKAY?!`,
    response: `Okay, okay, geez!`,
    audioTrack: 'blood',
  },
])

const narration = new Howl({
  src: [audio],
  volume: 0.05,
  sprite: {
    'door': [20214,24348],
    'what': [104, 1502],
    'how': [2207, 2099],
    'matter': [4809, 3395],
    'look': [8704, 1699],
    'care': [11000, 2101],
    'bucket': [13703, 2296],
    'blood': [16600, 3332],
  }
});

const advanceScene = () => {
  if (sceneNumber.value < sceneScript.value.length - 1) {
    sceneNumber.value += 1
    narration.stop()
    narration.play(sceneScript.value[sceneNumber.value].audioTrack)
  }
}

onBeforeMount(() => {
    if (loadData('hasStartedGame')) {
        emit('bypassStart')
        return
    }
    const monsterPick = useRandomNumber(0, monsterDirectory.value.length - 1)
    const itemPick = useRandomNumber(0, consumableDirectory.value.length - 1)
    const equipPick = useRandomNumber(0, equipmentDirectory.value.length - 2)
    
    monsterDirectory.value[monsterPick].quantity += 2
    monsterDirectory.value[monsterPick].stats.hp += 5
    monsterDirectory.value[monsterPick].stats.maxhp += 5

    consumableDirectory.value[itemPick].quantity += 1
    equipmentDirectory.value[equipPick].quantity += 1
    equipmentDirectory.value[equipPick+1].quantity += 1
    fragmentDirectory.value[0].quantity = 100

    monsterPicked.value = monsterDirectory.value[monsterPick]
    itemPicked.value = consumableDirectory.value[itemPick]
    equipPicked.value = equipmentDirectory.value[equipPick]
    saveData('hasStartedGame', true)
})
</script>