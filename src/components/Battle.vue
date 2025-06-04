<template>
  <v-row class="my-5">
    <v-col
      v-if="scene != 'menu'"
      cols="12"
    >
      <v-btn
        size="x-large"
        width="100%"
        class="mb-5"
        color="teal-darken-1"
        prepend-icon="mdi-arrow-left"
        text="Back To Menu"
        @click="showScene('nursery')"
      >
        Back to Menu
      </v-btn>
    </v-col>
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
        @click="showScene('shop')"
      />
      <v-btn
        size="x-large"
        width="100%"
        class="mb-5"
        color="teal-darken-1"
        prepend-icon="mdi-mother-nurse"
        text="Nursery"
        @click="showScene('nursery')"
      />
      <v-btn
        size="x-large"
        width="100%"
        class="mb-5"
        color="red-darken-1"
        prepend-icon="mdi-sword-cross"
        text="Blood Sports"
        @click="showScene('bloodsport')"
      />
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { animate } from 'animejs';

const scene = ref('menu')

const scaleOut = {
  scale: [1, 0],
  opacity: [1, 0],
  duration: 450,
}

const scaleIn = {
  scale: [0, 1],
  opacity: [0, 1],
  duration: 450,
}

const showScene = (sceneString) => {
  animate('.v-window__container', {
    ...scaleOut,
    onComplete: () => {
      scene.value = sceneString
      animate('.v-window__container', scaleIn)
    }
  }) 
}
</script>