<template>
  <v-row class="my-15">
    <v-spacer />
    <v-col
      v-if="scene === 'menu'"
      cols="12"
      md="6"
    >
      <v-btn
        size="x-large"
        width="100%"
        class="mb-5"
        color="amber-darken-1"
        prepend-icon="mdi-cart-outline"
        text="Shop"
        @click="animateToShop"
      />
      <v-btn
        size="x-large"
        width="100%"
        class="mb-5"
        color="teal-darken-1"
        prepend-icon="mdi-mother-nurse"
        text="Nursery"
        @click="showNursery"
      />
      <v-btn
        size="x-large"
        width="100%"
        class="mb-5"
        color="red-darken-1"
        prepend-icon="mdi-sword-cross"
        text="Blood Sports"
        @click="showBloodSport"
      />
    </v-col>

    <v-col
      v-if="scene === 'shop'"
      cols="12"
      md="6"
    >
      <v-img 
        aspect-ratio="2/1"
        max-width="400"
        src="`../assets/shop/2.png`"
      />
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { animate } from 'animejs';

const scene = ref('menu')

const animateToShop = () => {
  animate('.v-window__container', {
      scale: [1, 0],
      opacity: [1, 0],
      duration: 450,
      onComplete: () => showShop()
  }) 
}

const showShop = () => {
  scene.value = 'shop'
  animate('.v-window__container', {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 450,
        onComplete: () => console.log('hi')
    }) 
}

const showNursery = () => {
    console.log('to next scene')
}

const showBloodSport = () => {
    console.log('to next scene')
}
</script>