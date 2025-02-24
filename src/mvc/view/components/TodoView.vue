<script setup lang="ts">
import type {
  TodoVO,
} from '~/mvc/model/vo';
import {
  formatDate,
} from '~/utils';
import {
  Icon,
} from '@iconify/vue';

const {
  todo,
  showMenu = true,
  isSelected = false,
} = defineProps<{
  todo: TodoVO,
  showMenu?: boolean,
  isSelected?: boolean,
}>();

const emits = defineEmits<{
  edit: [string],
  delete: [string],
}>();

const onButtonEditClick = () => {
  console.log('> TodoView -> onButtonEditClick');
  emits('edit', todo.id);
};

const onButtonDeleteClick = () => {
  console.log('> TodoView -> onButtonDeleteClick');
  emits('delete', todo.id);
};

</script>
<template>
  <div
    class="
      bg-base-200
      px-3 py-2
      rounded-xl
      box-content
      border-1
      transition-colors
      border-gray-200
      group
    "
    :class="{
      'border-gray-600': isSelected,
      'hover:border-gray-300': !isSelected,
    }"
  >
    <div class="relative">
      <div class="flex flex-col">
        <div class="flex flex-row justify-between">
          <span class="text-sm">
            {{ todo.text }}
          </span>
        </div>
        <span class="text-xs text-gray-500">
          {{ formatDate(todo.createdAt) }}
        </span>
      </div>
      <div v-if="showMenu" class="flex flex-row absolute right-0 opacity-0 top-0 space-x-2 group-hover:opacity-100 transition-opacity duration-500">
        <button
          v-for="(btn, index) in [
            { icon: 'clarity:pencil-line', handler: onButtonEditClick },
            { icon: 'clarity:trash-line', handler: onButtonDeleteClick },
          ]"
          :key="index"
          class="text-gray-400 hover:text-gray-800 cursor-pointer transition-colors"
          @click="btn.handler"
        >
          <Icon class="size-3" :icon="btn.icon" />
        </button>
      </div>
    </div>
  </div>
</template>