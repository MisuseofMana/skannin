import { ref } from 'vue'

const MonsterTypes = {
    AIR: 'air', 
    WATER: 'water',
    FIRE: 'fire', 
    EARTH: 'earth'
}

export const monsterDirectory = ref([
    {
      currentLevel: 0,
      name: "Boostbone",
      type: MonsterTypes.AIR,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "Uses after boosters to take to the skies. Always playing AM radio recieved through it's antenna at full blast."
    },
    {
      currentLevel: 0,
      name: "Skelling",
      type: MonsterTypes.AIR,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "A bit rough around the edges this one. A genuine softie at heart."
    },
    {
      currentLevel: 0,
      name: "Wormbo",
      type: MonsterTypes.AIR,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "Like those worm on a string, but actually alive and not just a charlatons magic trick meant to dissapoint children."
    },
    {
      currentLevel: 0,
      name: "Beesquito",
      type: MonsterTypes.AIR,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "Half bee, half mosquito, a real pest. Never really gets a hint, but is a good listener."
    },
    {
      currentLevel: 0,
      name: "Bayga",
      type: MonsterTypes.EARTH,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "Pretty grounded emotionally for a monster, usually a loner and loves to climb around in trees and eat birds."
    },
    {
      currentLevel: 0,
      name: "Impin",
      type: MonsterTypes.EARTH,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "A stinky little devil thing. Knows a few minor earth cantrips and brags a lot about them."
    },
    {
      currentLevel: 0,
      name: "Trunk",
      type: MonsterTypes.EARTH,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "A tree that was over-fertilized and gained sentience. Doesn't have much to say, and is all the more pleasant for it."
    },
    {
      currentLevel: 0,
      name: "Shrewt",
      type: MonsterTypes.EARTH,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "Shrewt has an ungodly smell, like those corpse flowers in the Sumatran rain forests."
    },
    {
      currentLevel: 0,
      name: "Braino",
      type: MonsterTypes.FIRE,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "A two legged salamander born in a volcano. Has a hot temper and is writing a sad novel in its free time."
    },
    {
      currentLevel: 0,
      name: "Jakwabbit",
      type: MonsterTypes.FIRE,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "Moves really fast, but trips over himself often. The kinda monster that won't show up to your wedding."
    },
    {
      currentLevel: 0,
      name: "Yeek",
      type: MonsterTypes.FIRE,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "Yeek is the king of the monsters, well, at least that's what Yeek thinks."
    },
    {
      currentLevel: 0,
      name: "Pinche",
      type: MonsterTypes.FIRE,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "Hard exterior, hard interior, as loyal as they come. Probably tastes amazing in a soup."
    },
    {
      currentLevel: 0,
      name: "Bleyeb",
      type: MonsterTypes.WATER,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "An odd monster as monsters go. Interested in SEEING things with its big eyes."
    },
    {
      currentLevel: 0,
      name: "Chrimp",
      type: MonsterTypes.WATER,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "Escaped a crabbing vessel recently and is a little traumatized. Needs therapy."
    },
    {
      currentLevel: 0,
      name: "Finna",
      type: MonsterTypes.WATER,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "Really just wants to find common ground with you but has a hard time articulating."
    },  
    {
      currentLevel: 0,
      name: "Guhpee",
      type: MonsterTypes.WATER,
      stats: {
        hp: 1,
        defense: 1,
        attack: 1
      },
      specialInfo: "Some aquatic life evolved legs and lungs, Guhpee put time in at the gym and now it's dummy jacked."
    },  
])