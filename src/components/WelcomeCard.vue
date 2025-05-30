<template>
  <v-card class="text-center text-h6 pa-10">
    <div class="d-flex justify-center mb-3">
      <v-img 
        aspect-ratio="2/1"
        max-width="400"
        src="`../assets/intro/1.png`"
      />
    </div>
    <p class="mb-10">
      What? Who are you?
    </p>
    <div class="d-flex justify-center mb-3">
      <v-img 
        aspect-ratio="2/1"
        max-width="400"
        src="`../assets/intro/2.png`"
      />
    </div>
    <p class="mb-10">
      How'd you even get into my lab, kiddo?
    </p>
    <div class="d-flex justify-center mb-3">
      <v-img 
        aspect-ratio="2/1"
        max-width="400"
        src="`../assets/intro/3.png`"
      />
    </div>
    <p class="mb-10">
      No matter, since you're here you can take this off my hands.
    </p>
    <div class="d-flex justify-center mb-3">
      <v-img 
        aspect-ratio="2/1"
        max-width="400"
        src="`../assets/intro/5.png`"
      />
    </div>
    <p class="mb-10">
      Look it's hatching.
    </p>
    <div class="d-flex justify-center mb-3">
      <v-img 
        aspect-ratio="2/1"
        max-width="400"
        src="`../assets/intro/4.png`"
      />
    </div>
    <p class="mb-10">
      Keep 'em safe now, understand?
    </p>
    <div class="d-flex justify-center mb-3">
      <v-img 
        aspect-ratio="2/1"
        max-width="400"
        src="`../assets/intro/6.png`"
      />
    </div>
    <p class="mb-10">
      If they kick the bucket, that's on you alright?
    </p>
    <div class="d-flex justify-center mb-3">
      <v-img 
        aspect-ratio="2/1"
        max-width="400"
        src="`../assets/intro/2.png`"
      />
    </div>
    <p class="mb-15">
      And DON'T USE THE LIL THING FOR BLOOD SPORTS, OKAY?!
    </p>

    <v-sheet
      color="blue-grey-darken-4"
      class="pa-5 mb-10"
    >
      <p class="mb-5">
        The old man gave you a level 2 monster!
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
    </v-sheet>

    <v-sheet
      color="blue-grey-darken-4"
      class="pa-5 mb-10"
    >
      <p class="mb-5">
        he gave you some starting items and fragments too!
      </p>
      <div class="d-flex justify-center mb-10">
        <div class="d-flex flex-column">
          <p class="text-h4">
            {{ itemPicked.name }}
          </p>
          <v-img 
            aspect-ratio="2/1"
            max-width="200"
            min-width="200"
            :src="useGetImage(itemPicked)"
          />
        </div>
        <div class="d-flex flex-column">
          <p class="text-h4">
            {{ equipPicked.name }}
          </p>
          <v-img 
            aspect-ratio="2/1"
            max-width="200"
            min-width="200"
            :src="useGetImage(equipPicked)"
          />
        </div>
        <div class="d-flex flex-column">
          <p class="text-h4">
            {{ equipPicked2.name }}
          </p>
          <v-img 
            aspect-ratio="2/1"
            max-width="200"
            min-width="200"
            :src="useGetImage(equipPicked2)"
          />
        </div>
      </div>
    </v-sheet>

    <v-sheet
      color="blue-grey-darken-4"
      class="pa-5 mb-10"
    >
      <div class="d-flex flex-column justify-space-around align-center">
        <p class="text-h4">
          Fragments x20
        </p>
        <v-img 
          aspect-ratio="2/1"
          max-width="200"
          min-width="200"
          :src="useGetImage(fragmentDirectory[0])"
        />
      </div>
    </v-sheet>

    <div class="d-flex justify-space-around">
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
import { ref, onMounted } from 'vue'
import { monsterDirectory } from '@/composables/useMonsterList.js'
import { consumableDirectory, equipmentDirectory, fragmentDirectory } from '@/composables/useItemList.js'
import { useRandomNumber } from '@/composables/useNumberInterpretor.js'
import { loadData, saveData } from '@/composables/useLocalStorage.js'

import { useGetImage } from '@/composables/useImageRoute.js'

const monsterPicked = ref({})
const itemPicked = ref({})
const equipPicked = ref({})
const equipPicked2 = ref({})
const emit = defineEmits(['bypassStart'])

onMounted(() => {
    if (loadData('hasStartedGame')) {
        emit('bypassStart')
        return
    }
    const monsterPick = useRandomNumber(0, monsterDirectory.value.length - 1)
    const itemPick = useRandomNumber(0, consumableDirectory.value.length - 1)
    const equipPick = useRandomNumber(0, equipmentDirectory.value.length - 2)
    
    monsterDirectory.value[monsterPick].quantity += 2
    consumableDirectory.value[itemPick].quantity += 1
    equipmentDirectory.value[equipPick].quantity += 1
    equipmentDirectory.value[equipPick+1].quantity += 1
    fragmentDirectory.value[0].quantity += 20

    monsterPicked.value = monsterDirectory.value[monsterPick]
    itemPicked.value = consumableDirectory.value[itemPick]
    equipPicked.value = equipmentDirectory.value[equipPick]
    equipPicked2.value = equipmentDirectory.value[equipPick+1]
    saveData('hasStartedGame', true)
})
</script>