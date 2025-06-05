<template>
  <v-row class="mb-1">
    <v-col
      cols="12"
      md="4"
    >
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="amber-darken-2"
        prepend-icon="mdi-cart-outline"
        text="Shop"
        @click="emit('switch-scene', 'shop')"
      />
    </v-col>
    <v-col
      cols="12"
      md="4"
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
      md="4"
    >
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="blue-darken-1"
        prepend-icon="mdi-emoticon-devil"
        text="Monsters"
        @click="emit('switch-scene', 'monsters')"
      />
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="blue-darken-2"
        prepend-icon="mdi-briefcase"
        text="Items"
        @click="emit('switch-scene', 'consumable')"
      />
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="blue-darken-2"
        prepend-icon="mdi-hanger"
        text="Equipment"
        @click="emit('switch-scene', 'equipment')"
      />
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <v-btn
        size="x-large"
        width="100%"
        elevation="0"
        color="red-darken-3"
        prepend-icon="mdi-sword"
        text="Bloodsport"
        @click="emit('switch-scene', 'bloodsport')"
      />
    </v-col>
  </v-row>
</template>

<script setup>
const emit = defineEmits(['switch-scene'])
</script>