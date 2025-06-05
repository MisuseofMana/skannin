<template>
  <v-container
    max-width="900px"
    class="pa-10"
  >
    <WelcomeCard
      v-if="!startedGame"
      @bypass-start="startedGame = true"
    />

    <Fragments v-if="startedGame" />
    <div
      v-if="startedGame"
      class="game-card"      
    >
      <v-card
        :key="currentScene"
        class="pa-10"
      >
        <v-row v-if="currentScene != 'menu'">
          <v-col cols="12">
            <v-btn
              size="x-large"
              width="100%"
              elevation="0"
              color="grey"
              prepend-icon="mdi-arrow-left"
              text="Back To Menu"
              @click="swapScene('menu')"
            />
          </v-col>
        </v-row>

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
              />
              <Shop
                v-show="currentScene === 'shop'"
                key="shop"
              />
              <Nursery
                v-show="currentScene === 'nursery'"
                key="nursery"
              />
              <BloodSport
                v-show="currentScene === 'bloodsport'"
                key="bloodsport"
              />
              <Monsters
                v-show="currentScene === 'monsters'"
                key="monsters"
              />
              <Consumables
                v-show="currentScene === 'consumable'"
                key="consumable"
              />
              <Equipment
                v-show="currentScene === 'equipment'"
                key="equipment"
              />
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import {ref, computed, onMounted, watch, useTemplateRef} from 'vue'
import { useRandomNumber, useInterpretNumber } from '@/composables/useNumberInterpretor.js'
import { monsterDirectory } from '@/composables/useMonsterList.js'
import { loadData, saveData } from '@/composables/useLocalStorage.js'
import { animate } from 'animejs'

const startedGame = ref(false)

const currentScene = ref('shop')

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
