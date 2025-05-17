import { ref } from 'vue'
import { DiscoverableTypes as DT } from './useDiscoverableTypes'

export const ItemTypes = {
    CONSUMABLE: 'consumable', 
    EQUIPMENT: 'equipment',
    BOOK: 'book',
    GEM: 'gem',
}

export const Stats = {
  ATTACK: 'attack',
  DEFENSE: 'defense',
  HEALTH: 'health'
}

export const bookDirectory = ref([
    {
      classification: DT.BOOK,
      quantity: 0,
      value: 1,
      name: "Armor Book",
      path: 'armor-book',
      type: ItemTypes.CONSUMABLE,
      description: 'A book that increases a monsters maximum defense by one.'
    },
    {
      classification: DT.BOOK,
      quantity: 0,
      value: 1,
      name: "Attack Book",
      path: 'attack-book',
      type: ItemTypes.CONSUMABLE,
      description: 'A book that increases a monsters maximum attack by one.'
    },
    {
      classification: DT.BOOK,
      quantity: 0,
      value: 1,
      name: "Health Book",
      path: 'attack-book',
      type: ItemTypes.CONSUMABLE,
      description: 'A book that increases a monsters maximum health by one.'
    },
])

export const gemDirectory = ref([
    {
      classification: DT.GEM,
      quantity: 0,
      value: 1,
      name: "Air Gem",
      path: 'airgem',
      type: ItemTypes.GEM,
      description: 'An air element gem, can level up an air monster by one level.'
    },
    {
      classification: DT.GEM,
      quantity: 0,
      value: 1,
      name: "Earth Gem",
      path: 'earthgem',
      type: ItemTypes.GEM,
      description: 'An earth element gem, can level up an earth monster by one level.'
    },
    {
      classification: DT.GEM,
      quantity: 0,
      value: 1,
      name: "Fire Gem",
      path: 'firegem',
      type: ItemTypes.GEM,
      description: 'A fire element gem, can level up a fire monster by one level.'
    },
    {
      classification: DT.GEM,
      quantity: 0,
      value: 1,
      name: "Water Gem",
      path: 'watergem',
      type: ItemTypes.GEM,
      description: 'A water element gem, can level up a water monster by one level.'
    },
])

export const consumableDirectory = ref([
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 1,
    damage: 0,
    buffStat: Stats.HEALTH,
    debuffStat: null,
    name: "Banana",
    path: 'banana',
    type: ItemTypes.CONSUMABLE,
    description: 'A ripe banana with the sticker still intact, restores a monster health by one.'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 2,
    damage: 0,
    stat: Stats.HEALTH,
    debuffStat: null,
    name: "Chocolate Cookie",
    path: 'cookie',
    type: ItemTypes.CONSUMABLE,
    description: 'A chocolate chip cookie, heals a monsters health by two.'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 3,
    damage: 0,
    stat: Stats.HEALTH,
    debuffStat: null,
    name: "Sandwich",
    path: 'sandwich',
    type: ItemTypes.CONSUMABLE,
    description: 'A bologna sandwich, heals a monsters health by three.'
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
    type: ItemTypes.CONSUMABLE,
    description: 'A ripe banana with the sticker still intact, restores a monster health by three.'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 5,
    damage: 0,
    stat: Stats.HEALTH,
    debuffStat: null,
    name: "Potion",
    path: 'potion',
    type: ItemTypes.CONSUMABLE,
    description: 'A magic potion, heals a monsters health by five.'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 6,
    damage: 0,
    stat: Stats.HEALTH,
    debuffStat: null,
    name: "Radish",
    path: 'radish',
    type: ItemTypes.CONSUMABLE,
    description: 'A tangy radish, heals a monsters health by six.'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 1,
    damage: 1,
    stat: Stats.ATTACK,
    debuffStat: Stats.HEALTH,
    name: "Cigarettes",
    path: 'cigarettes',
    type: ItemTypes.CONSUMABLE,
    description: 'A pack of lucky strikes longs, increases monsters atttack by one but reduce health by one.'
  },
  {
    classification: DT.CONSUMABLE,
    quantity: 0,
    value: 999,
    damage: 0,
    stat: null,
    debuffStat: null,
    name: "Monster Controller",
    path: 'revive',
    type: ItemTypes.CONSUMABLE,
    description: 'Ancient technology from the early 2000s. Can rebuild a monsters essence, bringing it back from death.'
  },
])

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
    type: ItemTypes.EQUIPMENT,
    description: 'Raises a monsters defense by one when equipped.'
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
    type: ItemTypes.EQUIPMENT,
    description: 'Raises a monsters defense by one when equipped.'
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
    type: ItemTypes.EQUIPMENT,
    description: 'Raises a monsters defense by two when equipped.'
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
    type: ItemTypes.EQUIPMENT,
    description: 'Raises a monsters defense by two when equipped.'
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
    type: ItemTypes.EQUIPMENT,
    description: 'Raises a monsters defense by three when equipped.'
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
    type: ItemTypes.EQUIPMENT,
    description: 'Raises a monsters defense by four when equipped.'
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
    type: ItemTypes.EQUIPMENT,
    description: 'Raises a monsters attack by one when equipped.'
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
    type: ItemTypes.EQUIPMENT,
    description: 'Raises a monsters attack by two when equipped.'
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
    type: ItemTypes.EQUIPMENT,
    description: 'Raises a monsters attack by three when equipped.'
  },
])