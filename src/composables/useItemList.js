import { ref, watch } from 'vue'
import { saveData } from './useLocalStorage.js'
import { DiscoverableTypes as DT } from './useDiscoverableTypes'

export const Stats = {
  ATTACK: 'attack',
  DEFENSE: 'defense',
  HEALTH: 'hp',
  XP: 'xp'
}

export const bookDirectory = ref([
    {
      classification: DT.BOOK,
      quantity: 0,
      value: 1,
      name: "Armor Book",
      path: 'armor-book',
      type: DT.CONSUMABLE,
      description: 'A book that increases a monsters maximum defense by one.'
    },
    {
      classification: DT.BOOK,
      quantity: 0,
      value: 1,
      name: "Attack Book",
      path: 'attack-book',
      type: DT.CONSUMABLE,
      description: 'A book that increases a monsters maximum attack by one.'
    },
    {
      classification: DT.BOOK,
      quantity: 0,
      value: 1,
      name: "Health Book",
      path: 'attack-book',
      type: DT.CONSUMABLE,
      description: 'A book that increases a monsters maximum health by one.'
    },
])

watch(bookDirectory, (newValue) => {
  saveData('savedBooks', newValue);
}, { deep: true });

export const gemDirectory = ref([
    {
      classification: DT.GEM,
      quantity: 0,
      value: 1,
      name: "Air Gem",
      path: 'airgem',
      type: DT.CONSUMABLE,
      description: 'An air element gem, can level up an air monster by one level.'
    },
    {
      classification: DT.GEM,
      quantity: 0,
      value: 1,
      name: "Earth Gem",
      path: 'earthgem',
      type: DT.CONSUMABLE,
      description: 'An earth element gem, can level up an earth monster by one level.'
    },
    {
      classification: DT.GEM,
      quantity: 0,
      value: 1,
      name: "Fire Gem",
      path: 'firegem',
      type: DT.CONSUMABLE,
      description: 'A fire element gem, can level up a fire monster by one level.'
    },
    {
      classification: DT.GEM,
      quantity: 0,
      value: 1,
      name: "Water Gem",
      path: 'watergem',
      type: DT.CONSUMABLE,
      description: 'A water element gem, can level up a water monster by one level.'
    },
])

watch(gemDirectory, (newValue) => {
  saveData('savedGems', newValue);
}, { deep: true });

export const consumableDirectory = ref([
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 10,
    damage: 0,
    buffStat: Stats.XP,
    debuffStat: null,
    name: "Banana",
    path: 'banana',
    type: DT.CONSUMABLE,
    description: 'XP +10'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 2,
    damage: 0,
    buffStat: Stats.HEALTH,
    debuffStat: null,
    name: "Cookie",
    path: 'cookie',
    type: DT.CONSUMABLE,
    description: 'HP +2'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 3,
    damage: 0,
    buffStat: Stats.HEALTH,
    debuffStat: null,
    name: "Sandwich",
    path: 'sandwich',
    type: DT.CONSUMABLE,
    description: 'HP +3'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 4,
    damage: 0,
    buffStat: Stats.HEALTH,
    debuffStat: null,
    name: "Burger",
    path: 'burger',
    type: DT.CONSUMABLE,
    description: 'HP +3'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 5,
    damage: 0,
    buffStat: Stats.HEALTH,
    debuffStat: null,
    name: "Potion",
    path: 'potion',
    type: DT.CONSUMABLE,
    description: 'HP +5'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 6,
    damage: 0,
    buffStat: Stats.HEALTH,
    debuffStat: null,
    name: "Radish",
    path: 'radish',
    type: DT.CONSUMABLE,
    description: 'HP +6'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 10,
    damage: 2,
    buffStat: Stats.XP,
    debuffStat: Stats.HEALTH,
    name: "Cigarettes",
    path: 'cigarettes',
    type: DT.CONSUMABLE,
    description: 'XP +20, HP -2'
  },
  // {
  //   classification: DT.CONSUMABLE,
  //   quantity: 0,
  //   value: 999,
  //   damage: 0,
  //   stat: null,
  //   debuffStat: null,
  //   name: "Monster Controller",
  //   path: 'revive',
  //   type: DT.CONSUMABLE,
  //   description: 'Ancient technology from the early 2000s. Can rebuild a monsters essence, bringing it back from death.'
  // },
])

watch(consumableDirectory, (newValue) => {
  console.log('saving consumable')
  saveData('savedConsumables', newValue);
}, { deep: true });

export const equipmentDirectory = ref([
  {
    classification: DT.EQUIPMENT,
    quantity: 0,
    value: 1,
    damage: 0,
    buffStat: Stats.DEFENSE,
    debuffStat: null,
    name: "Amulet",
    path: 'amulet',
    type: DT.EQUIPMENT,
    description: 'Def +1'
  },
  {
    classification: DT.EQUIPMENT,
    quantity: 0,
    value: 1,
    damage: 0,
    buffStat: Stats.DEFENSE,
    debuffStat: null,
    name: "Socks",
    path: 'socks',
    type: DT.EQUIPMENT,
    description: 'Def +1'
  },
  {
    classification: DT.EQUIPMENT,
    quantity: 0,
    value: 2,
    damage: 0,
    buffStat: Stats.DEFENSE,
    debuffStat: null,
    name: "Amulet",
    path: 'beads',
    type: DT.EQUIPMENT,
    description: 'Def +2'
  },
  {
    classification: DT.EQUIPMENT,
    quantity: 0,
    value: 2,
    damage: 0,
    buffStat: Stats.DEFENSE,
    debuffStat: null,
    name: "Shield",
    path: 'shield',
    type: DT.EQUIPMENT,
    description: 'Def +2'
  },
  {
    classification: DT.EQUIPMENT,
    quantity: 0,
    value: 3,
    damage: 0,
    buffStat: Stats.DEFENSE,
    debuffStat: null,
    name: "Collar",
    path: 'collar',
    type: DT.EQUIPMENT,
    description: 'Def +3'
  },
  {
    classification: DT.EQUIPMENT,
    quantity: 0,
    value: 4,
    damage: 0,
    buffStat: Stats.DEFENSE,
    debuffStat: null,
    name: "Chainmail",
    path: 'chainmail',
    type: DT.EQUIPMENT,
    description: 'Def +4'
  },
  {
    classification: DT.EQUIPMENT,
    quantity: 0,
    value: 1,
    damage: 0,
    buffStat: Stats.ATTACK,
    debuffStat: null,
    name: "Knife",
    path: 'knife',
    type: DT.EQUIPMENT,
    description: 'Atk +1'
  },
  {
    classification: DT.EQUIPMENT,
    quantity: 0,
    value: 2,
    damage: 0,
    buffStat: Stats.ATTACK,
    debuffStat: null,
    name: "Knuckles",
    path: 'knuckles',
    type: DT.EQUIPMENT,
    description: 'Atk +2'
  },
  {
    classification: DT.EQUIPMENT,
    quantity: 0,
    value: 3,
    damage: 0,
    buffStat: Stats.ATTACK,
    debuffStat: null,
    name: "Gun",
    path: 'gun',
    type: DT.EQUIPMENT,
    description: 'Atk +3'
  },
])

watch(equipmentDirectory, (newValue) => {
  saveData('savedEquipment', newValue);
}, { deep: true });

export const fragmentDirectory = ref([
  {
    classification: DT.FRAGMENT,
    quantity: 0,
    value: 1,
    name: "Fragment",
    path: 'fragment',
    type: DT.FRAGMENT,
    description: 'A fragment'
  }
])

watch(fragmentDirectory, (newValue) => {
  saveData('savedFragments', newValue);
}, { deep: true });
