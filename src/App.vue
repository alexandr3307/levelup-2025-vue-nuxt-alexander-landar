<script setup lang="ts">
import {
  onMounted,
  useTemplateRef,
} from 'vue';

import {
  TodoVO,
} from './mvc/model/vo';
import {
  LocalStorageKeys,
} from './_shared/keys';
import FormTodo from '~/mvc/view/components/form/FormTodo.vue';
import TodoLast from '~/mvc/view/components/TodoLast.vue';
import MainHeader from '~/mvc/view/components/header/MainHeader.vue';
import TodoList from '~/mvc/view/components/TodoList.vue';
import {
  useTodoList,
  useTodoLocalStorage,
} from '~/mvc/model/composables';
import TodoPageLayout from '~/mvc/view/components/layouts/TodoPageLayout.vue';

const todoRaw = localStorage.getItem(LocalStorageKeys.TODO);
const listRaw = localStorage.getItem(LocalStorageKeys.LIST);

const {
  saveListToLocalStorage,
  saveTodoToLocalStorage,
} = useTodoLocalStorage();

const {
  list,
  lastTodo,
  selectedTodo,
  addLastTodoToList,
  createTodoFromText,
} = useTodoList(todoRaw, listRaw);

const refFormTodo = useTemplateRef('domFormTodo');

const processSaveTodoSuccess = (todoVO?: TodoVO) => {
  console.log('> App -> processSaveTodoSuccess:');
  lastTodo.value = todoVO;
};

const processSaveTodoError = (error: Error) => {
  console.log('> App -> processSaveTodoError:');
  console.log(error);
};

const onFormCreate = (text: string) => {
  console.log('> App -> onFormCreate:', {
    text,
  });
  createTodoFromText(text)
    .then((todo) => saveTodoToLocalStorage(todo)
      .then(processSaveTodoSuccess)
      .catch(processSaveTodoError),
    )
    .then(addLastTodoToList)
    .then((list) => saveListToLocalStorage(list)
      .then(() => {})
      .catch(() => {}),
    )
    .finally(() => {
      refFormTodo.value?.clear();
    });
};

const onFormEdit = (text: string) => {
  console.log('> App -> onFormEdit:', {
    text,
  });
  if (!selectedTodo.value) { return; }

  selectedTodo.value.text = text;
  saveListToLocalStorage(list.value)
    .then(() => {})
    .catch(() => {})
    .finally(() => {
      selectedTodo.value = undefined;
      refFormTodo.value?.clear();
    });
};

const onListTodoEdit = (todoId: string) => {
  console.log('> App -> onListTodoEdit:', {
    todoId,
  });
  const todoVO = list.value.find(vo => vo.id === todoId);
  if (todoVO) {
    selectedTodo.value = todoVO;
    console.log('> \t find:', todoVO);
  }
};

const onListTodoDelete = (todoId: string) => {
  console.log('> App -> onListTodoDelete:', {
    todoId,
  });
  const todoIndex = list.value.findIndex(vo => vo.id === todoId);
  if (todoIndex >= 0) {
    list.value.splice(todoIndex, 1);
    saveListToLocalStorage(list.value);
  }
  if (lastTodo.value?.id === todoId) {
    lastTodo.value = undefined;
    saveTodoToLocalStorage(undefined);
  }
  if (selectedTodo.value?.id === todoId) {
    selectedTodo.value = undefined;
  }
};

onMounted(() => {
  console.log('> App -> onMounted');
});
</script>

<template>
  <div class="flex flex-col justify-start items-center h-full">
    <MainHeader />
    <TodoPageLayout>
      <FormTodo
        ref="domFormTodo"
        :selected-todo="selectedTodo"
        @create="onFormCreate"
        @edit="onFormEdit"
      />
      <TodoLast :todo="lastTodo" />
      <template #list>
        <TodoList
          :list="list"
          :selected-todo="selectedTodo"
          @delete="onListTodoDelete"
          @edit="onListTodoEdit"
        />
      </template>
    </TodoPageLayout>
  </div>
</template>