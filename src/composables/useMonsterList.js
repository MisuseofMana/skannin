import { ref, watch } from 'vue'
import { DiscoverableTypes as DT } from './useDiscoverableTypes'
import { saveData } from './useLocalStorage'

const MonsterTypes = {
    AIR: 'air', 
    WATER: 'water',
    FIRE: 'fire', 
    EARTH: 'earth'
}

export const monsterDirectory = ref([
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Boostbone",
      type: MonsterTypes.AIR,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "Uses after boosters to take to the skies. Always playing AM radio recieved through it's antenna at full blast."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Skelling",
      type: MonsterTypes.AIR,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 1,
        maxattack: 1,
        defense: 2,
        maxdefense: 2,
      },
      equipment: null,
      specialInfo: "A bit rough around the edges this one. A genuine softie at heart."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Wormbo",
      type: MonsterTypes.AIR,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "Like those worm on a string, but actually alive and not just a charlatons magic trick meant to dissapoint children."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Beesquito",
      type: MonsterTypes.AIR,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "Half bee, half mosquito, a real pest. Never really gets a hint, but is a good listener."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Bayga",
      type: MonsterTypes.EARTH,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "Pretty grounded emotionally for a monster, usually a loner and loves to climb around in trees and eat birds."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Impin",
      type: MonsterTypes.EARTH,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "A stinky little devil thing. Knows a few minor earth cantrips and brags a lot about them."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Trunk",
      type: MonsterTypes.EARTH,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "A tree that was over-fertilized and gained sentience. Doesn't have much to say, and is all the more pleasant for it."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Shrewt",
      type: MonsterTypes.EARTH,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "Shrewt has an ungodly smell, like those corpse flowers in the Sumatran rain forests."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Braino",
      type: MonsterTypes.FIRE,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "A two legged salamander born in a volcano. Has a hot temper and is writing a sad novel in its free time."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Jakwabbit",
      type: MonsterTypes.FIRE,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "Moves really fast, but trips over himself often. The kinda monster that won't show up to your wedding."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Yeek",
      type: MonsterTypes.FIRE,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "Yeek is the king of the monsters, well, at least that's what Yeek thinks."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Pinche",
      type: MonsterTypes.FIRE,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "Hard exterior, hard interior, as loyal as they come. Probably tastes amazing in a soup."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Bleyeb",
      type: MonsterTypes.WATER,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "An odd monster as monsters go. Interested in SEEING things with its big eyes."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Chrimp",
      type: MonsterTypes.WATER,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "Escaped a crabbing vessel recently and is a little traumatized. Needs therapy."
    },
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Finna",
      type: MonsterTypes.WATER,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "Really just wants to find common ground with you but has a hard time articulating."
    },  
    {
      classification: DT.MONSTER,
      quantity: 0,
      name: "Guhpee",
      type: MonsterTypes.WATER,
      stats: {
        xp:1,
        hp: 6,
        maxhp: 6,
        attack: 2,
        maxattack: 2,
        defense: 0,
        maxdefense: 0,
      },
      equipment: null,
      specialInfo: "Some aquatic life evolved legs and lungs, Guhpee put time in at the gym and now it's dummy jacked."
    },  
])

watch(monsterDirectory, (newValue) => {
    saveData('savedMonsters', newValue);
  }, { deep: true });