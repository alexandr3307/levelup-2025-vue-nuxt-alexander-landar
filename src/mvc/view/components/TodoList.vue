<script setup lang="ts">
import {
  TodoVO,
} from '~/mvc/model/vo';
import TodoView from '~/mvc/view/components/TodoView.vue';

defineProps<{
  list: TodoVO[];
  selectedTodo?: TodoVO;
}>();
const emits = defineEmits<{
  edit: [string],
  delete: [string],
}>();
const onTodoViewEdit = (id: string) => {
  console.log('> TodoList -> onTodoViewEdit', id);
  emits('edit', id);
};
const onTodoViewDelete = (id: string) => {
  console.log('> TodoList -> onTodoViewDelete', id);
  emits('delete', id);
};
</script>
<template>
  <div class="flex flex-col space-y-2">
    <span class="text-base font-bold">
      Список всех созданных задач:
    </span>
    <div class="flex flex-col space-y-2">
      <template v-for="(item, index) in list" :key="item.id">
        <div class="flex flex-row space-x-2 items-center">
          <span>{{ index + 1 }}.</span>
          <TodoView
            :is-selected="item.id === selectedTodo?.id"
            :todo="item"
            @delete="onTodoViewDelete"
            @edit="onTodoViewEdit"
          />
        </div>
      </template>
    </div>
  </div>
</template>