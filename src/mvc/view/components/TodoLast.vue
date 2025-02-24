

<script setup lang="ts">
import type {
  TodoVO,
} from '~/mvc/model/vo';
import TodoView from './TodoView.vue';

defineProps<{
  todo: TodoVO | undefined
}>();

</script>
<template>
  <div class="flex flex-col justify-start items-start w-sm">
    <span class="break-all">
      Последняя созданная задача:
    </span>
    <TodoView v-if="todo" :show-menu="false" :todo="todo" />
    <div v-else>
      <span class="text-info">
        Не задано
      </span>
    </div>
  </div>
</template>
