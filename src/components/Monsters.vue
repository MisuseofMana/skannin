<template>
  <v-row class="mt-4">
    <v-col
      v-for="monster in monsterDirectory"
      :key="monster.name"
      cols="12"
      md="10"
      class="offset-md-1"
    >
      <v-sheet
        class="pa-6"
        elevation="0"
        rounded
        color="blue-grey-darken-4"
      >
        <span>
          <v-row class="d-flex align-center justify-space-around">
            <v-col>
              <v-img
                :class="[
                  monster.quantity > 0 ? '' : 'shadow',
                  monster.stats.hp <= 0 ? 'dead' : ''
                ]"
                min-width="200px"
                :src="useGetImage(monster)"
              />
            </v-col>
            <v-col>
              <div v-if="monster.quantity > 0">
                <h2 class="text-h4">{{ monster.name }}</h2>
                <h2 class="text-h6 mb-3">Lvl {{ monster.quantity }}</h2>
                <div class="d-flex align-center mb-2">
                  <p class="text-h6 mr-2">XP: </p>
                  <v-progress-linear 
                    size="x-large"
                    height="20px"
                    rounded
                    max="50"
                    :model-value="monster.stats.xp"
                  />
                  <p class="text-h6 ml-2 text-no-wrap">{{ monster.stats.xp }} / {{ calculatedXPGoal(monster.quantity) }} </p>
                </div>
                <p v-if="monster.stats.hp <= 0">
                  This one looks like it's dead.
                </p>
                <p
                  v-else
                  class="text-body-1 mr-5 mb-4"
                >{{ monster.specialInfo }}</p>
                <div class="d-flex">
                  <v-menu location="bottom">
                    <template #activator="{ props }">
                      <v-btn
                        v-bind="props"
                        variant="tonal"
                        size="x-large"
                        :disabled="onlyAvailableEquipment.length <= 0"
                        class="mr-5"
                      >
                        Equip
                      </v-btn>
                    </template>


                    <v-list>
                      <v-list-item
                        v-for="(piece, index) in onlyAvailableEquipment"
                        :key="index"
                        :value="piece"
                        @click="useEquipment(piece, monster)"
                      >
                        <div class="d-flex">
                          <v-img
                            max-width="50px"
                            min-width="50px"
                            :src="useGetImage(piece)"
                          />
                          <div>
                            <v-list-item-title class="text-h6">{{ piece.name }} <span class="text-blue">{{ piece.description }}</span></v-list-item-title>
                            <v-list-item-subtitle class="text-body-1">x{{ piece.quantity }}</v-list-item-subtitle>
                          </div>
                        </div>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <div class="text-center">
                    <v-menu location="bottom">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          variant="tonal"
                          size="x-large"
                          :disabled="onlyAvailableEquipment.length <= 0"
                        >
                          Item
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                          v-for="(item, index) in onlyAvailableItems"
                          :key="index"
                          :value="item"
                          @click="useItem(item, monster)"
                        >
                          <div class="d-flex">
                            <v-img
                              max-width="50px"
                              min-width="50px"
                              :src="useGetImage(item)"
                            />
                            <div>
                              <v-list-item-title class="text-h6">{{ item.name }} <span class="text-blue">{{ item.description }}</span></v-list-item-title>
                              <v-list-item-subtitle class="text-body-1">x{{ item.quantity }}</v-list-item-subtitle>
                            </div>
                          </div>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </div>
              </div>
              <p
                v-else
                class="text-center text-h2"
              >???</p>
            </v-col>
          </v-row>
        
          <div
            v-if="monster.quantity > 0"
            class="mt-2"
          >
            <div class="d-flex align-center justify-space-around">
              <div class="mb-2 text-center text-body-1">
                <div v-if="monster.equipment">
                  <v-img
                    min-width="100px"
                    max-width="100px"
                    :src="useGetImage(monster.equipment)"
                  />
                  <p>{{ monster.equipment.name }}</p>
                  <p
                    class="text-body-2"
                    style="max-width:100px;"
                  >{{ monster.equipment.description }}</p>
                </div>
                <p v-else>Nothing Equipped</p>
              </div>
              <div class="mb-2 text-center">
                <p class="text-h5 text-green mb-2">HP</p>
                <p class="text-h5">{{ monster.stats.hp }} / {{ monster.stats.maxhp }}</p>
              </div>
              <div class="mb-2 text-center">
                <p class="text-h5 text-red mb-2">ATK</p>
                <p class="text-h5">{{ monster.stats.attack }} / {{ monster.stats.maxattack }}</p>
              </div>
              <div class="mb-2 text-center">
                <p class="text-h5 text-blue mb-2">DEF</p>
                <p class="text-h5">{{ monster.stats.defense }} / {{ monster.stats.maxdefense }}</p>
              </div>
            </div>
          </div>
        </span>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed } from 'vue'
import { monsterDirectory } from '@/composables/useMonsterList.js'
import { equipmentDirectory, consumableDirectory } from '@/composables/useItemList.js'
import { loadData } from '@/composables/useLocalStorage.js'
import { onMounted } from 'vue'
import { useGetImage } from '@/composables/useImageRoute.js'
import { sortByQuantity } from '@/composables/useSorting.js'

const onlyAvailableEquipment = computed(() => {
  return equipmentDirectory.value.filter((piece) => {
    return piece.quantity > 0
  })
})

const onlyAvailableItems = computed(() => {
  return consumableDirectory.value.filter((item) => {
    return item.quantity > 0
  })
})

const getMonster = (monster) => {
  return monsterDirectory.value.find(m => m.name == monster.name)
}

const getItem = (which) => {
  return consumableDirectory.value.find(i => i.name == which.name)
}

const getEquipment = (which) => {
  return equipmentDirectory.value.find(e => e.name == which.name)
}

const calculatedXPGoal = (monsterLevel) => {
  return Math.ceil(monsterLevel**3 + 1.15)
}


const useItem = (item, monster) => {
  const targetMonster = getMonster(monster)
  const targetItem = getItem(item)
  targetItem.quantity -= 1

  if (targetItem.buffStat) targetMonster.stats[targetItem.buffStat] += targetItem.value
  if (targetItem.debuffStat) targetMonster.stats[targetItem.debuffStat] -= targetItem.damage

  if (targetMonster.stats.xp >= 40) {
    targetMonster.quantity += 1
    targetMonster.stats.maxhp += 2
    targetMonster.stats.maxattack += 1
    targetMonster.stats.maxdefense += 1
  }
}

const useEquipment = (equipment, monster) => {
  const targetMonster = getMonster(monster)

  if (targetMonster.equipment) {
    const returnEquipment = getEquipment(targetMonster.equipment)

    if (returnEquipment.buffStat) { 
      targetMonster.stats[returnEquipment.buffStat] -= returnEquipment.value
      targetMonster.stats[`max${returnEquipment.buffStat}`] -= returnEquipment.value
    }
    if (returnEquipment.debuffStat) {
      targetMonster.stats[returnEquipment.debuffStat] += returnEquipment.damage
      targetMonster.stats[`max${returnEquipment.debuffStat}`] += returnEquipment.damage
    }

    returnEquipment.quantity += 1
  }

  const targetEquipment = getEquipment(equipment)
  targetEquipment.quantity -= 1

  if (targetEquipment.buffStat) { 
      targetMonster.stats[targetEquipment.buffStat] += targetEquipment.value
      targetMonster.stats[`max${targetEquipment.buffStat}`] += targetEquipment.value
    }
    if (targetEquipment.debuffStat) {
      targetMonster.stats[targetEquipment.debuffStat] -= targetEquipment.damage
      targetMonster.stats[`max${targetEquipment.debuffStat}`] -= targetEquipment.damage
    }

  targetMonster.equipment = targetEquipment
}

const overlay = ref(true)
onMounted(() => {
  const monsterData = loadData('savedMonsters')
  if (monsterData) {
    monsterDirectory.value = sortByQuantity(monsterData)
  }
})
</script>