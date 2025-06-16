<template>
  <v-row class="mb-1 mx-auto" style="max-width: 400px;">
    <v-col
      cols="12"
    >
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="amber"
        prepend-icon="mdi-cart-outline"
        text="Shop"
        @click="emit('switch-scene', 'shop')"
      />
    </v-col>
    <v-col
      cols="12"
    >
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="teal"
        prepend-icon="mdi-egg"
        text="Nursery"
        @click="emit('switch-scene', 'nursery')"
      />
    </v-col>
    <v-col
      cols="12"
    >
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="red"
        prepend-icon="mdi-sword"
        text="Bloodsport"
        @click="emit('switch-scene', 'bloodsport')"
      />
    </v-col>
    <v-divider thickness="3" class="my-8" color="white"/>
    <v-col
      cols="12"
    >
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="blue"
        prepend-icon="mdi-briefcase"
        text="Items"
        @click="emit('switch-scene', 'consumable')"
      />
    </v-col>
    <v-col
      cols="12"
    >
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="blue"
        prepend-icon="mdi-hanger"
        text="Equipment"
        @click="emit('switch-scene', 'equipment')"
      />
    </v-col>
    <v-col
      cols="12"
    >
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="red"
        prepend-icon="mdi-emoticon-devil"
        text="Monsters"
        @click="emit('switch-scene', 'monsters')"
      />
    </v-col>
  </v-row>
</template>

<script setup>
const emit = defineEmits(['switch-scene'])
</script>