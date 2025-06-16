<template>
  <v-row>
    <v-col>
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="grey"
        class="mb-5"
        prepend-icon="mdi-arrow-left"
        text="Back To Menu"
        @click="emit('leave-scene')"
      />

      <div class="d-flex justify-center flex-grow-1">
      <v-icon
        size="35"
        class="mr-2"
      >
        mdi-emoticon-devil
      </v-icon>
      <h2 class="text-h4 mb-3">
        Monsters
      </h2>
    </div>
    </v-col>

    <v-col
      v-for="monster in monsterDirectory"
      :key="monster.name"
      cols="12"
      md="10"
      class="offset-md-1"
    >
      <v-sheet
        v-if="!monster.nurseryData.isInNursery"
        class="pa-6"
        elevation="0"
        rounded
        color="blue-grey-darken-4"
      >
        <span>
          <v-row>
            <v-col>
              <v-img
                :class="[
                  monster.quantity > 0 ? '' : 'shadow',
                  monster.stats.hp <= 0 ? 'dead' : ''
                ]"
                :src="useGetImage(monster)"
              />
              <div
                v-if="monster.quantity > 0"
                class="text-center d-flex justify-center"
                :class="calculateHPColor(monster)"
              >
                <p class="text-h5 mr-2">HP</p>
                <p class="text-h5">{{ monster.stats.hp }} / {{ monster.stats.maxhp }}</p>
              </div>
            </v-col>
            <v-col class="my-auto">
              <div v-if="monster.quantity > 0">
                <div class="d-flex justify-space-between align-center mb-2">
                  <h2 class="text-h5">{{ monster.name }}</h2>
                  <h2 class="text-h6">Lvl {{ monster.quantity }}</h2>
                </div>
                <div class="d-flex align-center mb-2">
                  <p class="text-body-1 mr-2">XP: </p>
                  <v-progress-linear 
                    size="x-large"
                    height="20px"
                    rounded
                    max="50"
                    :model-value="monster.stats.xp"
                  />
                  <p class="text-body-1 ml-2 text-no-wrap">{{ monster.stats.xp }} / {{ calculatedXPGoal(monster.quantity) }} </p>
                </div>
                <p
                  v-if="monster.stats.hp <= 0"
                  class="text-body-1 mr-5 mb-4"
                >
                  This one looks like it's dead.
                </p>
                <p
                  v-else
                  class="text-body-1 mb-4"
                >{{ monster.specialInfo }}</p>
              </div>
              <div v-else class="text-center text-h2">
                <p>???</p>
              </div>
            </v-col>
          </v-row>
        

          <v-row class="mb-3" v-if="monster.quantity > 0">
            <v-col cols="6">
              <div class="d-flex">
                <v-menu location="bottom">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      :color="onlyAvailableEquipment.length <= 0 || monster.stats.hp <= 0 ? 'grey' : 'teal-darken-2'"
                      :variant="onlyAvailableEquipment.length <= 0 || monster.stats.hp <= 0 ? 'tonal' : 'flat'"
                      size="x-large"
                      width="100%"
                      class="mr-5"
                      :disabled="onlyAvailableEquipment.length <= 0 || monster.stats.hp <= 0"
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
              </div>
            </v-col>

            <v-col cols="6">
              <div class="text-center">
                <v-menu location="bottom">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      size="x-large"
                      width="100%"
                      :color="onlyAvailableItems.length <= 0 || monster.stats.hp <= 0 ? 'grey' : 'teal-darken-2'"
                      :variant="onlyAvailableItems.length <= 0 || monster.stats.hp <= 0 ? 'tonal' : 'flat'"
                      :disabled="onlyAvailableItems.length <= 0 || monster.stats.hp <= 0"
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
            </v-col>
          </v-row>

          <div
            v-if="monster.quantity > 0 && monster.equipment"
            class="mt-2"
          >
            <v-sheet class="mb-2 pa-3">
              <div
                v-if="monster.equipment"
                class="d-flex justify-space-around align-center"
                color="teal-darken-2"
              >
                <div class="d-flex align-center">
                  <v-img
                  min-width="50px"
                  max-width="50px"
                  class="mr-2"
                  :src="useGetImage(monster.equipment)"
                  />
                  <div>
                    <p class="text-h6">{{ monster.equipment.name }}</p>
                    <p
                    class="text-body-1"
                    style="max-width:100px;"
                    >Gives {{ monster.equipment.description }}</p>
                  </div>
                </div>
                <v-btn
                  size="small"
                  rounded="xl"
                  color="amber-darken-2"
                  variant="flat"
                  @click="removeEquipment(monster)"
                >
                  Unequip
                </v-btn>
              </div>
              <p v-else>Nothing Equipped</p>
            </v-sheet>
          </div>
        </span>
      </v-sheet>
      <v-sheet
        v-else
        class="pa-6 d-flex align-center justify-space-between"
        elevation="0"
        rounded
        color="blue-grey-darken-4"
      >
        <v-img
          class="nursery"
          max-width="150px"
          :src="useGetImage(monster)"
        />
        <p class="text-body-1">{{ monster.name }} is in the nursery.</p>
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

const emit = defineEmits(['leave-scene'])

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
  return Math.ceil(monsterLevel**3 + 1.25)
}

const calculateHPColor = (monster) => {
  const {stats: {hp, maxhp}} = monster
  if (hp >= maxhp * .75) {
    return 'text-green'
  }
  else if (hp >= maxhp * .50) {
    return 'text-yellow'
  }
  else if (hp >= maxhp * .25) {
    return 'text-orange'
  }
  else if (hp < maxhp * .25) {
    return 'text-red'
  }
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

const removeEquipment = (monster) => {
    const targetEquipment = getEquipment(monster.equipment)
    targetEquipment.quantity += 1
    monster.equipment = null
  }

onMounted(() => {
  const monsterData = loadData('savedMonsters')
  if (monsterData) {
    monsterDirectory.value = sortByQuantity(monsterData)
  }
})
</script>