<template>
  <v-row
    v-if="showLightsOut"
    no-gutters
    class="mb-10"
  >
    <v-col
      v-for="(square, index) in lightsOut"
      :key="`square-${index}`"
      :class="checkOffset(index)"
      cols="2"
    >
      <v-sheet
        border="lg"
        height="130"
        :color="square.isOn ? 'amber-darken-1' : 'grey-darken-2'"
        @click="toggleSquares(index)"
      />
    </v-col>
  </v-row>
</template>

<script setup>
const showLightsOut = ref(true)

const lightsOut = ref([
  { isOn: false },
  { isOn: true },
  { isOn: true },
  { isOn: false },

  { isOn: true },
  { isOn: false },
  { isOn: true },
  { isOn: false },
  
  { isOn: false },
  { isOn: true },
  { isOn: false },
  { isOn: true },

  { isOn: true },
  { isOn: false },
  { isOn: false },
  { isOn: true },
])

const toggleSquares = (index) => {
  const leftSquares = [0, 4, 8, 12]
  const rightSquares = [3, 7, 11, 15]
  let cardinalDirections = [
    index,
    index - 1,
    index + 1,
    index + 4,
    index - 4
  ]

  if (leftSquares.includes(index)) {
    cardinalDirections = [
      index,
      index + 1,
      index + 4,
      index - 4
    ]
  }
  if (rightSquares.includes(index)) {
    cardinalDirections = [
      index,
      index - 1,
      index + 4,
      index - 4
    ]
  }

  cardinalDirections.forEach(item => {
    if (item < lightsOut.value.length && item >= 0) {
      lightsOut.value[item].isOn = !lightsOut.value[item].isOn
    } 
  })

  let allLightsOn = true
  lightsOut.value.forEach(light => {
    if (light.isOn === false) {
      allLightsOn.value = false
    }
  })

  if (allLightsOn) {
    interpretScanResult()
    toggleLightsOutGame()
  }
}

const toggleLightsOutGame = () => {
  showLightsOut.value = !showLightsOut.value
}
</script>