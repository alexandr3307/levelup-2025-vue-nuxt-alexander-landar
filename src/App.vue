<script setup lang="ts">
import {
  computed,
  onMounted,
  ref
} from 'vue'
import { default as Header} from './mvc/view/TodoHeader.vue'
import store from './store'
import {
  TodoVO,
} from './mvc/model/vo'
const todo = ref<TodoVO | undefined>();
onMounted(() => {
  console.log('App onMounted')
})
const onInputKeyUpEnter = (event: KeyboardEvent) => {
  const domInput = event.target as HTMLInputElement;
  const inputText: string = domInput.value;
  console.log('App -> onInputKeyUpEnter', {
    event, inputText, 
  })
  const id = Date.now().toString();
  const createdAt = new Date();
  todo.value = new TodoVO(
    id,
    inputText,
    createdAt
  )
}
</script>

<template>
<div class="flex flex-col items-center justify-start h-full">
  <Header />
  <div class="flex flex-col w-full justify-center items-center">
      <fieldset class="fieldset flex flex-col items-center justify-center">
        <legend class="fieldset-legend w-full justify-center">
          Введите что хотите сделать
        </legend>
        <input class="input" placeholder="Type here" type="text" @keyup.enter="onInputKeyUpEnter">
        <p class="fieldset-label">
          Для создания нажмите enter
        </p>
      </fieldset>
    </div>
    <div class="flex flex-col justify-start items-start w-sm">
      <span>Созданная задача:</span>
      <div v-if="todo" class="flex flex-col bg-base-200 px-3 pb-2 pt-1 rounded-xl">
        <span class="break-normal">
          {{ todo.text }}
        </span>
        <span class="text-xs">
          {{ todo.createdAt }}
        </span>
      </div>
      <div v-else>
        <span class="text-info">
          Не задано
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
