<script setup lang="ts">
import {
  computed,
  ref
} from 'vue'
import store from './store'
console.log(store)
const name = ref(null)
name.value = store.name;
</script>

<template>
  <div>
    <input v-model="name" placeholder="редактировать имя" />
    <p>Ваше имя: {{ name }}</p>
  </div>
</template>

<style scoped>
</style>
