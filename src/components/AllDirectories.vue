<template>
  <v-container
    max-width="900px"
    class="px-5"
  >
    <WelcomeCard
      v-if="!startedGame"
      @bypass-start="startedGame = true"
    />

    <div
      v-if="startedGame"
      class="game-card"      
    >
      <v-card
        :key="currentScene"
        class="pa-5"
      >
        <MenuButtons
          v-if="currentScene === 'menu'"
          @switch-scene="(e) => swapScene(e)"
        />

        <div v-else>
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-center flex-grow"
            >
              <Battle
                v-show="currentScene === 'battle'"
                key="battle"
                @leave-scene="swapScene('menu')"
              />
              <Shop
                v-show="currentScene === 'shop'"
                key="shop"
                :scene-name="currentScene"
                @leave-scene="swapScene('menu')"
              />
              <Nursery
                v-show="currentScene === 'nursery'"
                key="nursery"
                :scene-name="currentScene"
                @leave-scene="swapScene('menu')"
              />
              <BloodSport
                v-show="currentScene === 'bloodsport'"
                key="bloodsport"
                :scene-name="currentScene"
                @leave-scene="swapScene('menu')"
                @start-deathmatch="(e) => startDeathmatch(e)"
              />
              <Monsters
                v-show="currentScene === 'monsters'"
                key="monsters"
                @leave-scene="swapScene('menu')"
              />
              <Consumables
                v-show="currentScene === 'consumable'"
                key="consumable"
                @leave-scene="swapScene('menu')"
              />
              <Equipment
                v-show="currentScene === 'equipment'"
                key="equipment"
                @leave-scene="swapScene('menu')"
              />
              <Deathmatch
                v-show="currentScene === 'deathmatch'"
                key="deathmatch"
                @leave-scene="swapScene('bloodsport')"
              />
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import {ref} from 'vue'
import { animate } from 'animejs'
import { saveData, loadData } from '@/composables/useLocalStorage'
import { onMounted } from 'vue'

const startedGame = ref(false)

const currentScene = ref('menu')

onMounted(() => {
  const savedDeathmatchData = loadData('savedDeathmatchData')
  if (savedDeathmatchData) {
    swapScene('deathmatch')
  }
})

const startDeathmatch = (e) => {
  saveData('savedDeathmatchData', e)
  swapScene('deathmatch')
}

const swapScene = async (sceneString) => {
  await animate('.game-card', {
    opacity: [1,0],
    duration: 200,
  })
  currentScene.value = sceneString
  await animate('.game-card', {
    opacity: [1,0],
    reversed: true,
    duration: 200,
  })
}
</script>
