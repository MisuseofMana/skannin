<template>
  <v-row>
    <v-col
      v-for="(monster, index) in monsterDirectory"
      :key="monster.name"
      cols="12"
      md="6"
    >
      <v-sheet
        class="pa-6"
        elevation="4"
        rounded
      >
        <span>
          <v-row class="d-flex justify-space-between">
            <v-col>
              <v-img
                :class="monster.currentLevel > 0 ? '' : 'shadow'"
                min-width="200px"
                :src="getMonsterImage(monster)"
              />
            </v-col>
            <v-col>
              <p v-if="monster.currentLevel > 0">{{ monster.specialInfo }}</p>
              <p v-else>???</p>
            </v-col>
          </v-row>
        
          <div v-if="monster.currentLevel > 0">
            <div class="d-flex align-center mb-2">
              <p class="text-body mr-2 text-no-wrap"> {{ monster.stats.hp }} / 9</p>
              <v-progress-linear
                v-model="monster.stats.hp"
                height="20"
                rounded
                color="green-lighten-2"
              />
            </div>
            <div class="d-flex align-center mb-2">
              <p class="text-body mr-2 text-no-wrap"> {{ monster.stats.attack }}</p>
              <v-progress-linear
                v-model="monster.stats.attack"
                height="20"
                rounded
                color="red-lighten-2"
              />
            </div>
            <div class="d-flex align-center mb-2">
              <p class="text-body mr-2 text-no-wrap"> {{ monster.stats.defense }}</p>
              <v-progress-linear
                v-model="monster.stats.defense"
                height="20"
                rounded
                color="blue-lighten-2"
              />
            </div>
          </div>
        </span>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { monsterDirectory } from '@/composables/useMonsterList.js'
import { loadData, saveData } from '@/composables/useLocalStorage.js'
import { onMounted, watch } from 'vue'

onMounted(() => {
  const monsterData = loadData('savedMonsters')

  if (monsterData) {
    monsterDirectory.value = monsterData
  }
})

watch(monsterDirectory, (newValue) => {
    saveData('savedMonsters', newValue);
  }, { deep: true });

const getMonsterImage = ({type, name}) => {
  return new URL(`../assets/monsters/${type}/${name}.png`, import.meta.url).href
}

</script>